import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link}from 'react-router-dom'
import {InputContainer, Formulary, FormularyInput, ButtonContainer, Button} from '../Elements/ElementsFormulary'

import ProfileImage from '../img/profile_img.png'

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
  width:100%;
  height:500px;
  padding:1rem 1rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
`
const SignUpContainer=styled.div`
  display:flex;
  flex-direction:row;
  gap:1px;
`
const SignUp =styled(Link)`
  background:none;
  color:${theme.Text};
  border:solid ${theme.BorderColor} 1px;
`
const CreateMessageForm =styled.form`
  display:flex;
  flex-direction:column;
  gap:1rem;
`
const HeaderUser =styled.div`
  display:flex;
  flex-direction:row;
  gap:1rem;
`
const MessageUser =styled.textarea`
  padding:1rem;
  font-size:1rem;
  text-align:justify;
  white-space:normal;
  overflow:scroll;
  width:100%;
`
const UserNames =styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:5px;
`


const LoginPage = ({timeline, changeTimeline, changeRegistration}) => {
  const [username, usernameChange] = useState('');
  const [password, passwordChange] = useState('');
  const [message, messageChange] = useState('');
  const [autorizacion, changeAutorizacion] =useState(false);
      


  const handleChange = (e) =>{
        if(e.target.name ==="username"){
          usernameChange(e.target.value)
          console.log(username)
        }
        if(e.target.name==="password"){
          passwordChange(e.target.value)
          console.log(password)
        }
        if(e.target.name==="message"){
          messageChange(e.target.value)
          
        }
    
      };
    
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (password ==="123456"){
      changeAutorizacion(!autorizacion);
      console.log(autorizacion)
    }
    if (e.target.name === "sendMesssage"){
      changeAutorizacion(false)
      console.log(autorizacion)
    }
  } 

  const addToTimeline = (e) =>{
    e.preventDefault();
    if(timeline.length>0){
      const newTimeline = [...timeline];
      newTimeline.unshift(
        {
          id:3,
          profilePicture:ProfileImage,
          username:"username",
          alias:"alias",
          message:message
        }
      );
      changeTimeline(newTimeline);
      console.log(timeline)
    }
    
    
    
  }

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
      <AccountManagement>
        {autorizacion === false ?
          <Formulary onSubmit={handleSubmit}>
            <InputContainer>
              <FormularyInput
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
            </InputContainer>
            <InputContainer>
              <FormularyInput
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={handleChange}/>
            </InputContainer>
            <ButtonContainer>
              <Button type="submit" >Login</Button>
            </ButtonContainer>
            <SignUpContainer><span>Don't own an account?</span><span><SignUp to="/Registration">Sign up</SignUp></span>
            </SignUpContainer> 
          </Formulary>
        :
        <CreateMessageForm onSubmit={addToTimeline}>
          <HeaderUser>
            <PortraitContainer>
              <img alt="userportrait" src={ProfileImage}/>
            </PortraitContainer>
            <UserNames><NameContainer>hi</NameContainer><AliasContainer>hello</AliasContainer></UserNames>
          </HeaderUser>
          <MessageUser 
            name="message"
            id="message"
            cols="50"
            rows="10"
            type="text"
            placeholder="Leave us your message here"
            value={message}
            onChange={handleChange}/>
        <Button type="submit" name="sendMesssage">Submit</Button>
        </CreateMessageForm>}
      </AccountManagement>
        
      </ContainerLogin>
       );
}
 
export default LoginPage;