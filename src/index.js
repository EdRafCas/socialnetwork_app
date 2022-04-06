import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import theme from './Theme.js'
import ProfileImage from './img/profile_img.png'
import RegistrationPage from './Components/SignUp.js';
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
  display:grid;
  grid-template-columns: repeat(1, 3fr 2fr);
  justify-content: flex-start;
  position: relative;
  z-index: 100;
  min-height:750px;
  color: #B2B1B9;
`
const Timeline = styled.div`
  
  height:100%;
  display:flex;
  flex-direction:column;
  padding:0rem;
  border:solid ${theme.BorderColor} 1px;
  gap:0rem;
  overflow:scroll;
  overflow-x:hidden;
`
const Card =styled.div`
  
  
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  border-bottom:solid ${theme.BorderColor} 1px;
  /* border-radius:15px; */
  gap:0rem;
  background:black;

`
const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top: ${(props) => props.rightColumn && "0.5rem"};
  padding-right: ${(props) => props.rightColumn && "0.5rem"};
  padding-bottom: ${(props) => props.rightColumn && "0.5rem"};
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  gap:0.5rem;
`
const PortraitContainer =styled.div`
  border: solid red 1px;
  padding:0;
  width:100%;
  border-radius:50%;
  height:auto;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  width:3rem;
  flex-direction:column;
  overflow:hidden;
  img{
    width:100%;
    
  }
`
const UserNameContainer =styled.div`
  width:100%;
  padding:0rem;
  border-bottom:solid ${theme.BorderColor} 1px;
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  
`
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1.1rem;
  font-weight:1000;
  color:white;

`
const AliasContainer = styled.p`
  /* border:solid ${theme.BorderColor} 1px; */
  

`
const MessageContent = styled.div`
  width:100%;
  padding:0rem;
  max-height:200px;
  min-height:50px;
  font-size:1rem;
  font-weight:400;
  color:white;
  /* border:solid ${theme.BorderColor} 1px; */
  text-align:justify;
  white-space:normal;
  overflow:hidden;
`
const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:solid ${theme.BorderColor} 1px;
  width:100%;
  

`
const AccountManagement = styled.div`
  height:500px;
  padding:1rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
`


const Index = () => {
  
  const [timeline, changeTimeline] = useState(MessagesTimeline)




  return ( 
    <Container>
      <Timeline>
        {timeline.map((Messages, index)=>{
          return(
            <Card key={index}>
            <CardColumns>
              <PortraitContainer>
                <img alt="userportrait" src={Messages.profilePicture}/>
              </PortraitContainer>
              
            </CardColumns>
            <CardColumns rightColumn>
              <UserNameContainer>
                <NameContainer>{Messages.username}</NameContainer><AliasContainer>@{Messages.alias}</AliasContainer>
              </UserNameContainer>
              <MessageContent>
                {Messages.message}
                
              </MessageContent>
              <InteractionBar>
              <div>A</div>
              <div>B</div>
              <div>C</div>
              <div>D</div>
              </InteractionBar>
            </CardColumns>

          
        </Card>  
          )
        })}
                  
      </Timeline>
      
      <AccountManagement>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<LoginPage 
                                                  MessagesTimeline={MessagesTimeline}
                                                  changeTimeline={changeTimeline}
                                                  timeline={timeline}
          />}/>
          <Route path="/Registration" exact ={true} element={<RegistrationPage/>}/>
        </Routes>
      </BrowserRouter>

      

      </AccountManagement>
      
      
    </Container>
   );
}
 
ReactDOM.render( <Index />, document.getElementById('root')
);