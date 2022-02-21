import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { Nav, Navbar, Container} from 'react-bootstrap'; 
// import {Link, Outlet} from 'react-router-dom';
import Login from './Login/Login'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import LoginReducer from './Login/ReduxReducers/LoginReducer';
import ManagerReducer from './Manager/ReduxReducer/ManagerReducer';

const combinereducers = combineReducers({
    login: LoginReducer,
    manager: ManagerReducer
  });

const store = createStore( combinereducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ); 


function App() {
  return (
    <Provider store={store}>   
      <div className="App">
        <Routes>
          <Route index element={<Login/>} />
          <Route />
          <Route />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;


