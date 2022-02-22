import React from "react";
import {Button, Container, Row, Col, Card } from 'react-bootstrap';
import Female from '../Images/female.png';
import Male from '../Images/male.png';
import { useSelector, useDispatch  } from 'react-redux';
// import * as actionCreators from './ReduxReducer/Actions';
import {logout} from '../Login/ReduxReducers/Actions';

export default function Manager (){
    const dispatch = useDispatch();
    const emp = useSelector( (state) => state.manager.employees)
    // console.log(emp)

    return(
        <div>
            <h1>Manager Page <Button onClick={ ()=>dispatch(logout()) } style={{float:'right'}}>Logout</Button></h1>
            <hr/>
            <Container>
                    <Row>
                        {emp.map((s, index) => (
                            <Col key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img  variant="top" src={(s.gender)==='Male'? Male : Female} style={{height:250}} alt=''/>
                                    <Card.Body>
                                        <Card.Title>{s.name}</Card.Title>
                                        <Card.Text>Employee ID : {s.empid}</Card.Text>
                                        <Card.Text>Designation : {s.position}</Card.Text>
                                        <Button>Assign Task</Button>  
                                    </Card.Body>
                                </Card>
                                <br/><br/>
                            </Col>
                        ))}   
                    </Row>
                </Container>
        </div>
    );
} 