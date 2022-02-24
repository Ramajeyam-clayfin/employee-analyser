import React, {useContext, useState, useEffect} from "react";
import moment from "moment";
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../Login/ReduxReducers/Actions';
import {Datas} from '../Components/Context';
import {Button, Container, Row, Col, } from 'react-bootstrap';

export default function Employee (){
    const dispatch = useDispatch();
    const logindata = useSelector( (state) => state.username)
    const {tasks, employees, setTasks, setemployees} = useContext(Datas);
    const [task, setTask] = useState([]);
    const [name, setName] = useState();
    const [Id, setId] = useState();
    const [variant, setVariant] = useState('');
    const [percent, setPercent] = useState(null);


    useEffect(() => {
        tasks.map( value => {
        if (value.name.toLowerCase() === logindata.toLowerCase()){ 
           return setTask(task => ([...task,  value ]))
        }
        return null
        })
        employees.map( value => {
            if (value.name.toLowerCase() === logindata.toLowerCase()){ 
               return (
                   setName(value.name),
                   setId(value.empid),
                   setVariant(value.color),
                   setPercent(value.percent)
                   )
            }
            return null
            })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handlerequest = (id) =>{
        const updatedarray = tasks.map((obj) => {
            if (obj.taskid === id) {
              obj = { ...obj, 
                requests: true,
                requestmsg:'Requested',
                };
            }
            return obj;
          });
          setTasks(updatedarray)

          const updated = task.map((obj) => {
            if (obj.taskid === id) {
              obj = { ...obj, 
                requests: true,
                requestmsg:'Requested',
                };
            }
            return obj;
          });
          setTask(updated)

    }

    const  handlecomplete  = (id, empid) =>{
       
        let totalcalc = percent;
        let hour;
        let calc ;
        let minutesDiff;
        let time = moment().format("h:mm a");
        let variant1 = variant

        const updates = task.map( (obj) => {
            if (obj.taskid === id) {
                
                let startTime = moment(`${obj.assigndate}`, 'h:mm a');
                let endTime =  moment(`${time}`, 'h:mm a');
                minutesDiff = endTime.diff(startTime, 'minutes');
                
                if(minutesDiff > 60){
                    hour = moment('00:00', "hh:mm").add(minutesDiff, 'minutes').format('hh:mm')
                }
                console.log(minutesDiff)

                const giventime = moment.duration(moment(obj.giventime, 'HH:mm').format("HH:mm")).asMinutes()
                console.log(giventime)

                if(minutesDiff > giventime){
                    let calc1 = (minutesDiff - giventime)/giventime*100;
                    calc = Math.round(100-calc1);
                    if(Math.sign(calc) === -1){
                        calc = 10 ;
                    }
                }
                else {
                    calc = 100;
                   
                }
                totalcalc = Math.round((totalcalc + calc)/2)
                
                console.log(calc, 'Calc')
              obj = { ...obj, 
                        status:'Completed',
                        taskstatus:true,
                        completedate: time,
                        finishtime: minutesDiff > 60 ? `${hour} Hrs` : `${minutesDiff} Min`,
                    };
            }
            return obj;
          });
          setTask(updates)

          const updatedarray = tasks.map((obj) => {
            if (obj.taskid === id) {
              obj = { ...obj, 
                status:'Completed',
                taskstatus:true,
                completedate: time, 
                finishtime: minutesDiff > 60 ? `${hour} Hrs` : `${minutesDiff} Min`,
                };
            }
            return obj;
          });
          setTasks(updatedarray)
        if(totalcalc === 100){
            variant1 ='success';

        }else if(totalcalc < 50){
            variant1 ='danger';
        }
             
        else {
            variant1 ='warning';
        }
        console.log(variant1, "Variant")

        const empupdate = employees.map( value => {
            if (value.empid === empid){ 
               value = {
                   ...value,
                   color: variant1,
                   percent: totalcalc < 10 ? 10 : totalcalc ,
               };
               console.log(value)
            }
            return value;
            })
            setemployees(empupdate)
            

    }
    
    // console.log(task,'task', typeof(task))
    // console.log(tasks,'tasks', typeof(tasks))
    return(
        <div>
            <h1>Employee Page <Button onClick={ ()=>dispatch(logout()) } style={{float:'right', marginRight:'30px', marginTop:'10px'}}>Logout</Button></h1>
            <hr/>
            <Row as='h4'style={{textAlign:'center', width:'100%', paddingLeft:'10px'}}>
                <Col>Name : <pre style={{color:'dodgerblue', display:'inline'}}>{name}</pre></Col>
                <Col> Employee ID : <pre style={{color:'tomato', display:'inline'}}>{Id}</pre></Col>
            </Row>
            <hr/>
            <Container>
                <Row as='h5' style={{borderBottom:'solid', padding:'20px'}}>
                    <Col>Tasks Assigned</Col>
                    <Col>Tasks Description</Col>
                    <Col>Tasks Assigned At</Col> 
                    <Col>Given Time Limit</Col>
                    <Col>Status</Col>
                    <Col>Updation</Col>
                    <Col>Request</Col>
                    <Col>Request Status</Col>
                    
                </Row>
                { task.length ? 
                    (task.map( (tasks, index ) => (
                    <Row key={index} style={{borderBottom:'solid', padding:'20px'}} >
                        <Col>{tasks.tasktitle}</Col>
                        <Col>{tasks.taskdesc}</Col>
                        <Col>{tasks.assigndate}</Col>
                        <Col>{tasks.giventime} {tasks.timeformat}</Col>
                        <Col>{tasks.status}</Col>
                        <Col>{!tasks.taskstatus ? <Button size="sm" onClick={()=>handlecomplete(tasks.taskid, tasks.empid)}> Mark As Complete</Button> : `Completed in: ${tasks.finishtime}`}</Col>
                        <Col><Button size="sm" onClick={()=>handlerequest(tasks.taskid)} disabled={tasks.taskstatus || tasks.requestmsg }>Request More Time</Button></Col>
                        <Col>{!tasks.requestmsg ? (tasks.extraatime === null ? 'N/A' : `${tasks.extraatime} Min Added`) : (tasks.extraatime === null ? <h5 style={{color:'red'}}>{tasks.requestmsg}</h5>  : `${tasks.extraatime} Min Added`)}</Col>
                    </Row>
                )))
                 : <h3><br/><br/>No Tasks Assigned...!!</h3> }
            </Container>
        </div>
    );
} 