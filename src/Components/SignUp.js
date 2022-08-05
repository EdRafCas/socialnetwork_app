import React,{useState} from 'react';
import styled from 'styled-components';
import {Link}from 'react-router-dom';
import {Formulary, FormularyInput}  from '../Elements/ElementsFormulary';
import theme from '../Theme.js';
import DatePicker from './DatePicker';
import {ButtonContainer} from '../Elements/ElementsFormulary';
import {auth} from './../firebase/FirebaseConfig';
import {createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import Alert from './../Elements/Alert';
import AddUser from '.././firebase/AddUser';
import { db, } from ".././firebase/FirebaseConfig";
import { collection, query, where, getDocs,} from "firebase/firestore";



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
      
      const [name, changeName] =useState("")
      const [lastname, changeLastname] =useState("")
      const [alias, changeAlias] =useState("")
      const [email, changeEmail] =useState("")
      const [password, changePassword] =useState("")
      const [password2, changePassword2] =useState("")
      const [birthMonth, changeBirthMonth] =useState("");
      const [birthDay, changeBirthDay] =useState("");
      const [birthYear, changeBirthYear] =useState("");

      const handleChange = (e) =>{
            switch(e.target.name){
                  case 'name':
                        changeName(e.target.value);
                        break;
                  case 'lastname':
                        changeLastname(e.target.value);
                        break;
                  case 'alias':
                        changeAlias(e.target.value);
                        break;
                  case 'email':
                        changeEmail(e.target.value);
                        break;
                  case 'password':
                        changePassword(e.target.value);
                        break;
                  case 'password2':
                        changePassword2(e.target.value);
                        break;
                  default:
                        break;
            }
      }

     /*  const logOut = async() =>{
            try{
                  await signOut(auth);
                  navigate("/LoginPage")
            } catch(error){
                  console.log(error);
            }
            
      } */

      const handleSubmit = async (e) => {
            e.preventDefault();
            changeStateAlert(false);
            changeAlert({});

            const consult = query(
                  collection(db, 'userInfo'),
                  where('alias', "==", alias)
                  /* limit(30) */
            );
            const querySnapshot = await getDocs(consult);

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
            if (!regularExpressionNames.test(name)){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please provide a valide name'
                  })
                  return;
            }
            if (!regularExpressionNames.test(lastname)){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Please provide a valide lastname'
                  })
                  return;
            }
            if(email === "" || password === "" || password2 === "" || name === "" || lastname === "" || alias === ""){
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
            if(password !== password2){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'Both passwords must be the same'
                  })
                  return;
            }
            if(querySnapshot.docs.length > 0 ){
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'This alias already exists'
                  })
                  return;
            }
            try {
                  await createUserWithEmailAndPassword(auth, email, password)
                  console.log("user created");
                        try{
                              await signInWithEmailAndPassword(auth, email, password)
                              console.log("logged in")
                              onAuthStateChanged(auth, (user)=>{
                                    if (user){
                                          const uid = user.uid;
                                          /* console.log(uid); */
                                          AddUser({name:name,
                                                lastname:lastname,
                                                alias:alias,
                                                email:email,
                                                birthMonth:birthMonth,
                                                birthDay:birthDay,
                                                birthYear:birthYear,
                                                uidUser:uid,
                                                photoURL:{},
                                                pinnedMessage:{},
                                                bookmarks:[]})
                                          .then(()=>{
                                                changeStateAlert(true);
                                                changeAlert({
                                                      type:'success',
                                                      message: 'Account Was created successfully'
                                                });
                                                /* logOut();
                                                console.log("user logged out") */
                                          })
                                          .catch((error)=>{
                                                console.log(error);
                                          }) 
                                    } else {
                                          console.log("not logged yet")
                                    };
                              });
                        } catch(error){
                              console.log(error);
                              changeStateAlert(true);
                              changeAlert({
                                    type:'error',
                                    message: 'An error ocurred while creating user'});
                        }           
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
                                          value={name}
                                          placeholder="Name"
                                          onChange={handleChange}
                                    />
                                    {name ==="" ?
                                          <SpanInputInitial>Name</SpanInputInitial> :
                                          <SpanInputFinal>Name</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="lastname"
                                          value={lastname}
                                          placeholder="Lastname"
                                          onChange={handleChange}
                                    />
                                    {lastname ==="" ?
                                          <SpanInputInitial> Lastname</SpanInputInitial> :
                                          <SpanInputFinal>Lastname</SpanInputFinal>
                                    }
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="alias"
                                          value={alias}
                                          placeholder="Alias"
                                          place="Alias"
                                          onChange={handleChange}
                                    />
                                    {alias ==="" ?
                                          <SpanInputInitial> Alias</SpanInputInitial> :
                                          <SpanInputFinal>Alias</SpanInputFinal>
                                    }   
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="email"
                                          name="email"
                                          value={email}
                                          placeholder="Email"
                                          onChange={handleChange}
                                    />
                                    {email ==="" ?
                                          <SpanInputInitial>Email</SpanInputInitial> :
                                          <SpanInputFinal>Email</SpanInputFinal>
                                    }
                              </RegistrationInputContainer>
                              <RegistrationInputContainer >
                                    <FormularyInput Registration
                                          type="password"
                                          name="password"
                                          value={password}
                                          placeholder="Password"
                                          onChange={handleChange}
                                    />
                                    {password ==="" ?
                                          <SpanInputInitial>Password</SpanInputInitial> :
                                          <SpanInputFinal>Password</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              <RegistrationInputContainer >
                                    <FormularyInput Registration
                                          type="password"
                                          name="password2"
                                          value={password2}
                                          placeholder=" Confirm Password"
                                          onChange={handleChange}
                                    />
                                    {password ==="" ?
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