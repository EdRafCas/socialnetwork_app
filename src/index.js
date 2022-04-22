import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import theme from './Theme.js'
import ProfileImage from './img/profile_img.png'
import RegistrationPage from './Components/SignUp.js';
import MainPage from './Components/MainPage.js';
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




  return ( 
    <Container>
      <BrowserRouter>
        <Routes>
            <Route path="/" exact={true} 
                            element={<MainPage MessagesTimeline={MessagesTimeline}
                                                changeTimeline={changeTimeline}
                                                timeline={timeline}
                                                changeRegistration={changeRegistration}
                                                registration={registration}/>}
                            />
            <Route path="/Registration" exact ={true} element={<RegistrationPage/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
   );
}
 
ReactDOM.render( <Index />, document.getElementById('root')
);