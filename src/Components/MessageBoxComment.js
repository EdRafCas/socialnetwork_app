import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, ButtonDisabled, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_avatar.png'

const CenterBox=styled.div`
  position:absolute;
  top:5%;
  left:40%;
  /* margin-top:-30rem;
  margin-left:-30rem;
  height:60rem;
  width:60rem;*/
  background:black; 
  border-radius:5%;
  z-index:101;
`
const MessageContainer = styled.div`
  width:100%;
  min-width: 700px;
  height:500px;
  border-radius:9999px;
  padding:1rem 1rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:1rem;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  background:#000;
`
const CreateMessageForm =styled.form`
  display:flex;
  flex-direction:column;
  gap:1rem;
`
const HeaderUser =styled.div`
  display:flex;
  flex-direction:row;
   border:solid ${theme.BorderColor} 1px;
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

const ButtonContainer=styled.div`
      gap:5px;
      display:flex;
      flex-direction:row;
`
const ButtonLeft =styled.button`
      display:flex;
      height:3rem;
      width:3rem;
      border-radius:9999px;
      padding:0rem;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:${theme.GradientBackround};
      p{
            font-size:1rem;
            font-weight:1000;
            color:#fff;
      }
      `
const ButtonExcess =styled.button`
      display:flex;
      height:3rem;
      width:3rem;
      border-radius:9999px;
      padding:0rem;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:${theme.GradientBackround};
            p{
                  font-size:1rem;
                  font-weight:1000;
                  color:${theme.RedAlert};
            }
`     

const OriginalMessageContainer=styled.div`
      display:flex;
      flex-direction:row;
      gap:1rem;
`

const LeftColumn=styled.div`
      display:flex;
      flex-direction:row;
      min-height:9re;
      gap:1rem;

`
const RightColumn=styled.div`
      display:flex;
      flex-direction:column;
      min-height:9re;
      gap:10px;
      /* border:solid ${theme.BorderColor} 1px; */
`

const UserNames =styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
      gap:5px;
      border:solid ${theme.BorderColor} 1px;
`
const MessageContent = styled.div`
      width:100%;
      padding:0rem;
      max-height:200px;
      max-width:500px;
      min-height:50px;
      font-size:1rem;
      font-weight:400;
      color:white;
      border:solid ${theme.BorderColor} 1px;
      text-align:justify;
      white-space:normal;
      overflow:hidden;
      p{
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;}
`


const MessageBoxComment = ({id, originalUidUser, messageForTimeline,messageMessage,  user, currentUserInfo, addToTimeline, message, handleChange}) => {

      const LettersLeft = 20;

      return ( 
      <CenterBox>
            <OriginalMessageContainer>
                  <LeftColumn>
                        <PortraitContainer>
                        {messageForTimeline[0].photoURL ?
                              <img alt="userportrait" src={messageForTimeline[0].photoURL}/>
                              :
                              <img alt="userportrait" src={ProfileImage}/>
                        }
                        </PortraitContainer>
                  </LeftColumn>
                  <RightColumn>
                        <UserNames>
                              <NameContainer>{messageForTimeline[0].name}</NameContainer>
                              <AliasContainer>@{messageForTimeline[0].alias}</AliasContainer>
                        </UserNames>
                        <MessageContent>
                              <p>

                              {messageMessage}
                              </p>
                        </MessageContent>

                  </RightColumn>
                  
            </OriginalMessageContainer>
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
                        <ButtonContainer>
                              {message === "" || message.length >160 ?
                              <>
                              <ButtonDisabled disabled={true}>
                                    <p>Submit</p>
                              </ButtonDisabled> 
                              {message.length >= 160 ?
                              <ButtonExcess>
                                    <p>-{message.length -160}</p>
                              </ButtonExcess>
                              :""}
                              </>
                              :
                              <>
                              <Button disabled={!message} type="submit" name="sendMesssage">
                                    <p>Submit</p>
                              </Button>
                              {message.length >=140 ?
                              <ButtonLeft>
                                    <p>{ LettersLeft +140 - message.length }</p>
                              </ButtonLeft>
                              :""}
                              </>
                              }
                        </ButtonContainer>
                  
                        
                  </CreateMessageForm>
            </MessageContainer>     
      </CenterBox>
       );
}
 
export default MessageBoxComment;