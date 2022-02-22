import React, {useContext,} from 'react';
import {Button, Container, Row, Col, Card } from 'react-bootstrap';
import Female from '../Images/female.png';
import Male from '../Images/male.png';
import {  useDispatch  } from 'react-redux';
import {Datas} from '../Components/Context';
import {logout} from '../Login/ReduxReducers/Actions';

export default function Manager (){
    const dispatch = useDispatch();
    const {employees} = useContext(Datas);

    return(
        <div>
            <h1>Manager Page <Button onClick={ ()=>dispatch(logout()) } style={{float:'right'}}>Logout</Button></h1>
            <hr/>
            <Container>
                    <Row>
                        {employees.map((s, index) => (
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