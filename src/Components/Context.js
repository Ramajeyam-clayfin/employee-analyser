import React, {createContext, useState} from 'react';

export const Datas = createContext();

export const DataProvider = (props) =>{
    const [employees, setemployees] = useState([
        {
            id: Date.now()+1,
            name: 'Employee 1',
            empid: 1001,
            position: 'Softwware Trainee',
            gender: 'Male'
        },
        {
            id: Date.now()+2,
            name: 'Employee 2',
            empid: 1002,
            position: 'Softwware Developer',
            gender: 'Female'
        },
        {
            id: Date.now()+3,
            name: 'Employee 3',
            empid: 1003,
            position: 'Softwware Trainee',
            gender: 'Male'
        },
        {
            id: Date.now()+4,
            name: 'Employee 4',
            empid: 1004,
            position: 'Softwware Developer',
            gender: 'Female'
        },
    ]);
    const [tasks, setTasks] = useState({
        tasktitile: 'Learn Javascript',
        taskdesc:'Any 5 Topics',
        empid: 1002,
        giventime: 60,
        timeformat:'Min'
    });
    

    return(
         <div>
            <Datas.Provider value={{employees, setemployees, tasks, setTasks}} >
                {props.children}
            </Datas.Provider>
         </div>
     );
}