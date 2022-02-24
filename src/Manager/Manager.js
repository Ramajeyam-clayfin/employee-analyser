import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import {Button, Container, Row, Col, Card, Toast, Form, InputGroup, Spinner, Table,ProgressBar,Badge, } from 'react-bootstrap';
import Female from '../Images/female.png';
import Male from '../Images/male.png';
import {  useDispatch  } from 'react-redux';
import {Datas} from '../Components/Context';
import {logout} from '../Login/ReduxReducers/Actions';
import { Requests } from './Requests';
import './edit.css';

export default function Manager (){
    const dispatch = useDispatch();
    const {tasks, setTasks, employees, showC, setShowC} = useContext(Datas);

    const [Name, setName] = useState();
    const [Id, setId] = useState();

    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);
    
    const [loading, setloading] = useState(false);

    const [values, setValues] = useState({});
    
    const [localemp, setlocalemp] = useState([]);

    let message = tasks.filter(obj => obj.requests !== false);
    console.log(message, 'mesage')

    const showHide = showB ? "edit display-block" : "edit display-none";
    const Hideshow = showB ?  "edit display-none" : "edit display-block";
    
    const toggleClose = () => setShowA(!showA);

    const toggleShowA = (id, name) => {
        setShowA(true);
        setName(name);
        setId(id);
    }
    // console.log(moment().format("x"))
    const Additem = (event) => {
        event.preventDefault();
        let push = [ { 
            name: Name,
            empid: Id,
            tasktitle: values.tasktitle,
            taskdesc: values.taskdesc,
            giventime: values.giventime,
            timeformat: values.timeformat,
            finishtime: null,
            status: 'Pending',
            taskstatus: false,
            assigndate: moment().format("h:mm a"),
            completedate: '',
            requests: false,
            taskid: moment().format("x"), 
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
              console.log(res);
            const result = res.data.employees;
            console.log(res.data.employees)
            setlocalemp(result);
            setloading(false);
            console.log('axios finished')
          })
          
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
      
      if (loading) {
        return <div style={{position:'absolute', top:'50%', width:'100%'}}><Spinner animation="border" /></div>
     }
    else {
    return(
        <div>
            <h1>Manager Page <Button onClick={ ()=>dispatch(logout()) } style={{float:'right', marginRight:'30px', marginTop:'10px'}}>Logout</Button></h1>
            <hr/>
            <h1 >
                <Button  style={{float:'left', marginLeft:'30px'}} onClick={()=>setShowB(!showB)}> {showB? 'Back' : 'Assigned Tasks'}</Button>
                    {message.length? 
                            <Button  variant="outline-danger"  onClick={()=>setShowC(!showC)} style={{float:'right', marginRight:'30px'}}><Badge pill bg="warning" text="danger" >{message.length}</Badge> Requests</Button> 
                        :  <Button   variant="outline-success" disabled style={{float:'right', marginRight:'30px'}}><Badge bg="success">{message.length}</Badge> Requests</Button> }
                    <Requests show={showC} onHide={()=>setShowC(false)} />
                <br/>
            </h1>

            {/* Container for Displaying assigned tasks */}
            <Container className={showHide}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Employee Name</th>
                        <th>Employee ID</th>
                        <th>Tasks Assigned</th>
                        <th>Tasks Description</th>
                        <th>Given Time Limit</th>
                        <th>Status</th>
                        <th>Time Taken To Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                    { tasks.length ? 
                        (tasks.map( (tasks, index ) => (
                            
                                <tr key={index}>
                                <td>{tasks.name}</td>
                                <td>{tasks.empid}</td>
                                <td>{tasks.tasktitle}</td>
                                <td>{tasks.taskdesc}</td>
                                <td>{tasks.giventime} {tasks.timeformat}</td>
                                <td>{tasks.status}</td>
                                <td>{tasks.finishtime !== null ? `${tasks.finishtime} Min` : 'N/A'} </td>
                                </tr>
                            
                    )))
                    : <h3><br/><br/>No Tasks Assigned...!!</h3> }
                 </tbody>
                 </Table>
            </Container>

            {/* Container for Asigning the tasks  */}
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
                                        focus={ showA}
                                        className='input'
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

            {/* Container for Displaying the Employes  */}
            <Container className={Hideshow}>
                    <Row>
                        {localemp.map((s, index) => (
                            <Col key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img  variant="top" src={(s.gender)==='Male'? Male : Female} style={{height:250}} alt=''/>
                                    <Card.Body>
                                        <Card.Title>{s.name}</Card.Title>
                                        <Card.Text>Employee ID : {s.empid}</Card.Text>
                                        <Card.Text>Designation : {s.position}</Card.Text>
                                        <ProgressBar animated variant={s.color} now={s.percent} label={`${s.percent} %`} />
                                        <Card.Text></Card.Text>
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
