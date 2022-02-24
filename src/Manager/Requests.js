import React, {useContext, useState} from "react";
import {Datas} from '../Components/Context';
import moment from "moment";
import {Button, Container, Row, Col, Form, Modal,} from 'react-bootstrap';

export const Requests = (props) => {

    const {tasks, setTasks, setShowC} = useContext(Datas);
    let message = tasks.filter(obj => obj.requestmsg === 'Requested');
    const[value, setValues] = useState();

    const handleapprove = (id) => {
        
        const updatedarray = tasks.map((obj) => {
            let Hour
            let minutes = Number(`${obj.giventime}`) + Number(`${value}`)
            if(minutes > 60){
                Hour = moment('00:00', "hh:mm").add(minutes, 'minutes').format('hh:mm')
            }
            if (obj.taskid === id) {
              obj = { ...obj, 
                    giventime : minutes > 60 ? Hour : minutes,
                    extraatime : Number(`${value}`),
                    timeformat:  minutes > 60 ? 'Hrs' : 'Min',
                    requests:false,
                    requestmsg: 'Approved'
                };
            }
            return obj;
          });
          setTasks(updatedarray)
          setShowC(false)
    }
    const handlereject = (id) => {

        const updatedarray = tasks.map((obj) => {
            if (obj.taskid === id) {
              obj = { ...obj, 
                    requests:false,
                    requestmsg: 'Rejected'
                };
            }
            return obj;
          });
          setTasks(updatedarray)
          setShowC(false)
    }

    return(
        <div>
            <Modal  size="lg" centered {...props} backdrop="static" >
                <Container >
                    <Col md={12} className="mb-12">
                        { message.length ?  message.map((obj, index) => (
                            <React.Fragment key={index}>

                                <Modal.Header closeButton>
                                    <strong className="me-auto">
                                        <Form.Group as={Row} className="mb-1"  >
                                            <Col sm="3">
                                                <Form.Control plaintext readOnly value={obj.name} />
                                            </Col>
                                            <Form.Label column sm="9" style={{textAlign:'left'}}>
                                                Has Requested Additional Time.
                                            </Form.Label>
                                        </Form.Group>      
                                    </strong>     
                                </Modal.Header>

                                <Modal.Body>
                                    <Form.Group as={Row} className="mb-3"  >
                                        <Form.Label column sm="2" style={{textAlign:'left'}}>
                                            For Task : 
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Label column sm="8" style={{textAlign:'start'}}>
                                                {obj.tasktitle}
                                            </Form.Label>
                                            {/* <Form.Control style={{textAlign:'start'}} plaintext readOnly value={obj.tasktitle} /> */}
                                        </Col>
                                                    
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2" >
                                        <Col sm="4">
                                            <Form.Select name='time' 
                                                onChange={(e) => setValues(e.target.value) } 
                                            >
                                                <option >Choose time..</option>
                                                <option value='15'> 15 Min </option>
                                                <option value='30'> 30 Min </option>
                                                <option value='45'> 45 Min </option>
                                                <option value='60'> 60 Min </option>
                                            </Form.Select>  
                                        </Col>
                                        <Col sm='3'> 
                                            <Button size='sm' variant="success" onClick={()=>handleapprove(obj.taskid)}>Approve</Button>
                                        </Col>
                                        <Col sm='3'>
                                            <Button size='sm' variant="danger" onClick={()=>handlereject(obj.taskid)}  >Deny</Button>
                                        </Col>
                                    </Form.Group>
                                </Modal.Body>
                            </React.Fragment> ) )
                        :  null } 
                    </Col>
                </Container>
            </Modal>
        </div>
    );
}