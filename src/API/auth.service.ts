import { Fetcher } from '../helpers/Fetcher'
import { MaritalStatus } from '../react-app-env';

const { REACT_APP_UAM_URL:UAM_URL, REACT_APP_UAM_ENROLL_URL:ENROLL_URL } = process.env;

interface SignInCreds {
    email:string,
    password:string
}
export const SigninApi: (cred:SignInCreds) => Promise<any> = (credentials) => {
    return Fetcher(`${UAM_URL}/signin`,'POST',credentials)
}

interface UserSignUpCreds {
    profilePhoto: string,
    name: string,
    email: string,
    password: string,
    gender: string,
    age: string,
    national_id: string,
    phoneNumber: string,
    document: string,
    dateOfBirth: Date | string,
    maritalStatus: MaritalStatus,
    nationality: string,
}

export const SignupApi: (creds:UserSignUpCreds) => Promise<any> = (credentials) => {
    return Fetcher(`${ENROLL_URL}/signup`,'POST',credentials)
}

export const ForgotPassApi: (email:string) => Promise<any> = (email) => {
    return Fetcher(`${UAM_URL}/forgot-password`,'POST',{ email })
}

export const ResetApi: (password:string,token:string) => Promise<any> = (password,token) => {
    return Fetcher(`${UAM_URL}/reset-password/${token}`,'POST',{ password })
}
//verify-account
export const VerificationApi: (code:string) => Promise<any> = (code) => {
    return Fetcher(`${ENROLL_URL}/verify-account`,'POST',{ code })
}
//verify-Token
export const SigninToken: (token:string) => Promise<any> = (token) => {
    return Fetcher(`${UAM_URL}/verify-token/${token}`,'GET')
}
