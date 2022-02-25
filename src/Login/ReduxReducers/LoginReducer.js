import  {actions} from './ActionTypes'

const initialState = {
        account: 0,
        username:'',
        password:'',
        erroruser:'',
        errorpass:'',
};
  
 const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.LOGIN :
            // eslint-disable-next-line no-lone-blocks
            {
                if(action.erroruser === '' && action.errorpass === '' ){
                    if(action.value.username.toLowerCase() === 'manager'){
                        return  { 
                            account: 2, 
                            username: action.value.username, 
                            password: action.value.password, 
                            erroruser: action.erroruser, 
                            errorpass:action.errorpass 
                        }
                    }
                    else {
                        return { 
                            account: 1, 
                            username: action.value.username, 
                            password: action.value.password, 
                            erroruser: action.erroruser, 
                            errorpass:action.errorpass 
                        }
                    }
                }
                else return { 
                    account: 0, 
                    username: action.value.username, 
                    password: action.value.password, 
                    erroruser: action.erroruser, 
                    errorpass:action.errorpass 
                }
                
            }

        case actions.LOGOUT :
            {
                
                return {...initialState}

            }

        default:
            return state;
    }
  };
  export default LoginReducer;

  