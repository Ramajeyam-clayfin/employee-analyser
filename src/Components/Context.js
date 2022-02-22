import React, {createContext, useState} from 'react';

export const Datas = createContext();

export const DataProvider = (props) =>{
    const [employees, setemployees] = useState([
        {
            id: Date.now()+1,
            name: 'Employee1',
            empid: 1001,
            position: 'Softwware Trainee',
            gender: 'Male',
        },
        {
            id: Date.now()+2,
            name: 'Employee2',
            empid: 1002,
            position: 'Softwware Developer',
            gender: 'Female',
        },
        {
            id: Date.now()+3,
            name: 'Employee3',
            empid: 1003,
            position: 'Softwware Trainee',
            gender: 'Male',
        },
        {
            id: Date.now()+4,
            name: 'Employee4',
            empid: 1004,
            position: 'Softwware Developer',
            gender: 'Female',
        },
        {
            id: Date.now()+5,
            name: 'Employee5',
            empid: 1005,
            position: 'Softwware Developer',
            gender: 'Male',
        },
        {
            id: Date.now()+6,
            name: 'Employee6',
            empid: 1006,
            position: 'Softwware Developer',
            gender: 'Female',
        },
    ]);
    const [tasks, setTasks]= useState([])
    

    return(
         <div>
            <Datas.Provider value={{employees, setemployees, tasks, setTasks}} >
                {props.children}
            </Datas.Provider>
         </div>
     );
}