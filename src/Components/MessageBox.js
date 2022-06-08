import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, ButtonDisabled, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_avatar.png'

const MessageContainer = styled.div`
  width:100%;
  /* height:500px; */
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

const MessageBox = ({user, currentUserInfo, addToTimeline, message, handleChange}) => {
      return ( 
      <MessageContainer>
            <CreateMessageForm onSubmit={addToTimeline}>
                  <HeaderUser>
                        <PortraitContainer>
                        {user.photoURL ?
                              <img alt="user portrait" src={user.photoURL}/>
                              :
                              <img alt="user portrait" src={ProfileImage}/>
                        }
                        </PortraitContainer>
                        <UserNames>
                              <NameContainer>{currentUserInfo[0].name}</NameContainer>
                              <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
                        </UserNames>
                  </HeaderUser>
                  <MessageUser 
                        name="message"
                        id="message"
                        cols="50"
                        rows="3"
                        maxlength="5"
                        type="text"
                        placeholder="Leave us your message here"
                        value={message}
                        onChange={handleChange}/>
                  {message === "" ?
                  <ButtonDisabled disabled={true}>
                        <p>Submit</p>
                  </ButtonDisabled>
                  :
                  <Button disabled={!message} type="submit" name="sendMesssage">
                        <p>Submit</p>
                  </Button>
                  }
                  
            </CreateMessageForm>
      </MessageContainer>     
       );
}
 
export default MessageBox;