import React, {useContext} from "react";
import { useDispatch } from 'react-redux';
import {logout} from '../Login/ReduxReducers/Actions';
import {Datas} from '../Components/Context';
import {Button, Container, Row, Col, } from 'react-bootstrap';

export default function Employee (){
    const dispatch = useDispatch();
    const {tasks} = useContext(Datas);

    return(
        <div>
            <h1>Employee Page <Button onClick={ ()=>dispatch(logout()) } style={{float:'right'}}>Logout</Button></h1>
            <hr/>
            <Container>
                <Row as='h4'>
                    <Col>Tasks Assigned</Col>
                    <Col>Tasks Description</Col>
                    <Col>Given Time Limit</Col>
                </Row>
                <Row >
                    <Col>{tasks.tasktitile}</Col>
                    <Col>{tasks.taskdesc}</Col>
                    <Col>{tasks.giventime} {tasks.timeformat}</Col>
                </Row>
                
            </Container>
        </div>
    );
} 