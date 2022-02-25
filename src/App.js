import { Routes, Route } from 'react-router-dom';
import './App.css';
import { DataProvider} from './Components/Context';
import Login from './Login/Login'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginReducer from './Login/ReduxReducers/LoginReducer';



const store = createStore( LoginReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ); 


function App() {
  return (
    // for redux store 
    <Provider store={store}>  
    {/* for Usecontext   */}
      <DataProvider>
        <div className="App">
          <Routes>
            <Route index element={<Login/>} />
          </Routes>
        </div>
      </DataProvider>
    </Provider>
  );
}

export default App;


