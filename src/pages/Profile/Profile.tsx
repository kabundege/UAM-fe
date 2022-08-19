import React, { useContext,  } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import CustomImage from '../../components/CustomeImage/CustomImage'
import { centerd, flexer } from '../../styles/globalStyles'
import { GoCloudDownload, GoVerified } from "react-icons/go"
import Welcome from '../Welcome'
import useLoading from '../../hooks/useLoading'
import { getSignedUrl } from '../../API/aws.service'
import { StoreContext } from '../../context'

enum AccountStatus { UNVERIFIED, PENDING, VERIFICATION, VERIFIED }

export default function Profile() {
  const { user } = useContext(StoreContext)
  const { isLoading,setError,load,error } = useLoading()

  const Info = (label:string,value:string) => (
    <p className='flex items-center text-lg capitalize mt-3'>
      <span className='font-medium text-gray-500'>{label} :</span>
      <span className='font-medium ml-2 text-gray-900'>{value}</span>
    </p>
  )

  const handleDownload = async () => {
    if(user?.document){
      load(getSignedUrl(user.document))
      .then(res => {
        if(res.status === 200){
          fetch(res.data)
          .then(res =>res.blob())
          .then(buffer => {
              const blob = new Blob([buffer])
              const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                  'download',
                  `document.${user.document.split('.')[1]}`,
                );
            
                // Append to html link element page
                document.body.appendChild(link);
            
                // Start download
                link.click();
            
                // Clean up and remove the link
                link.parentNode?.removeChild(link);
          })
        }
      })
    }else{
      setError('No additional documentn found')
      const id = setTimeout(()=>{
        setError('')
        clearTimeout(id)
      })
    }

  }

  return (
    <Welcome>
      {
        !user ? 
          (
            <div className={centerd}>
              <AiOutlineLoading className="text-blue-600 text-3xl animate-spin" />
            </div>
          ) :  (
            <div className="flex flex-col">
              <div className={centerd+'flex-col'}>
                <div className={'w-40 h-40 bg-gray-300 rounded-full relative overflow-hidden border-2'+centerd}>
                  <AiOutlineLoading className='text-blue-500 animate-spin' />
                  <CustomImage className="absolute left-0 top-0" src={user.profilePhoto} />
                </div>
                <div className={centerd+' my-5'}>
                  <h3 className='text-2xl font-bold'>Christophe kwizera Kabundege</h3>
                  { user.status === AccountStatus.VERIFIED.toString() && <GoVerified className="text-blue-600 ml-2" /> }
                </div>
                <div className={centerd+'flex-col'}>
                  {Info('Age',user?.age)}
                  {Info('gender',user?.gender)}
                  {Info('marital status',user?.maritalStatus)}
                  {Info('Phone number',user?.phoneNumber)}
                  {Info('Date of Birth',String(user?.dateOfBirth))}
                  {Info('email',user?.email)}
                  {Info('Nationality',user?.nationality)}
                  {Info('Identification',user?.national_id)}
                  <div onClick={handleDownload} className={flexer+' mt-5 p-2 rounded-md bg-slate-200 hover:opacity-90 cursor-pointer'}>
                    <div className='p-3 rounded-md bg-blue-200'>
                      {
                        isLoading ? 
                          <AiOutlineLoading className="text-blue-600 animate-spin" /> :
                          <GoCloudDownload className='text-blue-700' />
                      }
                    </div>
                    <p className='ml-2'>Download Attched Document</p>
                  </div>
                </div>
                {
                  error ?
                    <p className='error' >{error}</p> :
                    <div className="spacer" />
                }
              </div>
            </div>
          )
      }
    </Welcome>
  )
}
