import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api.js';

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks
} from '@stream-io/video-react-sdk'
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader.jsx';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {
  const {id : callId} = useParams();

  const [client , setClient] = useState(null)
  const [call , setCall] = useState(null)
  const [isConnecting , setIsConnecting] = useState(true)

  const {authUser , isLoading} = useAuthUser()

  const {data : tokenData} = useQuery({
    queryKey : ["streamToken"],
    queryFn : getStreamToken,
    enabled : !!authUser
  })

  useEffect(() => {
    console.log("US tjsdflk jsdklf")
    const initCall = async () => {
      console.log(authUser)
      if(!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing Stream Video Call Client.....")

        const user = {
          id : authUser._id,
          name : authUser.fullName,
          image : authUser.profilePic 
        }

        const videoClient = new StreamVideoClient({
          apiKey : STREAM_API_KEY,
          user,
          token : tokenData.token
        })

        const callInstance = videoClient.call("default" , callId)

        await callInstance.join({create:true})

        setClient(videoClient)
        setCall(callInstance)

      } catch (error) {
        console.log(error)
        toast.error("Could not join the call , please try again")
      } finally {
        console.log("YE ru jfsdkljfkl ")
        setIsConnecting(false)
      }

    }
    initCall()
  } , [tokenData , authUser , callId])

  console.log(isConnecting)
  if(isConnecting || isLoading) return <PageLoader/>
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='relative'>
        { client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent/>
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p>Could not initialize Call , Please Refresh or try again later</p>
          </div>
        )
        }
      </div>
    </div>
  )
}


const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const navigate = useNavigate()

  if(callingState === CallingState.LEFT) return navigate("/")
  return (
    <StreamTheme>
      <SpeakerLayout/>
      <CallControls/>
    </StreamTheme>
  )
}

export default CallPage