import React, {useContext, useState, useEffect} from "react";
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../Login/ReduxReducers/Actions';
import {Datas} from '../Components/Context';
import {Button, Container, Row, Col, } from 'react-bootstrap';

export default function Employee (){
    const dispatch = useDispatch();
    const logindata = useSelector( (state) => state.username)
    const {tasks} = useContext(Datas);
    const [task, setTask] = useState([])

    useEffect(() => {
        tasks.map( value => {
        console.log(value)
        if (value.name.toLowerCase() === logindata.toLowerCase()){ 
           return setTask(task => ([...task,  value ]))
        }
        return null
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    console.log(task,'task', typeof(task))
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
                {/* {task.tasktitle} */}
                { task.length ? 
                    (task.map( (tasks, index ) => (
                    <Row key={index} >
                        <Col>{tasks.tasktitle}</Col>
                        <Col>{tasks.taskdesc}</Col>
                        <Col>{tasks.giventime} {tasks.timeformat}</Col>
                    </Row>
                )))
                 : <h3><br/><br/>No Tasks Assigned...!!</h3> }
            </Container>
        </div>
    );
} 