import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link}from 'react-router-dom';
import {InputContainer, Formulary, FormularyInput, ButtonContainer, Button, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_img.png'


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

const LoginPage = ({timeline, changeTimeline, autorization, changeAutorization, username, usernameChange, password, passwordChange, message, messageChange}) => {

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
          changeAutorization(!autorization);
          console.log(autorization)
        }
        if (e.target.name === "sendMesssage"){
          changeAutorization(false)
          console.log(autorization)
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
      <AccountManagement>
        {autorization === false ?
          <Formulary LoginUpFormulary onSubmit={handleSubmit}>
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
      );
}
 
export default LoginPage;
