import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotificationsPage from './pages/NotificationsPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import OnBoardingPage from './pages/OnBoardingPage'
import toast , { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='h-screen' data-theme = "night">
      <button onClick={() => toast.success("HEllo world")}>Create a Toast</button>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/notifications' element={<NotificationsPage/>} />
        <Route path='/call' element={<CallPage/>} />
        <Route path='/chat' element={<ChatPage/>} />
        <Route path='/onboard' element={<OnBoardingPage/>} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App