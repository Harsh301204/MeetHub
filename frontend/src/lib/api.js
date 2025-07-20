import { axiosInstance } from "./axios"


export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup" , signupData)
    return response.data
}

export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login" , loginData)
    return response.data
}

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout")
    return response.data
}

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get('/auth/me')
        return res.data;
    } catch (error) {
        return null
    }
}

export const completeOnBoarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onboard" , userData)
    return response.data
}

export async function getUserFriends() {
    const response = await axiosInstance.get("/user/friends")
    return response.data
}

export async function getRecommendedUsers() {
    const response = await axiosInstance.get("/user")
    return response.data
}

export const getOutgoingFriendReqs = async () => {
    try {
        const response = await axiosInstance.get("/user/outgoing-req")
        return response.data
    } catch (error) {
        console.log(error)
    }
    
}

export const sendFriendRequest = async (userId) => {
    try {
        const response = await axiosInstance.post(`/user/friend-request/${userId}`)
    return response.data
    } catch (error) {
        console.log(error)
    }
    
}

export const getFriendRequests = async () => {
    const response = await axiosInstance.get("/user/friend-requests")
    return response.data
}

export const  acceptFriendRequest = async (requestId) => {
    const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`)
    return response.data
}