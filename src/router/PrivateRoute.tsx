import React, { FC, Fragment, ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context";

const PrivateRoute:FC<{ children:ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()
  const { token,user } = useContext(StoreContext)

  if(!token){
    return (
      <Navigate replace to="/" />
    )
  }

  if(!user && pathname !== '/verification')
    return (
      <Navigate replace to="/verification" />
    )
 
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default PrivateRoute;
