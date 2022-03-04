import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { fakeAuth } from "./fakeAuth"

const PrivateElement = ({ children }) => {
  let location = useLocation()``
  console.log(location)
  return( fakeAuth.isAuthenticated ? (children) : ( <Navigate to="employee-analyser/" state={{ from: location }} />))
}

export default PrivateElement
