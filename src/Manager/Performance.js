import React, {useContext, useState} from "react";
import { NavLink ,  } from 'react-router-dom';
import {Button, Form, Col, Row, } from 'react-bootstrap';
import {Datas} from '../Components/Context';

export const Performance = () => {
    const {tasks, employees, } = useContext(Datas);
    const [emp, setEmp] = useState();
    console.log(emp)

    return(
        <div>
            <br/><br/><hr/>
            <NavLink to='/manager'><Button style={{float:'left', marginLeft:'10px'}}> Back</Button></NavLink>
            <div>
                <Row md={12} className="mb-12">
                    <Form.Group as={Row} className="mb-2" >
                        <Col sm='2'> 
                        <Form.Label column sm="10">Employee Name :</Form.Label>
                        </Col>
                        <Col >
                            <Form.Select name='time' 
                                onChange={(e) => setEmp(e.target.value) } 
                            >
                                <option >Select Employee</option>
                                { employees.map( obj => <option key={obj.empid} value={obj.empid}>{obj.name}  </option>)}
                            </Form.Select>  
                        </Col>
                        <Col sm='2'> 
                        <Form.Label column sm="8">Employee ID :</Form.Label>
                        </Col>
                        <Col >
                            <Form.Select name='time' 
                                onChange={(e) => setEmp(e.target.value) } 
                            >
                                <option >Select Employee ID</option>
                                
                                { employees.map( obj => <option key={obj.empid}  value={obj.empid}> {obj.empid}  </option>)}
                            </Form.Select>  
                        </Col>
                    </Form.Group>
                </Row>
            </div>
        </div>
    )
}