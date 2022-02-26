import React,{useEffect} from "react";
import { useSelector  } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { Login1 } from "./Login1";
import { fakeAuth } from "./fakeAuth"
import { useTranslation } from 'react-i18next';


export default function Login (){
    let navigate = useNavigate()
    const { i18n} = useTranslation("Language"); 

    const logindata = useSelector( (state) => state) 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect ( ()=> i18n.changeLanguage('en'), []);
    
    useEffect (() => {
        
        if(!logindata.errormessageuser || !logindata.errormessagepass){
            if(logindata.account === 1){
               fakeAuth.login(() => { navigate(`employee/${logindata.username.toLowerCase()}`) });
           } else if(logindata.account === 2){
               fakeAuth.login(() => {navigate(`/${logindata.username.toLowerCase()}`) });
           }else return <Login1/>
       }else return <Login1/>
          
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[logindata]);

    

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
