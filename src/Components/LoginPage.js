import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link}from 'react-router-dom'

import ProfileImage from '../img/profile_img.png'

const InputContainer =styled.div`
  display:flex;
  height:3rem;
  justify-content:center;
  flex-direction:row;
  gap:1rem;

`
const LoginForm =styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
  padding:1rem;

`
const UsernameInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`
const PasswordInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`


const ButtonContainer=styled.div`
  display:flex;
  flex-direction:row;
  
  justify-content:space-evenly;
  width:15rem;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;

`
const Button =styled.button`
  height:2.5rem;
  width:5rem;;

`
const SignUpContainer=styled.div`
  display:flex;
  flex-direction:row;
  gap:3px;
`

const SignUp =styled(Link)`
color:white;


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
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1.1rem;
  font-weight:1000;
  color:white;

`
const AliasContainer = styled.p`
  /* border:solid ${theme.BorderColor} 1px; */

`


const LoginPage = ({timeline, changeTimeline}) => {
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
      <>
        {autorizacion === false ?
          <LoginForm onSubmit={handleSubmit}>
            <InputContainer>
              <UsernameInput
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
            </InputContainer>
            <InputContainer>
              <PasswordInput
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
            <SignUpContainer><p>You don't own an account?</p><SignUp to={"/Registration"}>Sign up now!</SignUp></SignUpContainer>
          
          </LoginForm>
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
      </>
       );
}
 
export default LoginPage;