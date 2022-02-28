import React, {createContext, useState} from 'react';
import { metadata } from './MetaData';

export const Datas = createContext();

export const DataProvider = (props) =>{
    const [employees, setemployees] = useState([...metadata]);
    const [showC, setShowC] = useState(false);
    const [showA, setShowA] = useState(false);
    const [Name, setName] = useState();
    const [Id, setId] = useState();
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
        assigndate:'08:00 AM',
        completedate:'',
        requests:false,
        requestmsg:'Requested',
        taskid: 1645686727071,
        taskpercent : 0,
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
            assigndate:'8:15 AM',
            completedate:'',
            requests:false,
            requestmsg:'',
            taskid:1645686727080,
            taskpercent : 0,
        },
        
    ])
 

    return(
         <div>
            <Datas.Provider value={{employees, setemployees, tasks, setTasks, showC, setShowC, showA, setShowA, Name, setName, Id, setId }} >
                {props.children}
            </Datas.Provider>
         </div>
     );
}