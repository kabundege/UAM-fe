import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context";


const PublicRoute:FC<{ children:ReactNode }> = ({ children }) => {
  const { token } = useContext(StoreContext)

  if(token){
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
