import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import { ResetSchema } from '../../../validation/auth.validation';
import { BsEyeSlashFill,BsEyeFill } from 'react-icons/bs';
import Button from '../../../components/Button';
import useLoading from '../../../hooks/useLoading';

interface Creds {
  confirm: string,
  password: string
}

const initialCreds = { confirm:"",password:""}

export default function ResetPass() {
  const [ ShowPassword,setShowPassword ] = useState(false)
  const { isLoading,error,setError,clearError } = useLoading(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Creds>({
    reValidateMode: 'onChange',
    defaultValues: initialCreds,
    resolver: yupResolver(ResetSchema),
  });  

  const submitHandler = handleSubmit((data)=>{
    // here
    if(data.password !== data.confirm){
      return setError('Passwords must match')
    }

    clearError()
    
  })

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <form className='flex flex-col  px-20' onSubmit={submitHandler}>
      <h1 className="text-center text-4xl my-10 font-bold text-primary opacity-20">Reset Password</h1>
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
      <InputField 
        label='Confirm Password'
        placeholder='••••••••••••'
        type={ ShowPassword ? "text" : "password"}
        IconProp={ 
          ShowPassword ? 
            <BsEyeFill className="icon" onClick={togglePassword} /> : 
            <BsEyeSlashFill className='icon' onClick={togglePassword} />
        }
        register={register('confirm')}
        error={errors.confirm?.message}
      />
      {
        error ?
          <p className='error' >{error}</p> :
          <div className="spacer" />
      }
      <Button className="w-auto" text='Reset' isLoading={isLoading} />
    </form>
  )
}
