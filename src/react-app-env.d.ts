/// <reference types="react-scripts" />

export type handleContext = ( key: keyof ContextProps, value: ContextProps[keyof ContextProps], callBack?:() => void ) => void

export enum MaritalStatus { SINGLE, MARRIED, DIVORCED, WIDOWED }
export enum AccountStatus { UNVERIFIED, PENDING, VERIFICATION, VERIFIED }
export enum Gender { Male, Female, "Prefer not Say", "None of the above" }

export interface User {
  profilePhoto: string,
  name: string,
  email: string,
  password: string,
  gender: string,
  age: string,
  national_id: string,
  phoneNumber: string,
  document: string,
  isVerified?: boolean,
  hasTwoFactorAuth?:boolean,
  dateOfBirth: Date | string,
  maritalStatus: string,
  nationality: string,
  _id: string
}

export interface ContextProps {
  user?: User,
  token?: string,
  handleContext: handleContext
}
