import { useState } from 'react'

const useLoading = (initialLoadingState = false) => {

    const [ isLoading,setLoader ]  = useState<boolean>(initialLoadingState)
    const [ apiSuccess,SetSuccess ]  = useState(false)
    const [ error,setError ]  = useState<string>()

    const clearError = () => {
        setError('')
    }

    const load = async <T>(aPromise:Promise<T | any>) => {
        setLoader(true)
        clearError()
        return aPromise
        .then((res)=> {
            if(res.status !== 200 || res.status !== 201){
                SetSuccess(false)
                throw new Error(res.error)
            }else{
                SetSuccess(true)
                return res
            }
        })
        .catch((err)=> {
            setError( err.message || err.error || err )
            SetSuccess(false)
        })
        .finally(() => setLoader(false))
    }

    return { isLoading, load, setLoader, error, clearError, setError, apiSuccess } as const
}

export default useLoading
