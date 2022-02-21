import React from "react";
import {Button} from 'react-bootstrap';
import {  useDispatch  } from 'react-redux';
import * as actionCreators from '../Login/ReduxReducers/Actions';

export default function Manager (){
    const dispatch = useDispatch();


    return(
        <div>
            Manager Page
            <Button onClick={ ()=>dispatch(actionCreators.logout()) }>Logout</Button>
        </div>
    );
} 