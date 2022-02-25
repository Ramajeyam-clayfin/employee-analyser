import React from "react"
import { fakeAuth } from "./fakeAuth"
import { useNavigate } from "react-router-dom"

const ProtectedPage = ({ x }) => {
  const navigate = useNavigate()
  console.log('protected page')
  return (
    <div>
      <p>You are logged in. Welcome to protected page! Value of x is {x}</p>
      <button
        onClick={() => {
          fakeAuth.logout(() =>
            navigate("/", { state: { from: { pathname: "/protected" } } })
          )
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export default ProtectedPage
