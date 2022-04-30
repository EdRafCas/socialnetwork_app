import React,{useState} from 'react';
import styled from 'styled-components';
import {Link}from 'react-router-dom';
import {Formulary, FormularyInput}  from '../Elements/ElementsFormulary';
import theme from '../Theme.js';
import DatePicker from './DatePicker';
import {ButtonContainer} from '../Elements/ElementsFormulary';
import {auth} from './../firebase/FirebaseConfig';
import {createUserWithEmailAndPassword } from "firebase/auth"
import {useNavigate} from 'react-router-dom';
import Alert from './../Elements/Alert';
import AddUser from '.././firebase/AddUser';


const RegistrationContainer =styled.div`
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width:100%;
      height:100%;
      padding:1rem;
      /* margin-top:-50px;
      margin-left:-200px; */
      /* border: solid ${theme.BorderColor} 1px; */
      /* background:rgba(91, 112, 131, 0.8); */
      background:${theme.LightGrey};
      
`
const RegistrationBox=styled.div`
      display:flex;
      flex-direction:column;
      border-radius:30px;
      padding:1rem;
      /* border: solid ${theme.BorderColor} 1px; */
      width:100%;
      max-height:80%;
      max-width:40rem;
      background:black;
`
const RegistrationInputContainer=styled.div`
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      gap:1rem;
`
const RedirectContainer=styled.div`
      display:flex;
      flex-direction:row;
      gap:3px;
`
const LogInNow =styled(Link)`
      color:${theme.Text};
`
const LinkContainer=styled.div`
      display:flex;
      flex-direction:row;
      justify-content:flex-start;
      /* border: solid ${theme.BorderColor} 1px; */
      padding: 0.5rem 0.5rem;
`
const ReturnToLogin=styled(Link)`
      display:flex;
      flex-direction:row;
      justify-content:center;
      width:2rem;
      font-size:1rem;
      color:white;
      /* border: solid ${theme.BorderColor} 1px; */
      padding:5px;
      text-decoration:none;
      border-radius:50%;
      :hover{
            background:rgba(91, 112, 131, 0.8);
      }
`
const SpanInputInitial =styled.span`
      position:absolute;
      font-size:1rem;
      pointer-events:none;
      transition: none;
      color:transparent;
      left:3px;
      top:1px;       
`
const SpanInputFinal =styled.span`
      position:absolute;
      font-size:11px;
      pointer-events:none;
      transition: 0.2s ease all;
      left:3px;
      top:1px;
      color:${theme.Text};  
`
const ButtonSignUp =styled.button`
      height:3rem;
      width:100%;
      border-radius:20px;
      font-weight:800;
      font-size:1rem;
      :hover{
            opacity:0.8;
      }
      :active{
            opacity:0.6;
      }
      

`


const SignUp = ({alert,changeAlert,stateAlert,changeStateAlert }) => {
      const navigate = useNavigate();
      
      const [nameHolder, changeNameHolder] =useState("")
      const [lastnameHolder, changeLastnameHolder] =useState("")
      const [aliasHolder, changeAliasHolder] =useState("")
      const [emailHolder, changeEmailHolder] =useState("")
      const [passwordHolder, changePasswordHolder] =useState("")
      const [password2Holder, changePassword2Holder] =useState("")
      const [birthMonth, changeBirthMonth] =useState("");
      const [birthDay, changeBirthDay] =useState("");
      const [birthYear, changeBirthYear] =useState("");

      const handleChange = (e) =>{
            switch(e.target.name){
                  case 'name':
                        changeNameHolder(e.target.value);
                        break;
                  case 'lastname':
                        changeLastnameHolder(e.target.value);
                        break;
                  case 'alias':
                        changeAliasHolder(e.target.value);
                        break;
                  case 'email':
                        changeEmailHolder(e.target.value);
                        break;
                  case 'password':
                        changePasswordHolder(e.target.value);
                        break;
                  case 'password2':
                        changePassword2Holder(e.target.value);
                        break;
                  default:
                        break;
            }
      }

      const handleSubmit = async (e) => {
            e.preventDefault();
            changeStateAlert(false);
            changeAlert({});

            
            const regularExpressionEmail=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
            const regularExpressionNames=/^\w+\s?\w+?$/;
            if (!regularExpressionEmail.test(emailHolder)){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please provide a valid email'
                  })
                  return;
            }
            if (!regularExpressionNames.test(nameHolder)){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please provide a valide name'
                  })
                  return;
            }
            if (!regularExpressionNames.test(lastnameHolder)){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please provide a valide lastname'
                  })
                  return;
            }
            if(emailHolder === "" || passwordHolder === "" || password2Holder === "" || nameHolder === "" || lastnameHolder === "" || aliasHolder === ""){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please fill all fields'
                  })
                  return;
            }
            if(birthDay === "" || birthMonth=== "" || birthYear === ""){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please provide a valid birthday date'
                  })
                  return;
            }
            if(passwordHolder !== password2Holder){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Both passwords must be the same'
                  })
                  return;
            }

            try {
                  await createUserWithEmailAndPassword(auth, emailHolder, passwordHolder);
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
      
      return ( 
            <RegistrationContainer>
                  <RegistrationBox>
                        <LinkContainer>
                           <ReturnToLogin to="/">X</ReturnToLogin>   
                        </LinkContainer>
                        <Formulary SignUpFormulary onSubmit={handleSubmit}>
                              <>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="name"
                                          value={nameHolder}
                                          placeholder="Name"
                                          onChange={handleChange}
                                    />
                                    {nameHolder ==="" ?
                                          <SpanInputInitial>Name</SpanInputInitial> :
                                          <SpanInputFinal>Name</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="lastname"
                                          value={lastnameHolder}
                                          placeholder="Lastname"
                                          onChange={handleChange}
                                    />
                                    {lastnameHolder ==="" ?
                                          <SpanInputInitial> Lastname</SpanInputInitial> :
                                          <SpanInputFinal>Lastname</SpanInputFinal>
                                    }
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="alias"
                                          value={aliasHolder}
                                          placeholder="Alias"
                                          onChange={handleChange}
                                    />
                                    {aliasHolder ==="" ?
                                          <SpanInputInitial> Alias</SpanInputInitial> :
                                          <SpanInputFinal>Alias</SpanInputFinal>
                                    }   
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="email"
                                          name="email"
                                          value={emailHolder}
                                          placeholder="Email"
                                          onChange={handleChange}
                                    />
                                    {emailHolder ==="" ?
                                          <SpanInputInitial>Email</SpanInputInitial> :
                                          <SpanInputFinal>Email</SpanInputFinal>
                                    }
                              </RegistrationInputContainer>
                              <RegistrationInputContainer >
                                    <FormularyInput Registration
                                          type="password"
                                          name="password"
                                          value={passwordHolder}
                                          placeholder="Password"
                                          onChange={handleChange}
                                    />
                                    {passwordHolder ==="" ?
                                          <SpanInputInitial>Password</SpanInputInitial> :
                                          <SpanInputFinal>Password</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              <RegistrationInputContainer >
                                    <FormularyInput Registration
                                          type="password"
                                          name="password2"
                                          value={password2Holder}
                                          placeholder=" Confirm Password"
                                          onChange={handleChange}
                                    />
                                    {passwordHolder ==="" ?
                                          <SpanInputInitial>Confirm password</SpanInputInitial> :
                                          <SpanInputFinal>Confirm password</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              </>
                              <DatePicker
                                    birthMonth={birthMonth}
                                    changeBirthMonth={changeBirthMonth}
                                    birthDay={birthDay}
                                    changeBirthDay={changeBirthDay}
                                    birthYear={birthYear}
                                    changeBirthYear={changeBirthYear}

                              />
                              <ButtonContainer>
                                    <ButtonSignUp type="submit" name="sendMesssage">Continue</ButtonSignUp>
                              </ButtonContainer>
                        </Formulary>
                  </RegistrationBox>
                  <RedirectContainer><p>Alreay have an account?</p><LogInNow to={"/"}>Log in now!</LogInNow></RedirectContainer>
                  <Alert type={alert.type}
                        message={alert.message}
                        stateAlert={stateAlert}
                        changeStateAlert={changeStateAlert}
                  />
            </RegistrationContainer> 
           
      );
}
 
export default SignUp;