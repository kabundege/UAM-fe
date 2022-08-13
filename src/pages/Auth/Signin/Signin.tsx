import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import { signInSchema } from '../../../validation/auth.validation';
import { BsEyeSlashFill,BsEyeFill } from 'react-icons/bs';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import useLoading from '../../../hooks/useLoading';

interface Creds {
  email: string,
  password: string,
}


const initialCreds = { email:"",password:""}

export default function Signin() {
  const { isLoading,error } = useLoading(false)
  const [ ShowPassword,setShowPassword ] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Creds>({
    reValidateMode: 'onChange',
    defaultValues: initialCreds,
    resolver: yupResolver(signInSchema),
  });  

  const submitHandler = handleSubmit((data)=>{
    // here
  })

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <form className='flex flex-col  px-20' onSubmit={submitHandler}>
      <h1 className="text-4xl font-bold text-primary opacity-20 my-10">Sign In</h1>
      <InputField 
        type="email"
        label='Email address'
        placeholder='e.g example@internet.com'
        error={errors.email?.message}
        register={register('email')}
      />
      <InputField 
        label='Password'
        placeholder='••••••••••••'
        type={ ShowPassword ? "text" : "password"}
        IconProp={ 
          ShowPassword ? 
            <BsEyeFill className="icon" onClick={togglePassword} /> : 
            <BsEyeSlashFill className='icon' onClick={togglePassword} />
        }
        register={register('password')}
        error={errors.password?.message}
      />
        <Link to="/forgotpassword" className='ml-auto text-gray-500 hover:text-gray-900' > Forgot Password ?</Link>
        {
          error ?
            <p className='error' >{error}</p> :
            <div className="spacer" />
        }
      <Button className="w-auto" text='Sign In' isLoading={isLoading} />
    </form>
  )
}
