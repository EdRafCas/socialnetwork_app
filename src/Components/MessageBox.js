import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, ButtonDisabled,CounterLeft, PortraitContainer, NameContainer, AliasContainer, CounterExcess} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_avatar.png'
import '../index.css'


const MessageContainer = styled.div`
      max-width:700px;
      /* height:500px; */
      padding:0.5rem 1rem;
      display:flex;
      flex-direction:column;
      align-content:center;
      border-bottom:solid ${theme.BorderColor} 1px;
      border-right:solid ${theme.BorderColor} 1px;
      background:#000;
      @media(max-width: 760px){ 
      padding: 0.25rem;
      }
      
`
const CreateMessageForm =styled.form`
      display:flex;
      flex-direction:column;
      gap:0.5rem;
      @media(max-width: 760px){ 
      gap:0.25rem;
      }
`
const HeaderUser =styled.div`
      width:100%;
      display:flex;
      flex-direction:row;
      gap:1rem;
`
const MessageUser =styled.textarea`
      padding:0rem;
      font-size:1rem;
      text-align:left;
      white-space:pre-wrap;
      overflow:scroll;
      width:100%;
      background:#000;
      color: #fff;
      border:solid ${theme.BorderColor} 0px;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      outline:none;
      @media(max-width: 760px){ 
      padding:0.5rem;
      font-size:0.9rem;
      }
`
const UserNames =styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
      gap:5px;
`
const ButtonContainer=styled.div`
      gap:5px;
      display:flex;
      flex-direction:row;
`

    

const MessageBox = ({messageFloating, floating, user, currentUserInfo, addToTimeline, message, handleChange}) => {

      const LettersLeft = 20;

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
                  {floating ? 
                  <>
                  <MessageUser className='timeline-user'
                        name="messageFloating"
                        id="messageFloating"
                        cols="50"
                        rows="3"
                        maxlength="5"
                        type="text"
                        placeholder="Leave us your message here"
                        value={messageFloating}
                        onChange={handleChange}/>
                   <ButtonContainer>
                        {messageFloating === "" || messageFloating.length >160 ?
                        <>
                        <ButtonDisabled disabled={true}>
                              <p>Submit</p>
                        </ButtonDisabled> 
                        {messageFloating.length >= 160 ?
                        <CounterExcess>
                              <p>-{messageFloating.length -160}</p>
                        </CounterExcess>
                        :""}
                        </>
                        :
                        <>
                        <Button disabled={!messageFloating} type="submit" name="sendMesssage">
                              <p>Submit</p>
                        </Button>
                        {message.length >=140 ?
                        <CounterLeft>
                              <p>{ LettersLeft +140 - message.length }</p>
                        </CounterLeft>
                        :""}
                        </>
                        }
                  </ButtonContainer>
                  </>
                  :
                  <>
                  <MessageUser className='timeline-user'
                        name="message"
                        id="message"
                        cols="50"
                        rows="3"
                        maxlength="5"
                        type="text"
                        placeholder="Leave us your message here"
                        value={message}
                        onChange={handleChange}/>
                   <ButtonContainer>
                        {message === "" || message.length >160 ?
                        <>
                        <ButtonDisabled disabled={true}>
                              <p>Submit</p>
                        </ButtonDisabled> 
                        {message.length >= 160 ?
                        <CounterExcess>
                              <p>-{message.length -160}</p>
                        </CounterExcess>
                        :""}
                        </>
                        :
                        <>
                        <Button disabled={!message} type="submit" name="sendMesssage">
                              <p>Submit</p>
                        </Button>
                        {message.length >=140 ?
                        <CounterLeft>
                              <p>{ LettersLeft +140 - message.length }</p>
                        </CounterLeft>
                        :""}
                        </>
                        }
                  </ButtonContainer>
                  </>
                  }
            </CreateMessageForm>
      </MessageContainer>     
       );
}
 
export default MessageBox;