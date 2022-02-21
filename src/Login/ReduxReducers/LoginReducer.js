import  {actions} from './ActionTypes'

const initialState = {
        account: 2,
        username:'',
        password:''
};
  
 const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.LOGIN :
            // eslint-disable-next-line no-lone-blocks
            {
                if(action.value.username.toLowerCase() === 'employee'){
                    return  { account: 1, username: action.value.username, password: action.value.password }
                }
                else if(action.value.username.toLowerCase() === 'manager'){
                    return { account: 2, username: action.value.username, password: action.value.password }
                }
                
            }
            break;
            
            case actions.LOGOUT :
                return { account: 0, username: '', password: '' }
        

        default:
            return state;
    }
  };
  export default LoginReducer;