import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeOnBoarding } from '../lib/api.js'
import toast from 'react-hot-toast'
import { CameraIcon, ShuffleIcon } from 'lucide-react'

const OnBoardingPage = () => {
  const {isLoading , authUser} = useAuthUser()
  const queryClient = useQueryClient()

  const [formState , setFormState] = useState({
    fullName : authUser?.fullName || "",
    bio : authUser?.bio || "",
    nativeLanguage : authUser?.nativeLanguage || "",
    learningLanguage : authUser?.learningLanguage || "",
    location : authUser?.location || "",
    profilePic : authUser?.profilePic || "",
  })

  const {mutate:onBoardMutate , isPending} = useMutation({
    mutationFn : completeOnBoarding,
    onSuccess : () => {
      toast.success("Profile Updated Sucessfully")
      queryClient.invalidateQueries({queryKey : ["authUser"]})
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onBoardMutate(formState)
  }

  const handleRandomAvatar = () => {
     
  }

  return (
      <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
        <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
          <div className='card-body p-6 sm:p-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Profile pic Container */}
                <div className='flex flex-col items-center justify-center space-y-4'>
                  {/* Image preview */}
                  {/* {formState.profilePic ? (
                    <img src={formState.profilePic} alt="Profile Preview" className='w-full h-full object-cover'/>
                  ) : ( */}
                    <div className='flex items-center justify-center h-full'>
                      <CameraIcon className='size-12 text-base-content opacity-40'/>
                    </div>
                  {/* // ) */}

                  {/* generate random avatar button */}
                  <div className='flex items-center gap-2'>
                    <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                      <ShuffleIcon className='size-4 mr-2'/>
                      Generate Random Avatar
                    </button>
                  </div>
                </div>
                    {/* Name */}
                    <div className='form-control'> 
                      <label className='label'>
                        <span className='label-text'>Full Name</span>
                      </label>

                      <input type="text" name="fullName"
                      value={formState.fullName}
                      onChange={(e) => setFormState({...formState , fullName : e.target.value})}
                      className='input input-bordered w-full'
                      placeholder='Your Full Name'
                      />
                    </div>

                    {/* Bio */}
                    <div className='form-control w-full'>
                      <label className='label'>
                        <span className='label-text'>Bio</span>
                      </label>

                      <textarea
                      name="bio"
                      value={formState.bio}
                      onChange={(e) => setFormState({...formState , bio : e.target.value})}
                      className='textarea textarea-bordered h-24'
                      placeholder='Tell others about Yourself and your Learning language Goal'
                      />
                    </div>

                    {/* Languages*/}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                      {/* Native Language */}
                      <div className='form-control'>
                        <label className='label'>
                          <span className='label-text'>Native Language</span>
                        </label>
                      </div>

                    </div>
              </form>
          </div>
        </div>
      </div>
  )
}

export default OnBoardingPage