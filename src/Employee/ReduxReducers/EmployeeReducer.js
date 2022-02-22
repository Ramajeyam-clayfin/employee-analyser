import  {actions} from './ActionTypes'


const initialState = {
        tasks : {
            tasktitile: 'Learn Javascript',
            taskdesc:'Any 5 Topics',
            empid: 1002,
            giventime: 60,
            timeformat:'Min'
        }
        
};
  
 const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.LOGOUT :
            return { tasks: 0 }
        

        default:
            return state;
    }
  };
  export default EmployeeReducer;

