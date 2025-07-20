import FriendRequest from "../Models/FriendRequest.js";
import User from "../Models/User.js";

export async function getRecommendedUsers(req , res){
    try {
        const currentUserId = req.user.id;
        // const currentUser = await User.findById(currentUserId);
        const currentUser = req.user;
        console.log("currentUser.friends ," , currentUser.friends);
        console.log("currentUserID" , currentUserId)
        const recommended = await User.find({
            $and : [
                {_id : {$ne : currentUserId}}, // this will exclude the current user
                {_id : {$nin : currentUser.friends}}, // this will exclude frnds
                {isOnBoard: true}
            ],
           
        })

        return res.status(200).json(recommended);
    } catch (error) {
        console.log("Error in getRecommendedUsers controller" , error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export async function getMyFriends(req , res){
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends" , "fullName  profilePic  nativeLanguage  learningLanguage")

        return res.status(200).json(user.friends)
    } catch (error) {
        console.log("Somethhing went wrong in user COntroller , getMyFriends" , error)
        return res.status(401).json({Message : "SOmething wnet wrong"})

    }
}

export async function sendFriendRequest(req , res) {
    try {
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        if(myId === recipientId) {
            return res.status(400).json({Message : "User Can not send request to themselves"})     
        }

        // Now we will check if user with recipient id exists or not
        const recipient = await User.findById(recipientId)
        if(!recipient) {
            return res.status(404).json({message : "Recipient Not Found"})
        }

        // Check if user is already a friend or not
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({Message : "You are already friends with this user"})
        }

        // Now we will check for wether we already sended a request to that user
        const existingRequest = await FriendRequest.findOne({
            $or : [
                {sender : myId , recipient : recipientId},
                {sender : recipientId , sender : myId}
            ]
        })

        if(existingRequest) {
            return res.status(400).json({message : "already sended a friend request"})
        }

        // Now we will create a friend request
        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient : recipientId
        })
        
        return res.status(201).json(friendRequest)
    } catch (error) {
        console.log("Somethhing went wrong in user COntroller , sendFriendRequest" , error)
        return res.status(401).json({Message : "SOmething wnet wrong"})
    }
}

export async function acceptSendFriendRequest(req , res) {
    try {
        const {id:requestId} = req.params

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest) {
            return res.status(400).json({Message : "Friend request not found"})
        }

        // Check if our current user is the one who is recipienet
        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({Message : "You are not authorized to accept this request"})
        }

        friendRequest.status = "accepted"
        await friendRequest.save()

        // Now we need to update friends list of both users 
        // $addToSet is adds something in array only if it doesnot exist already
        await User.findByIdAndUpdate(friendRequest.sender , {
            $addToSet : {friends : friendRequest.recipient}
        })

        await User.findByIdAndUpdate(friendRequest.recipient , {
            $addToSet : {friends : friendRequest.sender}
        })

        return res.status(200).json({Message : "Friend Request Accepted"})
    } catch (error) {
        console.log("SOmething wnet wrong in user controller" , error);
        return res.status(401).json({message : "acceptfriendreq"})
    }
}

export async function getFriendRequests(req , res) {
    try {
        const incomingReq = await FriendRequest.find({
            recipient : req.user.id,
            status : "pending"
        }).populate("sender" , "fullName profilePic nativeLanguage learningLanguage")

        const acceptedReq = await FriendRequest.find({
            sender : req.user.id,
            status : "accepted"
        }).populate("recipient" , "fullName profilePic")

        res.status(200).json({incomingReq , acceptedReq})
    } catch (error) {
        console.log("error in getFriendREq" , error)
        return res.status(500).json({message : "Internal server error"})
    }
}

export async function outgoingFriendRequests(req , res) {
    try {
        const outGoingReq = await FriendRequest.find({
            sender : req.user.id,
            status : "pending"
        }).populate("recipient" , "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(outGoingReq)
    } catch (error) {
        console.log("Error in outgoingReq , " , error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}