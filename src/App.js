import { Routes, Route } from 'react-router-dom';
import './App.css';
import { DataProvider} from './Components/Context';
import Login from './Login/Login'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginReducer from './Login/ReduxReducers/LoginReducer';
// import ManagerReducer from './Manager/ReduxReducer/ManagerReducer';
// import EmployeeReducer from './Employee/ReduxReducers/EmployeeReducer';

// const combinereducers = combineReducers({
//     login: LoginReducer,
//     manager: ManagerReducer,
//     employee: EmployeeReducer
//   });

const store = createStore( LoginReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ); 


function App() {
  return (
    <Provider store={store}>   
      <DataProvider>
        <div className="App">
          <Routes>
            <Route index element={<Login/>} />
            <Route />
            <Route />
          </Routes>
        </div>
      </DataProvider>
    </Provider>
  );
}

export default App;


