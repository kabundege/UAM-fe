import React, { FC, Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute:FC<{ children:ReactNode }> = ({ children }) => {

  if(!localStorage.getItem('token')){
    return (
      <Navigate replace to="/" />
    )
  }
 
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default PrivateRoute;
