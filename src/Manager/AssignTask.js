import React, {useContext, useState} from "react";
import {Button, Container, Row, Col, Form, Toast,InputGroup,} from 'react-bootstrap';
import { TaskValidation } from '../Login/Validation';
import moment from 'moment';
import {Datas} from '../Components/Context';
import { useTranslation } from 'react-i18next';

export const AssignTask = (props) => {
    const { t, } = useTranslation("Language"); 
    const {tasks, employees, setTasks, setShowA, showA, Name, Id, setemployees, } = useContext(Datas);

    const [error, setError] = useState('');
    const [values, setValues] = useState({});

    const Additem = (event) => {
        event.preventDefault();
        let result = TaskValidation(values);

        if(!result.error)  
        {
            let push = [ 
                { 
                    name: Name,
                    empid: Id,
                    tasktitle: values.tasktitle,
                    taskdesc: values.taskdesc,
                    giventime: result.giventime,
                    timeformat: values.timeformat,
                    finishtime: null,
                    status: 'Pending',
                    taskstatus: false,
                    assigndate: moment().format("h:mm a"),
                    completedate: '',
                    requests: false,
                    taskid: moment().format("x"), 
                    requestmsg:'',
                    extraatime: null,
                }, ...tasks];
            console.log(push,'push')
            setTasks(push);

            const empupdate = employees.map( value => {
                if (value.empid === Id){ 
                   value = {
                        ...value,
                        pending: value.pending + 1,
                        totaltasks: value.totaltasks + 1,
                   };
                }
                return value;
            })
            setemployees(empupdate);
            setError('');
            setShowA(!showA);
            setValues({});
        }
        else setError(result.error);
    }

    return(
        <div>
            <Container >
                <Col md={12} className="mb-12">
                    <Toast {...props} className="container-fluid p-4 my-4 "  style={{ width: '90%' }}>
                        <Toast.Header>
                                <Form.Label column sm="2">
                                    {t("For")} :
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control plaintext readOnly value={Name} />
                                </Col>
                                <Form.Label column sm="6">
                                    {!error ? null  : <p style={{color:'red'}}>{error}</p> }
                                </Form.Label>  
                        </Toast.Header>
                        
                        <Toast.Body>
                            <Form.Group as={Row} className="mb-2" >
                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        placeholder={t("Task")}
                                        required
                                        focus='true'
                                        className='input'
                                        name="tasktitle"
                                        isInvalid={ !!error}
                                        onChange={(e) =>
                                            setValues(values => ({ ...values, tasktitle: e.target.value }) ) }
                                    />
                                </Col>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        placeholder={t("Descripition")}
                                        required
                                        name="description"
                                        isInvalid={ !!error}
                                        onChange={(e) =>
                                            setValues(values => ({ ...values, taskdesc: e.target.value}) ) }
                                    />
                                </Col>
                                <Col sm="3">
                                    <InputGroup className="mb-3">
                                        <Form.Control 
                                            type="number"
                                            placeholder={t("Time")}
                                            required
                                            name="tasktitle"
                                            isInvalid={ !!error}
                                            onChange={(e) =>
                                                setValues(values => ({ ...values, giventime: e.target.value}) ) }
                                        />
                                        {/* <Form.Control.Feedback type='invalid' >{error}</Form.Control.Feedback> */}
                                        <Form.Select name='format' onChange={(e) =>
                                                setValues(values => ({ ...values, timeformat: e.target.value}) ) } >
                                            <option value="" >{t("Format")}</option>
                                            <option value='Hrs'> {t("Hours")} </option>
                                            <option value='Min'> {t("Minutes")} </option>
                                        </Form.Select>  
                                    </InputGroup>
                                </Col>
                                
                            </Form.Group>
                        </Toast.Body>
                        <Button variant="primary" onClick={Additem}>{t("Assign")}</Button>
                    </Toast>
                </Col>
            </Container>
        </div>
    );
}