import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link}from 'react-router-dom';
import {InputContainer, Formulary, FormularyInput, ButtonContainer, Button, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_img.png'
import {createUserWithEmailAndPassword } from "firebase/auth"
import {useNavigate} from 'react-router-dom'
import {auth} from './../firebase/FirebaseConfig';


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

const LoginPage = ({timeline, changeTimeline, autorization, changeAutorization, email, emailChange, password, passwordChange, message, messageChange, alert, changeAlert, stateAlert, changeStateAlert}) => {

  const navigate = useNavigate();

  const handleChange = (e) =>{
        if(e.target.name ==="email"){
          emailChange(e.target.value)
          console.log(email)
        }
        if(e.target.name==="password"){
          passwordChange(e.target.value)
          console.log(password)
        }
        if(e.target.name==="message"){
          messageChange(e.target.value)
          
        }
    
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    changeStateAlert(false);
    changeAlert({});

    const regularExpressionEmail=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    const regularExpressionNames=/^\w+\s?\w+?$/;
    if (!regularExpressionEmail.test(email)){
          changeStateAlert(true);
          changeAlert({
                type:'error',
                message: 'Please provide a valid email'
          })
          return;
    }

    if(email === "" || password === ""){
          changeStateAlert(true);
          changeAlert({
                type:'error',
                message: 'Please fill all fields'
          })
          return;
    }
    try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/");
    } catch(error){
          changeStateAlert(true)
          let message;
          switch(error.code){
                case 'auth/invalid-password':
                      message = 'Password must be at least 6 characters'
                      break;
                case 'auth/email-already-in-use':
                      message = 'The email is already registered'
                      break;
                case 'auth/invalid-email':
                      message = 'The provided email is not valid'
                      break;
                default:
                      message = 'An error ocurred creating the account'
                      break;
          }
         changeAlert({
               type:'error',
               message:message
         });
    }

};

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
        });
      changeTimeline(newTimeline);
      console.log(timeline)
    } 
  };

      return ( 
      <AccountManagement>
        {autorization === false ?
          <Formulary LoginUpFormulary onSubmit={handleSubmit}>
            <InputContainer>
              <FormularyInput
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
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
