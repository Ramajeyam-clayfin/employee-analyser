import React, {createContext, useState} from 'react';
// import moment from 'moment';

export const Datas = createContext();

export const DataProvider = (props) =>{
    const [employees, setemployees] = useState([
        {
            id: Date.now()+1,
            name: 'Employee1',
            empid: 1001,
            position: 'Software Trainee',
            gender: 'Male',
            percent: 100,
            color:'success',
        },
        {
            id: Date.now()+2,
            name: 'Employee2',
            empid: 1002,
            position: 'Software Developer',
            gender: 'Female',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+3,
            name: 'Employee3',
            empid: 1003,
            position: 'Software Trainee',
            gender: 'Male',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+4,
            name: 'Employee4',
            empid: 1004,
            position: 'Software Developer',
            gender: 'Female',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+5,
            name: 'Employee5',
            empid: 1005,
            position: 'Software Trainee',
            gender: 'Male',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+6,
            name: 'Employee6',
            empid: 1006,
            position: 'Software Developer',
            gender: 'Female',
            color:'success',
            percent: 100
        },
    ]);
    const [tasks, setTasks]= useState([{
        name: 'Employee6',
        empid: 1006,
        tasktitle: 'Learn Javascript',
        taskdesc:'Any 5 Topics',
        giventime: 60,
        extraatime: null,
        finishtime: null,
        timeformat:'Min',
        status:'Pending',
        taskstatus: false,
        assigndate:'03:00 PM',
        completedate:'',
        requests:false,
        requestmsg:'Requested',
        taskid: 1645686727071
        },
        {
            name: 'Employee4',
            empid: 1004,
            tasktitle: 'Learn React',
            taskdesc:'Any 5 Topics',
            giventime: 60,
            finishtime: null,
            extraatime: null,
            timeformat:'Min',
            status:'Pending',
            taskstatus: false,
            assigndate:'3:25 PM',
            completedate:'',
            requests:false,
            requestmsg:'',
            taskid:1645686727080
        },
    ])
    const [showC, setShowC] = useState(false);
    const [showA, setShowA] = useState(false);
    const [Name, setName] = useState();
    const [Id, setId] = useState();

    return(
         <div>
            <Datas.Provider value={{employees, setemployees, tasks, setTasks, showC, setShowC, showA, setShowA, Name, setName, Id, setId }} >
                {props.children}
            </Datas.Provider>
         </div>
     );
}