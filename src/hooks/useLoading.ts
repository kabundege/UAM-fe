import { useState } from 'react'

const useLoading = (initialLoadingState = false) => {

    const [ isLoading,setLoader ]  = useState<boolean>(initialLoadingState)
    const [ error,setError ]  = useState<string>()

    const clearError = () => {
        setError('')
    }

    const load = async <T>(aPromise:Promise<T | any>) => {
        setLoader(true)
        clearError()
        return aPromise
        .then(res => res.json())
        .then((res)=> {
            if(res.status !== 200 || res.status !== 201){
                throw new Error(res.error)
            }else{
                return res
            }
        })
        .catch((err)=>setError(err))
        .finally(() => setLoader(false))
    }

    return { isLoading, load, setLoader, error, clearError } as const
}

export default useLoading
