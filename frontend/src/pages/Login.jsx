import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      email:"",
      password: "",
   });

   const {login, isLoggingIng} = useAuthStore();

   const handleSubmit = async (e) => {
     e.preventDefault();
     login(formData);
   };

  return (
     <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side background image */} 
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
             <div className='flex flex-col items-center gap-2 group'>
                <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />

                </div>
                <h1 className='text-2xl font-bold mt-2 font-iceberg'>Create Account</h1>
                <p className='text-base-content/60 font-comfortaa '>Get started with your free account</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
         
           <div className='form-control'>
            <label htmlFor="lable">
              <span className='label-text font-medium'>Email</span>
            </label>
             <label className="input input-bordered flex items-center justify-center gap-2 w-full">
               <Mail className="size-5 text-base-content/40" />
                   <input
                   type="email"
                   className="grow w-full pl-1"
                    placeholder="you@example.com"
                   value={formData.email}
                   onChange={(e) =>
                     setFormData({ ...formData, email: e.target.value })
                       }
                    />
              </label>
          </div>
           <div className='form-control'>
            <label htmlFor="lable">
              <span className='label-text font-medium'>Password</span>
            </label>
             <label className="input input-bordered flex items-center justify-center gap-2 w-full">
               <Lock className="size-5 text-base-content/40" />
                   <input
                   type={showPassword ? "text" : "password"}
                   className="grow w-full pl-1"
                    placeholder="********"
                   value={formData.password}
                   onChange={(e) =>
                     setFormData({ ...formData, password: e.target.value })
                       }
                    />

                    <button type='button' className='flex items-center' onClick={() => setShowPassword(!showPassword)}  >

                      { showPassword ? (
                          <EyeOff className="size-5 text-base-content/40" />
                      ) : (
                          <Eye className="size-5 text-base-content/40" />    
                        )}
                     

                    </button>
              </label>
          </div>

          <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIng}>
             {isLoggingIng ? (
              <>
                <Loader2 className='size-5 animate-spin' />
                   Loading...

              </>
             ) : (
                "Sign in"
             )}
          </button>
        </form>

        <div className='text-center'>
          <p className='text-base-content/60'>
            Don&apos;t have an account? {" "}
            <Link to="/signup" className='link link-primary'>
             Create account
            </Link>
         </p>
        </div>
        </div>
     
      </div>

       {/* right side */}

       <AuthImagePattern  
         title="Join the Conversation"
         description="Connect with friends and family, share your thoughts, and stay updated with the latest news. Sign up now to start chatting!"
       />
    </div>
  )
}

export default Login