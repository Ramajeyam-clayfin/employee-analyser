import React from "react";
import './Login.css';
import { useSelector  } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom"
import { Login1 } from "./Login1";
import { fakeAuth } from "./fakeAuth"


export default function Login (){
    let navigate = useNavigate()
    let location = useLocation()
  
    let { from } = location.state || { from: { pathname: "/" } }
    console.log(from)
    const logindata = useSelector( (state) => state) 
    

    if(!logindata.errormessageuser || !logindata.errormessagepass){
         if(logindata.account === 1){
            fakeAuth.login(() => { navigate(`/employee`) });
        } else if(logindata.account === 2){
            fakeAuth.login(() => {navigate(`/${logindata.username.toLowerCase()}`) });
        }else return <Login1/>
    }else return <Login1/>

    return(
        <>
            <Login1/>
          
        </>
    );
} 


    // alert(
    //     ` Username && Password Details :
    //     For Manager Login:
    //     username : password
    //     Manager : manager

    //     For Employee Login:
    //     Employee1 : employee1
    //     Employee2 : employee2
    //     Employee3 : employee3
    //     Employee4 : employee4
    //     Employee5 : employee5
    //     Employee6 : employee6`)
