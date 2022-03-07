import React, {useContext, useState, useEffect} from 'react';
import { NavLink ,  } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {Button, Container, Row, Col, Card, Spinner, Table,ProgressBar,Badge, } from 'react-bootstrap';
import Female from '../Images/female.png';
import Male from '../Images/male.png';
import {  useDispatch  } from 'react-redux';
import {Datas} from '../Components/Context';
import {logout} from '../Login/ReduxReducers/Actions';
import { Requests } from './Requests';
import { AssignTask } from './AssignTask'
import { fakeAuth } from "../Login/fakeAuth"
import { useNavigate } from "react-router-dom"

import './edit.css';

export default function Manager (){

    let navigate = useNavigate()
    const { t, i18n} = useTranslation("Language"); 

    const dispatch = useDispatch();
    const {tasks, employees, showC, setShowC, showA, setShowA, setName, setId } = useContext(Datas);

    const [showB, setShowB] = useState(false);
    const [loading, setloading] = useState(false);
    const [localemp, setlocalemp] = useState([]);

    let message = tasks.filter(obj => obj.requestmsg === 'Requested');
    // console.log(message, 'mesage')

    const showHide = showB ? "edit display-block" : "edit display-none";
    const Hideshow = showB ?  "edit display-none" : "edit display-block";
    
    const toggleShowA = (id, name) => {
        setShowA(true);
        setName(name);
        setId(id);
    }

    useEffect (() => {
        i18n.changeLanguage('en');
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

    const handlelogout = () =>{
        dispatch(logout())
        fakeAuth.logout( () => navigate("/employee-analyser", { state: { from: { pathname: "/" } } }) )
    }
      
    if (loading) {
        return <div style={{position:'absolute', top:'50%', width:'100%'}}><Spinner animation="border" /></div>
     }
    else {
    return(
        <div>
            <h1>
                {t("managerheading")}
                <Button onClick={() => handlelogout() }  style={{float:'right', marginRight:'30px', marginTop:'10px'}}>{t("logout")}</Button>
                {/* <InputGroup size="sm" className="mb-3">
                   
                    <Form.Control
                            size="sm" 
                            type="search"
                            placeholder="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                </InputGroup> */}
            </h1>
            <hr/>
            <h1 >
                
                <Button  style={{float:'left', marginLeft:'30px'}} onClick={()=>setShowB(!showB)}> {showB? `${t("Back")}` : `${t("Assigned Tasks")}`}</Button>
                
                <NavLink to='/manager/performance'><Button> {t("Employee Performance")}</Button></NavLink>
                    {message.length? 
                            <Button variant="outline-danger"  onClick={()=>setShowC(!showC)} style={{float:'right', marginRight:'30px'}}>
                                <Badge pill bg="warning" text="danger" >{message.length}</Badge>
                                {' '} {t("Requests")}
                            </Button> 
                        :  <Button variant="outline-success" disabled style={{float:'right', marginRight:'30px'}}>
                                <Badge bg="success">{message.length}</Badge>
                                {t("Requests")}
                            </Button> 
                    }
                {/* call the requests function if showC is true */}
                <Requests show={showC} onHide={()=>setShowC(false)} />
                <br/>
            </h1>
            {/* call the assigntask function if showA is true */}
            <AssignTask show={showA} onClose={() => setShowA(!showA)}/>

            {/* Container for Displaying assigned tasks */}
            <Container className={showHide}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>{t("Employee Name")}</th>
                        <th>{t("Employee ID")}</th>
                        <th>{t("Tasks Assigned")}</th>
                        <th>{t("Tasks Description")}</th>
                        <th>{t("Given Time Limit")}</th>
                        <th>{t("Status")}</th>
                        <th>{t("Time Taken To Complete")}</th>
                        <th>{t("Task Percentage")}</th>
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
                                <td>{tasks.finishtime !== null ? `${tasks.finishtime}` : 'N/A'} </td>
                                <td>{tasks.taskpercent}</td>
                                </tr>
                            
                    )))
                    : <h3><br/><br/>{t("No Tasks Assigned")}...!!</h3> }
                 </tbody>
                 </Table>
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
                                        <Card.Text>{t("Employee ID")} : {s.empid}</Card.Text>
                                        <Card.Text>{t("Designation")} : {s.position}</Card.Text>
                                        <ProgressBar  variant={s.color} now={s.percent} label={`${s.percent} %`} />
                                        <Card.Text></Card.Text>
                                        <Button onClick={()=>toggleShowA(s.empid, s.name)} className="mb-2">
                                        {t("Assign task")}
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
