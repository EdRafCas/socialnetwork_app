import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import theme from './Theme.js'
import SignUp from './Components/SignUp.js';
import LoginPage from './Components/LoginPage.js';
import { AuthProvider } from './Context/AuthContext.js';
import PrivateRoute from './Components/PrivateRoute.js';
import './index.css';
import WebFont from 'webfontloader';
import MainPage from './Components/MainPage'

WebFont.load({
  google: {
    families: ['Montserrat', 'sans-serif']
  }
});

const Container = styled.div`
  height: 100vh;
  border:solid black 15px;
  z-index: 100;
  min-height:750px;
  min-width:375px;
  color: ${theme.Text};
`
const Index = () => {
  const [stateAlert, changeStateAlert] =useState(false);
  const [alert, changeAlert] = useState ({})

  return ( 
    <Container>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="*" exact={true} 
                              element={
                              <PrivateRoute>
                                    <MainPage 
                                      alert={alert}
                                      changeAlert={changeAlert}
                                      stateAlert={stateAlert}
                                      changeStateAlert={changeStateAlert}/>
                              </PrivateRoute>}/>
              
            <Route path="/LoginPage" exact={true} 
                                    element={<LoginPage 
                                      
                                      alert={alert}
                                      changeAlert={changeAlert}
                                      stateAlert={stateAlert}
                                      changeStateAlert={changeStateAlert}/>}/>
            <Route path="/SignUp" exact ={true} 
                                  element={<SignUp alert={alert}
                                    changeAlert={changeAlert}
                                    stateAlert={stateAlert}
                                    changeStateAlert={changeStateAlert}/>}/>
          </Routes>
        </BrowserRouter> 
      </AuthProvider>
      
    </Container>
   );
}
 
ReactDOM.render( <Index />, document.getElementById('root')
);