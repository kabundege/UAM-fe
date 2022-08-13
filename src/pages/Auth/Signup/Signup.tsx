import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import { signUpSchema } from '../../../validation/auth.validation';
import { BsEyeSlashFill,BsEyeFill } from 'react-icons/bs';
import Button from '../../../components/Button';
import useLoading from '../../../hooks/useLoading';
import ImagePicker from '../../../components/ImagePicker';
import { centerd, flexer } from '../../../styles/globalStyles';
import SelectField from '../../../components/SelectField';
import { enumToArray } from '../../../helpers/enumtoArray';
import UploadField from '../../../components/UploadField';


enum MaritalStatus { SINGLE, MARRIED, DIVORCED, WIDOWED }
enum Gender { Male, Female, "Prefer not Say", "None of the above" }

interface Credentials {
  profilePhoto: any,
  name: string,
  email: string,
  password: string,
  gender: string,
  age: string,
  national_id: string,
  document: any,
  dateOfBirth: Date | string,
  maritalStatus: string,
  nationality: string,
}

const initialCreds:Credentials = {
  profilePhoto:'',
  document:'',
  national_id: '',
  age: '',
  name: '',
  password: '',
  dateOfBirth: '',
  email: '',
  gender:'',
  maritalStatus:'',
  nationality: '',
}

export default function Signup() {
  const { isLoading,error,clearError } = useLoading(false)
  const [ ShowPassword,setShowPassword ] = useState(false)
  const [ credentials,setCreds ] = useState<Credentials>(initialCreds)

  const { profilePhoto,maritalStatus,gender,document } = credentials

  const {
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    reValidateMode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });  

  const submitHandler = handleSubmit((data)=>{
    // here
  })

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleCreds = (key: keyof Credentials, value: Credentials[keyof Credentials]) => {
    // clear error
    if(error) clearError()
    
    // setValue('profilePhoto',val)
    setValue(key,value)
    setCreds((prev:Credentials) => ({ ...prev,[key]:value }))
    //
    if(value)
    clearErrors(key)
  }

  return (
    <form className='flex flex-col px-10' onSubmit={submitHandler}>
      <h1 className="text-4xl font-bold text-primary opacity-20 mt-10">Sign Up</h1>
      <div className={centerd}>
        <ImagePicker
          value={profilePhoto}
          placeholder="Profile Photo"
          label="Account Profile Photo"
          onChange={val => handleCreds('profilePhoto',val)}
          error={errors.profilePhoto?.message}
        />
      </div>
      <div className={flexer}>
        <InputField 
          type="text"
          label='name'
          placeholder='e.g John Doe Kalisa'
          error={errors.name?.message}
          register={register('name')}
        />
        <div className='spacer' />
        <InputField 
          label="age"
          name="age"
          type="number"
          placeholder='e.g 20'
          register={register('age')}
          error={errors.age?.message}
        />
      </div>
      <div className={flexer}>
        <SelectField 
          label='Marital Status'
          value={maritalStatus}
          error={errors.maritalStatus?.message}
          placeholder='Select your marital status'
          onChange={val => handleCreds('maritalStatus',val)}
          data={enumToArray(MaritalStatus).map(status => ({ value: status.toString() }))}
        />
        <div className='spacer' />
        <SelectField 
          label='Gender'
          value={gender}
          error={errors.gender?.message}
          placeholder='Select your gender'
          onChange={val => handleCreds('gender',val)}
          data={enumToArray(Gender).map(status => ({ value: status.toString() }))}
        />
      </div>
      <InputField 
        type="number"
        name="nationId"
        label="Identification number"
        placeholder='e.g 1198050012345678'
        register={register('national_id')}
        error={errors.national_id?.message}
      />
      <UploadField
        multiple
        value={document}
        accept=".pdf,.docx"
        error={errors.document?.message}
        label="Additional documents (Optional)"
        handleChange={(val) => handleCreds('document', val)}
      />
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
      {
        error ?
          <p className='error' >{error}</p> :
          <div className="spacer" />
      }
      <Button className="w-auto" text='Sign In' isLoading={isLoading} />
    </form>
  )
}
