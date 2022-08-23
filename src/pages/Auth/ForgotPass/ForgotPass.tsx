import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import { forgotPassSchema } from '../../../validation/auth.validation';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../../hooks/useLoading';
import { flexer } from '../../../styles/globalStyles';
import { BsChevronLeft } from 'react-icons/bs';
import { ForgotPassApi } from '../../../API/auth.service';

type Creds = {
  email: string,
}

const initialCreds = { email:"",password:""}

export default function ForgotPass() {
  const { isLoading,error,load, apiSuccess } = useLoading(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Creds>({
    reValidateMode: 'onChange',
    defaultValues: initialCreds,
    resolver: yupResolver(forgotPassSchema),
  });  

  const submitHandler = handleSubmit((data)=>{
    // here
    load(ForgotPassApi(data.email))
  })

  return (
    <form className='flex flex-col  px-20' onSubmit={submitHandler}>
      <div className={'my-10'+flexer}>
        <BsChevronLeft className="cursor-pointer font-bold" onClick={() => navigate(-1)} />
        <h1 className="text-center text-4xl font-bold text-primary opacity-20">Change Password</h1>
        <div/>
      </div>
      <p className="text-center font-medium text-lg text-gray-500 mt-10 mb-5">
        Enter the email associtated with your account, and we'll send an email with instructions to reset your password
      </p>
      <InputField 
        type="email"
        label='Email address'
        error={errors.email?.message}
        register={register('email')}
        placeholder='e.g example@internet.com'
      />
      {
        error ?
          <p className='error' >{error}</p> :
          <div className="spacer" />
      }
      <Button className="w-auto" success={apiSuccess} text='Send' isLoading={isLoading} />
    </form>
  )
}
