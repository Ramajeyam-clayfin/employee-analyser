import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { Nav, Navbar, Container} from 'react-bootstrap'; 
// import {Link, Outlet} from 'react-router-dom';
import Login from './Login/Login'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginReducer from './Login/ReduxReducers/LoginReducer';

const store = createStore( LoginReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ); 


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


