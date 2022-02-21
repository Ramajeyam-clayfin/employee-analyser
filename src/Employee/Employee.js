import React from "react";
import {Button} from 'react-bootstrap';
import {  useDispatch  } from 'react-redux';
import * as actionCreators from '../Login/ReduxReducers/Actions';

export default function Employee (){
    const dispatch = useDispatch();

    return(
        <div>
            Employee Page
            <Button onClick={ ()=>dispatch(actionCreators.logout()) }>Logout</Button>
        </div>
    );
} 