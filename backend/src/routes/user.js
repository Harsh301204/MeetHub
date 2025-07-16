import express from 'express'
import { protectedRoute } from '../middleware/authMiddleware.js'
import { getRecommendedUsers , getMyFriends , sendFriendRequest , acceptSendFriendRequest , getFriendRequests , outgoingFriendRequests} from '../controllers/userControllers.js'

const router = express.Router()

// router.get('/' , protectedRoute , getRecommendedUsers);
// router.get('/friends' , protectedRoute , getMyFriends)

router.use(protectedRoute)
router.get('/' , getRecommendedUsers);
router.get('/friends' , getMyFriends);

router.post('/friend-request/:id' , sendFriendRequest)
router.put('/friend-request/:id/accept' , acceptSendFriendRequest)

router.get('/friend-requests' , getFriendRequests)
router.get('/outgoing-req' , outgoingFriendRequests)


export default router