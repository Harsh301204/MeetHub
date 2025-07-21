import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getAuthUser, getStreamToken } from '../lib/api.js'
import { useQuery } from '@tanstack/react-query'
import ChatLoader from '../components/ChatLoader.jsx'
import CallButton from '../components/CallButton.jsx'


import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import toast from 'react-hot-toast'
import useAuthUser from '../hooks/useAuthUser.js'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  const { id:targetUserId } = useParams()
  // console.log("User ID from params is ," , id)

  const [chatClient , setChatClient] = useState(null)
  const [channel , setChannel] = useState(null)
  const [loading , setLoading] = useState(true)

  const  {authUser}  = useAuthUser()

  const {data : tokenData} = useQuery({
    queryKey : ["streamToken"],
    queryFn : getStreamToken,
    enabled : !!authUser // This will only run when authUser is available , we dont want to fetch stream token before having data
  })

  useEffect(() => {
    const initChat = async () => {
      console.log("authUser is  ",authUser)
      if(!tokenData?.token || !authUser) return;

      try {
        console.log(authUser._id)
        console.log("Initializing Stream chat client...")
        const client = StreamChat.getInstance(STREAM_API_KEY)
        console.log("ye chud hradfs kl",authUser._id)
        await client.connectUser({
          id : authUser._id,
          name : authUser.fullName,
          image : authUser.profilePic
        } , tokenData.token)

        const channelId = [authUser._id , targetUserId].sort().join("-");
        const currChannel = client.channel("messaging" , channelId , {
          members : [authUser._id , targetUserId]
        })

        await currChannel.watch()

        setChatClient(client)
        setChannel(currChannel)
      } catch (error) {
        console.log("Error in initializing Chat :",error)
        toast.error("could not connect to chat , Please try again")
      } finally {
        setLoading(false)
      }
    }

    initChat()
  } , [targetUserId , authUser , tokenData])

  const handleVideoCall = () => {
    if(channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`

      channel.sendMessage({
        text : `I've Started a Video Call , Join me here : ${callUrl}`
      })

      toast.success("Video Call Link sent successfully")
    }
  }

  console.log("chatClient is " , chatClient)
  console.log(channel)

  if(loading || !chatClient || !channel) return <ChatLoader/>
  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage