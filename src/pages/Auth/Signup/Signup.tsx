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
import { getUploadSignedUrl } from '../../../API/aws.service';
import { SignupApi } from '../../../API/auth.service';
import { useNavigate } from 'react-router-dom';


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
  phoneNumber: string,
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
  phoneNumber: ''
}

export default function Signup() {
  const { isLoading,error,clearError,load,setError,setLoader } = useLoading(false)
  const [ ShowPassword,setShowPassword ] = useState(false)
  const [ credentials,setCreds ] = useState<Credentials>(initialCreds)
  //
  const navigate = useNavigate() 

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

  const uploadToAws = async (value:any):Promise<string | null> => {

    const keys:any = await getUploadSignedUrl(value.type).catch(er => setError(er.message))

    if(!keys?.data?.url)
    return null
      
    const localUrl = URL.createObjectURL(value)

    const blob  = await fetch(localUrl).then(res => res.blob())

    const xhr = new XMLHttpRequest();

    await new Promise((resolve,reject)=>{        //
        xhr.onload = () => {
            resolve(keys.data.Key)
        };
        //
        xhr.onerror = () => {
            setError("Signature Upload Failed,try again later")
            setLoader(false)
            reject()
        };
        //
        xhr.onabort = () => {
            setError("Signture Upload Aborted")
            setLoader(false)
            reject()
        };
        //
        xhr.upload.onprogress = () => {
          /** return the progress of an image
           * 
           * * Tracking the progress
           * if(e.lengthComputable)
           * console.log(value.name,"==== Progress =====",Number((e.loaded/e.total) * 100).toFixed(0));
           */
        };
        //
        xhr.open("PUT", keys.data.url);
        xhr.send(blob);
    })

    return keys.data.Key
  };

  const submitHandler = handleSubmit(async (data)=>{

    if(isLoading)
    return null
    // here
    const payload:any = {
      ...data
    }

    const files = {
      profilePhoto,
      document
    }

    if(payload['p'])
    delete payload['p']

    setLoader(true)
    /** Upload files */
    for(const [key,value] of Object.entries(files)){
      if(!value)
      break
        // eslint-disable-next-line
      const imageKey = await uploadToAws(value)
      if(!imageKey){
        // if value key is null
        break;
      }
      payload[key] = imageKey
    }

    /** Create user */
    load(SignupApi(payload))
    .then(res => {
      if(res.status === 201)
      navigate('/verification')
    })

  })

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleCreds = (key: keyof Credentials, value: Credentials[keyof Credentials]) => {
    // clear error
    if(error) clearError()
    
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
          label='Full Name'
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
        <InputField 
          type="number"
          name="nationId"
          label="Identification number"
          placeholder='e.g 1198050012345678'
          register={register('national_id')}
          error={errors.national_id?.message}
        />
      </div>
      <div className={flexer}>
      <InputField 
        type="text"
        label='Nationality'
        placeholder='e.g Rwandan'
        error={errors.nationality?.message}
        register={register('nationality')}
      />
      <div className='spacer'/>
      <InputField
        placeholder="+250"
        label="Phone number"
        type="tel"
        register={register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />
      </div>
      <div className={flexer}>
        <InputField
          type="date"
          name="nationId"
          label="Date of birth"
          placeholder='e.g 1950-01-01'
          register={register('dateOfBirth')}
          error={errors.dateOfBirth?.message}
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
