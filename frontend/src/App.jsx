import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import OnBoardingPage from './pages/OnBoardingPage.jsx'
import toast , { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios' 
import { axiosInstance } from './lib/axios.js'
import PageLoader from './components/PageLoader.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {


  const {isLoading , authUser} = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnBoarded = authUser?.isOnBoard
  
  if(isLoading) return <PageLoader/>

  return (
    <div className='h-screen' data-theme = "night">
      <Routes>
        <Route path='/' element={isAuthenticated && isOnBoarded ? <HomePage/> : (<Navigate to={!isAuthenticated ? "/login" : "/onboard"}/>)} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage/> : <Navigate to={isOnBoarded ? "/" : "/onboard"}/>} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to={isOnBoarded ? "/" : "/onboard"}/>} />
        <Route path='/notifications' element={isAuthenticated ? <NotificationsPage/> : <Navigate to={'/login'}/>} />
        <Route path='/call' element={isAuthenticated ? <CallPage/> : <Navigate to={'/login'}/>} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage/> : <Navigate to={'/login'}/>} />
        <Route path='/onboard' element={isAuthenticated ? (!isOnBoarded ? (<OnBoardingPage/>) : (<Navigate to={'/'}/>)) : <Navigate to={'/login'}/>} />
      </Routes>

        <Toaster/>
    </div>
  )
}

export default App