import React, { FC, Fragment, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context";


const PrivateRoute:FC<{ children:ReactNode }> = ({ children }) => {
  const { token } = useContext(StoreContext)

  if(!token){
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
