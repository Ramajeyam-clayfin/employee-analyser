import React, {useState, } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import * as actionCreators from './ReduxReducers/Actions';
import { Form,Button, Stack, Container } from 'react-bootstrap'; 
import { validtaion } from "./Validation";
import { useTranslation } from 'react-i18next'; 

export const Login1 = () =>{
    const dispatch = useDispatch();
    const erroruser = useSelector( (state) => state.erroruser)
    const errorpass = useSelector( (state) => state.errorpass)
    const[values, setValues] = useState({});
    const { t } = useTranslation("Language");  

    const handlelogin = (event) => {
        // event.preventDefault();
        setValues(values => ({ ...values   }) );
        let result= validtaion(values);

        dispatch(actionCreators.login(values , result.errormessageuser, result.errormessagepass));

    }
    
    return(
        <div>
            <div>
                <br/>
            <Container className="container p-5 my-5 border" style={{width:'40%', backgroundColor:'#e6e6e6', borderRadius: "10px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <Stack gap={2} >
                    <Form.Label as="h4">{t("label")}</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder={t("username")}
                        required
                        name="username"
                        onChange={(e) =>
                            setValues(values => ({ ...values, username: e.target.value }) ) }   
                        isInvalid={ !!erroruser}
                    />
                    <Form.Control.Feedback type='invalid' >{erroruser}</Form.Control.Feedback>
                    <br/>
                    <Form.Control 
                        type="password"
                        placeholder={t("password")}
                        required
                        isInvalid={ !!errorpass}
                        onChange={(e) =>
                            setValues(values => ({ ...values, password: e.target.value }) ) }
                    />
                    <Form.Control.Feedback type='invalid' >{errorpass}</Form.Control.Feedback>
                    <br/>
                    <Button type="submit" variant="outline-primary" onClick={(event)=>handlelogin(event)}>{t("Login")}</Button>
                </Stack>
            </Container>
            </div>
        </div>
    );
}