import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Container, Row, Col, Card, Toast, Form, InputGroup, Spinner,} from 'react-bootstrap';
import Female from '../Images/female.png';
import Male from '../Images/male.png';
import {  useDispatch  } from 'react-redux';
import {Datas} from '../Components/Context';
import {logout} from '../Login/ReduxReducers/Actions';

export default function Manager (){
    const dispatch = useDispatch();
    const {tasks, setTasks, employees} = useContext(Datas);
    const [Name, setName] = useState();
    const [Id, setId] = useState();
    const [showA, setShowA] = useState(false);
    const [values, setValues] = useState({});
    const [loading, setloading] = useState(false);
    const [localemp, setlocalemp] = useState([]);
    
    const toggleClose = () => setShowA(!showA);

    const toggleShowA = (id, name) => {
        setShowA(true);
        setName(name);
        setId(id);
    }
    const Additem = (event) => {
        event.preventDefault();
        let push = [ { 
            name: Name,
            empid: Id,
            tasktitle: values.tasktitle,
            taskdesc: values.taskdesc,
            giventime: values.giventime,
            timeformat: values.timeformat 
            }, ...tasks];
            console.log(push,'push')
        setTasks(push);
        setShowA(!showA);
    }
    useEffect (() => {
        setloading(true);
        console.log('axios start')
        
        axios.post(`https://jsonplaceholder.typicode.com/users`, { employees })
          .then(res => {
            const result = res.data.employees;
            console.log(res.data.employees)
            setlocalemp(result);
            setloading(false);
            console.log('axios finished')
          })
          
      },[]);
      
      if (loading) {
        return <div style={{position:'absolute', top:'50%', width:'100%'}}><Spinner animation="border" /></div>
     }
    else {
    return(
        <div>
            <h1>Manager Page <Button onClick={ ()=>dispatch(logout()) } style={{float:'right'}}>Logout</Button></h1>
            <hr/>
            <Container >
                <Col md={12} className="mb-12">

                    <Toast show={showA} onClose={toggleClose} className="container-fluid p-4 my-4 "  style={{ width: 'fit-content' }}>
                        <Toast.Header>
                            <strong className="me-auto">
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm="3">
                                        For :
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control plaintext readOnly value={Name} />
                                    </Col>
                                </Form.Group>  
                            </strong>
                                
                        </Toast.Header>
                        <Toast.Body>
                            <Form.Group as={Row} className="mb-2" >
                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Task"
                                        required
                                        autoFocus
                                        name="tasktitle"
                                        onChange={(e) =>
                                            setValues(values => ({ ...values, tasktitle: e.target.value }) ) }
                                    />
                                </Col>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        placeholder="Descripition"
                                        required
                                        name="description"
                                        onChange={(e) =>
                                            setValues(values => ({ ...values, taskdesc: e.target.value}) ) }
                                    />
                                </Col>
                                <Col sm="3">
                                    <InputGroup className="mb-3">
                                        <Form.Control 
                                            type="number"
                                            placeholder="Time"
                                            required
                                            name="tasktitle"
                                            onChange={(e) =>
                                                setValues(values => ({ ...values, giventime: e.target.value}) ) }
                                        />
                                        <Form.Select name='format' onChange={(e) =>
                                                setValues(values => ({ ...values, timeformat: e.target.value}) ) } >
                                            <option value="" >Format</option>
                                            <option value='Hrs'> Hours </option>
                                            <option value='Min'> Minutes </option>
                                        </Form.Select>  
                                    </InputGroup>
                                </Col>
                                
                            </Form.Group>
                        </Toast.Body>
                        <Button size='lg' variant="primary" onClick={Additem}>Assign</Button>
                    </Toast>
                </Col>
            </Container>

            <Container>
                    <Row>
                        {localemp.map((s, index) => (
                            <Col key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img  variant="top" src={(s.gender)==='Male'? Male : Female} style={{height:250}} alt=''/>
                                    <Card.Body>
                                        <Card.Title>{s.name}</Card.Title>
                                        <Card.Text>Employee ID : {s.empid}</Card.Text>
                                        <Card.Text>Designation : {s.position}</Card.Text>

                                        <Button onClick={()=>toggleShowA(s.empid, s.name)} className="mb-2">
                                            Assign task
                                        </Button> 
                                    </Card.Body>
                                </Card>
                                <br/><br/>
                            </Col>
                        ))}   
                    </Row>
                </Container>
        </div>
    ); }
} 
