import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_img.png'
import Alert from '../Elements/Alert';
import AddMessage from '../firebase/AddMessage';
import { useAuth } from '../Context/AuthContext';

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

const Account = ({ message, messageChange, alert, changeAlert, stateAlert, changeStateAlert}) => {
  const {user} =useAuth();
  console.log(user.uid);

  const handleChange = (e) =>{
        if(e.target.name==="message"){
          messageChange(e.target.value)
        }
    
  };

  const addToTimeline = (e) =>{
    e.preventDefault();
    console.log(user.uid);
    AddMessage({
      message:message,
      uidUser: user.uid
    })
    .then(()=>{
      messageChange("");

      changeStateAlert(true);
      changeAlert({
            type:'success',
            message: 'Your message was sent successfully'
      })
    .catch ((error)=>{
      changeStateAlert(true);
      changeAlert({
            type:'error',
            message: 'An error ocurred while sending your message'
      })
    })
    })
  };

      return ( 
      <AccountManagement>
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
        </CreateMessageForm>
        <Alert type={alert.type}
                        message={alert.message}
                        stateAlert={stateAlert}
                        changeStateAlert={changeStateAlert}
        />
      </AccountManagement>
      );
}
 
export default Account;
