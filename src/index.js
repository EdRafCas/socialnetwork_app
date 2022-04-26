import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import theme from './Theme.js'
import ProfileImage from './img/profile_img.png'
import SignUp from './Components/SignUp.js';
import MainPage from './Components/MainPage.js';
import LoginPage from './Components/LoginPage.js';
import './index.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Montserrat', 'sans-serif']
  }
});

const MessagesTimeline =[
  {
    id:1,
    profilePicture:ProfileImage,
    username:"Eduardo",
    alias:"Ed",
    message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing"
  },
  {
    id:2,
    profilePicture:ProfileImage,
    username:"Sara",
    alias:"Mer",
    message:"Lorem Ipsum is simply dummy text "
  }
  
]

const Container = styled.div`
  height: 100vh;
  border:solid black 15px;
  z-index: 100;
  min-height:750px;
  min-width:375px;
  color: ${theme.Text};
`
const Index = () => {
  
  const [timeline, changeTimeline] = useState(MessagesTimeline)
  const [registration, changeRegistration] = useState(false)
  const [stateAlert, changeStateAlert] =useState(false);
  const [alert, changeAlert] = useState ({})




  return ( 
    <Container>
      <BrowserRouter>
        <Routes>
            <Route path="/" exact={true} 
                            element={<MainPage MessagesTimeline={MessagesTimeline}
                                              changeTimeline={changeTimeline}
                                              timeline={timeline}
                                              changeRegistration={changeRegistration}
                                              registration={registration}
                                              alert={alert}
                                              changeAlert={changeAlert}
                                              stateAlert={stateAlert}
                                              changeStateAlert={changeStateAlert}/>}/>
            <Route path="/LoginPage" exact={true} 
                            element={<LoginPage MessagesTimeline={MessagesTimeline}
                                              changeTimeline={changeTimeline}
                                              timeline={timeline}
                                              changeRegistration={changeRegistration}
                                              registration={registration}
                                              alert={alert}
                                              changeAlert={changeAlert}
                                              stateAlert={stateAlert}
                                              changeStateAlert={changeStateAlert}/>}/>
            <Route path="/SignUp" exact ={true} element={<SignUp alert={alert}
                                                                changeAlert={changeAlert}
                                                                stateAlert={stateAlert}
                                                                changeStateAlert={changeStateAlert}/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
   );
}
 
ReactDOM.render( <Index />, document.getElementById('root')
);