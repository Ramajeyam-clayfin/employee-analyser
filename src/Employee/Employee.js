import React, {useContext, useState, useEffect} from "react";
import moment from "moment";
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../Login/ReduxReducers/Actions';
import {Datas} from '../Components/Context';
import { useTranslation } from 'react-i18next';
import {Button, Container, Row, Col, } from 'react-bootstrap';
import { fakeAuth } from "../Login/fakeAuth"
import { useNavigate } from "react-router-dom"

export default function Employee (){
    const { t, i18n} = useTranslation("Language"); 
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const logindata = useSelector( (state) => state.username)
    const {tasks, employees, setTasks, setemployees} = useContext(Datas);
    const [task, setTask] = useState([]);
    const [name, setName] = useState();
    const [Id, setId] = useState();
    const [variant, setVariant] = useState('');
    const [percent, setPercent] = useState(null);


    useEffect(() => {
        i18n.changeLanguage('en');
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
       
        let totalcalc = percent; //for percantage calculation
        let hour; 
        let calc ;
        let minutesDiff; // for completion time calculation
        let time = moment().format("h:mm a"); //for current time
        let variant1 = variant //for color in percentage bar

        const updates = task.map( (obj) => {
            if (obj.taskid === id) {
                
                let startTime = moment(`${obj.assigndate}`, 'h:mm a'); //converting the task asign time to format of h:mm a
                let endTime =  moment(`${time}`, 'h:mm a'); // converting the task completed time to format of h:mm a
                minutesDiff = endTime.diff(startTime, 'minutes'); //calculate the minutes between starttime and endtime 
                
                if(minutesDiff > 60){ // if time taken is greater than 60 means we converting minutes into hours
                    hour = moment('00:00', "hh:mm").add(minutesDiff, 'minutes').format('hh:mm')
                }
                console.log(minutesDiff)

                const giventime = moment.duration(moment(obj.giventime, 'HH:mm').format("HH:mm")).asMinutes() // it will converts the given time to minutes
                console.log(giventime)

                if(minutesDiff > giventime){ //here we check the time taken to complete the task is greater than the given time
                    let calc1 = (minutesDiff - giventime)/giventime*100; //calculating the percentage (time taken / given time)/ giventime x 100
                    calc = Math.round(100-calc1); // calc1 is minus by 100 remaining value is our percentage
                    if(Math.sign(calc) === -1){ // if percentage contains negative value means assigning as lowest percentage of 10%
                        calc = 10 ; 
                    }
                }
                else { //if the time taken is less than given time means percentage will be 100%
                    calc = 100;
                   
                }
                totalcalc = Math.round((totalcalc + calc)/2) // previous percentage and cuurent percentage is tallyed
                
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

    const handlelogout = () =>{
        dispatch(logout())
        fakeAuth.logout( () => navigate("/", { state: { from: { pathname: "/" } } }) )
    }

    return(
        <div>
            <h1>{t("Employee Page")} <Button onClick={() => handlelogout()} style={{float:'right', marginRight:'30px', marginTop:'10px'}}>{t("logout")}</Button></h1>
            <hr/>
            <Row as='h4'style={{textAlign:'center', width:'100%', paddingLeft:'10px'}}>
                <Col>{t("Name")} : <pre style={{color:'dodgerblue', display:'inline'}}>{name}</pre></Col>
                <Col>{t("Employee ID")} : <pre style={{color:'tomato', display:'inline'}}>{Id}</pre></Col>
            </Row>
            <hr/>
            <Container>
                <Row as='h5' style={{borderBottom:'solid', padding:'20px'}}>
                    <Col>{t("Tasks Assigned")}</Col>
                    <Col>{t("Tasks Description")}</Col>
                    <Col>{t("Tasks Assigned At")}</Col> 
                    <Col>{t("Given Time Limit")}</Col>
                    <Col>{t("Status")}</Col>
                    <Col>{t("Updation")}</Col>
                    <Col>{t("Request")}</Col>
                    <Col>{t("Request Status")}</Col>
                    
                </Row>
                { task.length ? 
                    (task.map( (tasks, index ) => (
                    <Row key={index} style={{borderBottom:'solid', padding:'20px'}} >
                        <Col>{tasks.tasktitle}</Col>
                        <Col>{tasks.taskdesc}</Col>
                        <Col>{tasks.assigndate}</Col>
                        <Col>{tasks.giventime} {tasks.timeformat}</Col>
                        <Col>{tasks.status}</Col>
                        <Col>{!tasks.taskstatus ? <Button size="sm" onClick={()=>handlecomplete(tasks.taskid, tasks.empid)}> {t("Mark As Complete")}</Button> : `${t('Completed in')}: ${tasks.finishtime}`}</Col>
                        <Col><Button size="sm" onClick={()=>handlerequest(tasks.taskid)} disabled={tasks.taskstatus || tasks.requestmsg }>{t("Request More Time")}</Button></Col>
                        <Col>{!tasks.requestmsg ? (tasks.extraatime === null ? 'N/A' : `${tasks.extraatime} ${t("Min Added")}`) : (tasks.extraatime === null ? <h5 style={{color:'red'}}>{tasks.requestmsg}</h5>  : `${tasks.extraatime} ${t("Min Added")}`)}</Col>
                    </Row>
                )))
                 : <h3><br/><br/>{t("No Tasks Assigned")}...!!</h3> }
            </Container>
        </div>
    );
} 