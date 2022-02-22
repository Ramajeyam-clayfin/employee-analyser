import  {actions} from './ActionTypes'


const initialState = {
        employees : [
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
            
        ]
        
};
  
 const ManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.LOGOUT :
            return { employeess: 0 }
        

        default:
            return state;
    }
  };
  export default ManagerReducer;



  // import {metadata} from './MetaData'
// import axios from 'axios';

// const metadata = ()=> axios.get('https://jsonplaceholder.typicode.com/users/').then( response => response.data)
// const metadata = () => {
//     let value = [];
//     let path = 'https://jsonplaceholder.typicode.com/users/'

//     axios.get(path).then(
//         (response) => {
//             // let result = response.data;
//             value = response.data;
//             console.log(value);
//             return value
//         },
//     );
//     console.log(value)
//     return value
// }
// metadata()
// console.log(metadata);