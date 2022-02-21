import  {actions} from './ActionTypes'
// import {metadata} from './MetaData'
import axios from 'axios';

const metadata = ()=> axios.get('https://jsonplaceholder.typicode.com/users/').then( response => response.data)
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
console.log(metadata);

const initialState = {
        employees : metadata
        
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