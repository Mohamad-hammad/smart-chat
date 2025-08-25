'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

interface GoogleSignInButtonProps {
  text?: string
  className?: string
}

export default function GoogleSignInButton({ 
  text = "Continue with Google", 
  className = "" 
}: GoogleSignInButtonProps) {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className={`w-full flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 font-medium py-3 px-4 rounded-xl ${className}`}
    >
      <FcGoogle className="w-5 h-5" />
      {text}
    </button>
  )
}
