import React, {createContext, useState} from 'react';
// import moment from 'moment';

export const Datas = createContext();

export const DataProvider = (props) =>{
    const [employees, setemployees] = useState([
        {
            id: Date.now()+1,
            name: 'Employee1',
            empid: 1001,
            position: 'Softwware Trainee',
            gender: 'Male',
            percent: 100,
            color:'success',
        },
        {
            id: Date.now()+2,
            name: 'Employee2',
            empid: 1002,
            position: 'Softwware Developer',
            gender: 'Female',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+3,
            name: 'Employee3',
            empid: 1003,
            position: 'Softwware Trainee',
            gender: 'Male',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+4,
            name: 'Employee4',
            empid: 1004,
            position: 'Softwware Developer',
            gender: 'Female',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+5,
            name: 'Employee5',
            empid: 1005,
            position: 'Softwware Developer',
            gender: 'Male',
            color:'success',
            percent: 100
        },
        {
            id: Date.now()+6,
            name: 'Employee6',
            empid: 1006,
            position: 'Softwware Developer',
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
        finishtime: null,
        timeformat:'Min',
        status:'Pending',
        taskstatus: false,
        assigndate:'8:00 PM',
        completedate:'',
        requests:'a',
        percent: 100
        },
        {
            name: 'Employee4',
            empid: 1004,
            tasktitle: 'Learn Javascript',
            taskdesc:'Any 5 Topics',
            giventime: 60,
            finishtime: null,
            timeformat:'Min',
            status:'Pending',
            taskstatus: false,
            assigndate:'3:25 PM',
            completedate:'',
            requests:'',
            percent: 100
        },
    ])
    

    return(
         <div>
            <Datas.Provider value={{employees, setemployees, tasks, setTasks}} >
                {props.children}
            </Datas.Provider>
         </div>
     );
}