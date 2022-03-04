import { Routes, Route,  } from 'react-router-dom';
import './App.css';
import { DataProvider} from './Components/Context';
import Login from './Login/Login';
import Employee from './Employee/Employee';
import Manager from './Manager/Manager';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginReducer from './Login/ReduxReducers/LoginReducer';
import PrivateRoute from './Login/PrivateRoute';
import { useTranslation } from 'react-i18next';
import { Button,  } from 'react-bootstrap'; 
import { Performance } from './Manager/Performance';



const store = createStore( LoginReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ); 


function App() {
  const { i18n} = useTranslation("Language"); 
  const changeLanguage = lng => {  
    i18n.changeLanguage(lng);
}
  return (
    // for redux store 
    <div className="App">
      <div style={{float:'left', margin:'10px'}}> 
          <Button size='sm' onClick={() => changeLanguage('en')}>English</Button> &nbsp;&nbsp; 
          <Button  size='sm' onClick={() => changeLanguage('hi')}>Hindi</Button>
      </div>
      <Provider store={store}>  
      {/* for Usecontext   */}
        <DataProvider>
            <Routes>
              <Route path='employee-analyser/' element={<Login/>} />
              <Route path="employee-analyser/employee/*" element={<PrivateRoute> <Employee/> </PrivateRoute> }/>
              <Route path="employee-analyser/manager" element={ <PrivateRoute> <Manager/> </PrivateRoute> } />
              <Route path="employee-analyser/manager/performance" element={<Performance/>}/>
            </Routes>
        </DataProvider>
      </Provider>
    </div>
  );
}

export default App;


