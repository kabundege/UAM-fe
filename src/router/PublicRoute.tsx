import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";


const PublicRoute:FC<{ children:ReactNode }> = ({ children }) => {

  if(localStorage.getItem('token')){
    return (
      <Navigate replace to="/profile" />
    )
  }
 
  return (
    <>
      {children}
    </>
  )
}

export default PublicRoute;
