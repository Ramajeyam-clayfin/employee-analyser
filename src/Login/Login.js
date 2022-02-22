import React, {useState} from "react";
import { useSelector, useDispatch  } from 'react-redux';
import * as actionCreators from './ReduxReducers/Actions';
import { Form,Button, Stack, Container } from 'react-bootstrap'; 
import Employee from '../Employee/Employee'
import Manager from '../Manager/Manager'
import './login.css';

export default function Login (){
    const logindata = useSelector( (state) => state.account)

    return(
        <>
           {
            logindata === 0 ? <Login1/> 
                : logindata === 1 ? <Employee/> 
                    : logindata === 2 ? <Manager/>
                        : null
            }
        </>
    );
} 

const Login1 = () =>{
    const dispatch = useDispatch();
    const[values, setValues] = useState({});

    const handlelogin = (event) => {
        event.preventDefault();
        setValues(values => ({ ...values   }) );
        dispatch(actionCreators.login(values));
    }

    return(
        <div >
            <Container className="container p-5 my-5 border" style={{width:'40%', backgroundColor:'#fff', borderRadius: "10px"}}>
                <Stack gap={2} >
                    <Form.Label as="h4">Sign In</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Username"
                        required
                        name="username"
                        onChange={(e) =>
                            setValues(values => ({ ...values, username: e.target.value }) ) }
                    />
                    <br/>
                    <Form.Control 
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) =>
                            setValues(values => ({ ...values, password: e.target.value }) ) }
                    />
                    <br/>
                    <Button type="submit" variant="outline-primary" onClick={(event)=>handlelogin(event)}>Login</Button>
                </Stack>
            </Container>
        </div>
    );
}