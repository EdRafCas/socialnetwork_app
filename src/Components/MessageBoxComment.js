import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, ButtonDisabled, PortraitContainer, NameContainer, AliasContainer, CounterLeft, CounterExcess, CenterBoxComment, CloseWindowSmall} from '../Elements/ElementsFormulary'
import '../index.css'
import ProfileImage from '../img/profile_avatar.png'
import AddComment from '../firebase/AddComment'
import getUnixTime from 'date-fns/getUnixTime';

const MessageContainer = styled.div`
      display:flex;
      flex-direction:row;
`
const CreateMessageForm =styled.form`
      display:flex;
      flex-direction:row;
      gap:1rem;
      /* border:solid white 1px; */
      padding-top:3px;
`
const MessageUser =styled.textarea`
      padding:00rem;
      font-size:1rem;
      text-align:justify;
      white-space:normal;
      overflow:scroll;
      width:100%;
      background-color:#000;
      color: #fff;
      border:solid ${theme.BorderColor} 0px;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      outline:none;   
      @media(max-width: 760px){ 
            font-size:0.9rem;
            color: ${theme.Text};

      }
      @media(max-width: 550px){ 
            font-size:0.8rem;
            color: ${theme.Text};

      }
   
`
const ButtonContainer=styled.div`
      padding-top:1rem;
      gap:5px;
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
`    
const OriginalMessageContainer=styled.div`
      display:flex;
      flex-direction:row;
      gap:1rem;
      /* border:solid ${theme.RedAlert} 1px; */
      @media(max-width: 760px){ 
            gap:0.5rem;

      }
      
`
const LeftColumn=styled.div`
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      min-height:9rem;
      /* border:solid ${theme.BluePinned} 1px; */
      gap:3px;
`
const RightColumn=styled.div`
      display:flex;
      flex-direction:column;
      width:100%;
      padding-top:${(props)=> props.reply ? "1rem"
                                          : "0rem"};
      min-height:9rem;
      gap:10px;
      /* border:solid ${theme.BorderColor} 1px; */
`
const UserNames =styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
      gap:5px;
      /* border:solid ${theme.BorderColor} 1px; */
`
const MessageContent = styled.div`
      width:100%;
      padding:0rem;
      max-height:200px;
      min-height:100px;
      font-weight:400;
      color:white;
      /* border:solid ${theme.BorderColor} 1px; */
      text-align:justify;
      white-space:normal;
      overflow:hidden;
      p{
            font-size:1rem;
            color:${theme.Text};
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            white-space:pre-wrap;}
      @media(max-width: 760px){ 
            p{font-size:0.9rem;}

      }
      @media(max-width: 550px){ 
            p{font-size:0.8rem;}

      }
`
const StraightLine=styled.div`
      height:90%;
      width:2px;
      border:solid ${theme.BorderColor} 1px;
`
const ReplyingTo =styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
      gap:5px;
      padding:0.25rem 0rem 0.25rem 0rem;
      /* border:solid ${theme.BorderColor} 1px */;
      @media(max-width: 760px){ 
      p{
            color:${theme.Text};
            font-size:0.9rem;
      }
      }
      @media(max-width: 550px){ 
      p{
            color:${theme.Text};
            font-size:0.8rem;
      }
      }
      
`


const MessageBoxComment = ({id, originalUidUser, messageForTimeline,messageMessage,  user, currentUserInfo, addToTimeline, message,comments, changeStateAlert, changeAlert, changeShowPopUp}) => {

      const [messageReply, changeMessageReply] =useState("")
      const LettersLeft = 20;

      const handleChange = (e) =>{
            if(e.target.name==="messageReply"){
                  changeMessageReply(e.target.value)
            }
      };

      const AddCommentToTimeline = (e) =>{
      e.preventDefault();
      console.log(messageReply)
      changeShowPopUp(false)

      if(messageReply !==""){
            AddComment({
                  id:id,
                  message:messageReply,
                  originalUidUser:originalUidUser,
                  uidUser: currentUserInfo[0].uidUser,
                  name:currentUserInfo[0].name,
                  alias:currentUserInfo[0].alias,
                  date: getUnixTime(new Date()),
                  comments:comments
           })
           .then(()=>{
                  changeMessageReply("");
                  changeStateAlert(true);
                  changeAlert({
                        type:'success',
                        message: 'Your message was sent successfully'
                  })
                  changeShowPopUp(false)
           })
           .catch((error)=>{
                  changeStateAlert(true);
                  changeAlert({
                        type:'error',
                        message: 'An error ocurred while sending your message'
                  })
           }) 
           }
      
    };
      

      return ( 
      <CenterBoxComment>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
            <OriginalMessageContainer>
                  <LeftColumn>
                        <PortraitContainer>
                        {messageForTimeline[0].photoURL ?
                              <img alt="userportrait" src={messageForTimeline[0].photoURL}/>
                              :
                              <img alt="userportrait" src={ProfileImage}/>
                        }
                        </PortraitContainer>
                        <StraightLine/>
                  </LeftColumn>
                  <RightColumn>
                        <UserNames>
                              <NameContainer>{messageForTimeline[0].name}</NameContainer>
                              <AliasContainer>@{messageForTimeline[0].alias}</AliasContainer>
                        </UserNames>
                        <MessageContent>
                              <p>{messageMessage}</p>
                        </MessageContent>
                        <ReplyingTo>
                              <p>Replying to @{messageForTimeline[0].alias}</p>
                        </ReplyingTo>
                  </RightColumn>  
            </OriginalMessageContainer>
            <MessageContainer>
                  <CreateMessageForm onSubmit={AddCommentToTimeline}>
                        <LeftColumn>
                              <PortraitContainer>
                              {user.photoURL ?
                                    <img alt="user portrait" src={user.photoURL}/>
                                    :
                                    <img alt="user portrait" src={ProfileImage}/>
                              }
                              </PortraitContainer>
                        </LeftColumn>
                        <RightColumn reply>
                        <MessageUser className='timeline-user'
                              name="messageReply"
                              id="messageReply"
                              cols="65"
                              rows="5"
                              maxlength="5"
                              type="text"
                              placeholder="Send your Reply"
                              value={messageReply}
                              onChange={handleChange}/>
                        <ButtonContainer>
                              {messageReply === "" || messageReply.length >160 ?
                              <>
                              {messageReply.length >= 160 ?
                              <CounterExcess>
                                    <p>-{messageReply.length -160}</p>
                              </CounterExcess>
                              :""}
                              <ButtonDisabled disabled={true}>
                                    <p>Reply</p>
                              </ButtonDisabled> 
                              </>
                              :
                              <>
                              {messageReply.length >=140 ?
                              <CounterLeft>
                                    <p>{ LettersLeft +140 - messageReply.length }</p>
                              </CounterLeft>
                              :""}
                              <Button disabled={!messageReply} type="submit" name="sendMesssage">
                                    <p>Reply</p>
                              </Button>
                              </>
                              }
                        </ButtonContainer>

                        </RightColumn>
                  </CreateMessageForm>
            </MessageContainer>     
      </CenterBoxComment>
       );
}
 
export default MessageBoxComment;