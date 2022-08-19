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
            if(res.status !== 200 && res.status !== 201){
                SetSuccess(false)
                const error = 
                    typeof(res.message) === 'string' ? 
                    res.message : res.error;
                setError(error)
                throw error
            }else{
                SetSuccess(true)
            }
            return res
        })
        .finally(() => setLoader(false))
    }

    return { isLoading, load, setLoader, error, clearError, setError, apiSuccess } as const
}

export default useLoading
