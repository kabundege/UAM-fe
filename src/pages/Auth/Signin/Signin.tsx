import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import { signInSchema } from '../../../validation/auth.validation';
import { BsEyeSlashFill,BsEyeFill } from 'react-icons/bs';
import Button from '../../../components/Button';
import { Link, useLocation } from 'react-router-dom';
import useLoading from '../../../hooks/useLoading';
import { SigninApi, SigninToken } from '../../../API/auth.service';
import { StoreContext } from '../../../context';
import { AiOutlineLoading } from 'react-icons/ai';
import { centerd } from '../../../styles/globalStyles';

interface Creds {
  email: string,
  password: string,
}

const initialCreds = { email:"",password:""}

export default function Signin() {
  const location = useLocation()
  const { isLoading:tokenLoading,load:tokenLoader } = useLoading(false)
  const { handleContext } = useContext(StoreContext)
  const { isLoading,error,load } = useLoading(false)
  const [ ShowPassword,setShowPassword ] = useState(false)


  useEffect(()=>{

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if(token)
    tokenLoader(SigninToken(token))
    .then(res=>{
      localStorage.setItem('token',token)
      handleContext(
        'token',
        token,
        () => {
          handleContext(
            'user',
            res.data.user
          )
        }
      )
    })
    // eslint-disable-next-line
  },[])

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
    load(SigninApi(data))
    .then(res => {
      if(res.status === 200){
        localStorage.setItem('token',res.data.token)
        handleContext(
          'token',
          res.data.token
        )
      }
    })
  })

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  // if Welcome page is still loading
  if(tokenLoading)
  return (
    <div className={centerd}>
      <AiOutlineLoading className="text-blue-600 text-3xl animate-spin" />
    </div>
  )

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
        <Link to="/forgot-password" className='ml-auto text-gray-500 hover:text-gray-900' > Forgot Password ?</Link>
        {
          error ?
            <p className='error' >{error}</p> :
            <div className="spacer" />
        }
      <Button className="w-auto" text='Sign In' isLoading={isLoading} />
    </form>
  )
}
