import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import LoginPage from './LoginPage'

const ContainerLogin=styled.div`
  width:100%;
  height:100%;
  display:grid;
  grid-template-columns: repeat(1, 3fr 2fr);
  justify-content: flex-start;
  background:${theme.GradientBackround};

@media(max-width: 760px){ 
  display:flex;
  flex-direction:column-reverse;
}
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

const UserNameContainer =styled.div`
  width:100%;
  padding:0rem;
  border-bottom:solid ${theme.BorderColor} 1px;
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
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

const MainPage = ({timeline, changeTimeline, changeRegistration, alert, changeAlert, stateAlert, changeStateAlert}) => {
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  const [message, messageChange] = useState('');
  const [autorization, changeAutorization] =useState(false);
  
      
      return ( 
      <ContainerLogin>
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
      <LoginPage timeline={timeline} 
                changeTimeline={changeTimeline}
                autorization={autorization}
                changeAutorization={changeAutorization}
                email={email}
                emailChange={emailChange}
                password={password}
                passwordChange={passwordChange}
                message={message}
                messageChange={messageChange}
                alert={alert}
                changeAlert={changeAlert}
                stateAlert={stateAlert}
                changeStateAlert={changeStateAlert}
                  
      />
        
      </ContainerLogin>
       );
}
 
export default MainPage;