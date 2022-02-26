import React, {useContext, useState, useEffect} from "react";
import { NavLink ,  } from 'react-router-dom';
import {Button, Form, Col, Row, Container,Table, Spinner  } from 'react-bootstrap';
import {Datas} from '../Components/Context';
import axios from 'axios';
import { Doughnut} from 'react-chartjs-2';
import { PieChart, Pie,} from 'recharts';


export const Performance = () => {
    const {tasks, employees, } = useContext(Datas);
    const [emp, setEmp] = useState([]);
    const [task , setTask] = useState([]);
    const [loading, setloading] = useState(false);
    const [localemp,setlocalemp] = useState([]);
    const [localtask, setlocaltask] = useState([]);
    const [percentage, setpercentage] = useState([]);
    // const temp = employees.filter(obj=> Number(obj.empid) === Number(emp))
    const state = {
        labels: ['Percentage'],
        datasets: [
          {
            label: 'Percentage',
            backgroundColor: [
              '#2FDE00',
            ],
            hoverBackgroundColor: [
            '#175000',
            ],
            data: [percentage , 100-percentage]
          }
        ]
      }

    useEffect (() => {
        setloading(true);
        console.log('axios start')
        
        axios.post(`https://jsonplaceholder.typicode.com/users`, { emp, task })
          .then(res => {
              console.log(res);
            const result1 = res.data.emp;
            const result2 = res.data.task;
            // console.log(res.data.emp)
            // console.log(res.data.task)
            setlocalemp(result1);
            setlocaltask(result2);
            setloading(false);
            console.log('axios finished')
          })
          
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[emp, task]);
   

    const handleselect = (id) =>{
        setEmp(employees.filter(obj=> Number(obj.empid) === Number(id)));
        setTask(tasks.filter(obj=> Number(obj.empid) === Number(id)));
        setpercentage(Number(emp.map(obj=> obj.percent)))
        console.log(emp)
        console.log(task)
        console.log(percentage)
    }

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
                                onChange={(e) => handleselect(e.target.value) } 
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
                                onChange={(e) => handleselect(e.target.value) } 
                            >
                                <option >Select Employee ID</option>
                                
                                { employees.map( obj => <option key={obj.empid}  value={obj.empid}> {obj.empid}  </option>)}
                            </Form.Select>  
                        </Col>
                    </Form.Group>
                </Row>
            </div>
            <div>
            { loading ?
                 <div style={{position:'absolute', top:'50%', width:'100%'}}><Spinner animation="border" /></div>
            : (
                <Container className="container-fluid p-4 my-4 " >
                { localemp.length ? 
                    <Table  bordered hover>
                        {localemp.map( obj => (
                            <tbody key={obj.empid}>
                                <tr>
                                    <td style={{textAlign:'end', width:'30%', fontWeight:'bold'}}>Employee Name :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.name}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>Employee Id :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.empid}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>Gender :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.gender}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>Designation :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.position}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>No. of Tasks Assigned :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.totaltasks}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>No. of Tasks Completed :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.completed}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>No. of tasks Pending :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.pending}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'end', fontWeight:'bold'}}>Total Employee Performance :</td>
                                    <td style={{textAlign:'start', paddingLeft:'20px'}}>{obj.percent} %</td>
                                </tr>
                                
                            </tbody>
                        ))}
                    </Table>
                    : <h3><br/><br/>Select Emlployee...!!</h3> 
                }
                {/* <RadialBarChart width={700} height={700} data={localemp} outerRadius={250}>
                    <RadialBar minAngle={360} dataKey="percent" fill="green"  clockWise/>
                </RadialBarChart> */}
                 <PieChart width={700} height={700}>
                    <Pie data={percentage} dataKey="percent" outerRadius={250} fill="green" />
                </PieChart>
                <Doughnut
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'percentage',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}/>
                </Container>
                )}
            </div>
        </div>
    )
}