import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { fakeAuth } from "./fakeAuth"

const PrivateElement = ({ children }) => {
  let location = useLocation()
  return( fakeAuth.isAuthenticated ? (children) : ( <Navigate to="/" state={{ from: location }} />))
}

export default PrivateElement
