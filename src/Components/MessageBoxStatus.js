import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, ButtonDisabled, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import '../index.css'
import ProfileImage from '../img/profile_avatar.png'
import AddComment from '../firebase/AddComment'
import getUnixTime from 'date-fns/getUnixTime';
import {UserNameContainerLinkQuoted,} from '../Elements/ElementsTimeline'

const CenterBox=styled.div`
      width:700px;
      padding:1rem 1.5rem;
      position:absolute;
      top:5%;
      left:33%;
      /* margin-top:-30rem;
      margin-left:-30rem;
      height:60rem;
      width:60rem;*/
      background:black; 
      border-radius:5%;
      z-index:101;
`
const MessageContainer = styled.div`
      display:flex;
      flex-direction:column;
      /* border:solid ${theme.RedAlert} 1px; */
      /* padding:1rem 1rem; */
      /* border-bottom:solid ${theme.BorderColor} 1px; */
     /*  width:100%;
      height:500px;
      border-radius:9999px;
      display:flex;
      flex-direction:column;
      align-content:center;
      background:#000; */
`
const CreateMessageForm =styled.form`
      /* display:flex;
      flex-direction:row;
      width:100%;
      gap:1rem;
      border:solid white 1px;*/
      padding-top:1rem; 
      display:grid;
      width:100%;
      grid-template-columns: repeat(1, 1fr 12fr);
      /* border:solid ${theme.BorderColor} 1px; */
      gap:0rem;
      padding-top:${(props) => props.originalComment ? "0rem": "0"};
      /* background:black; */
      text-decoration:none;
`
const TopBar =styled.form`
      /* display:flex;
      flex-direction:row;
      width:100%;
      gap:1rem;
      border:solid white 1px;*/

      display:grid;
      width:100%;
      grid-template-columns: repeat(1, 1fr 12fr);
      /* border:solid ${theme.BorderColor} 1px; */
      gap:0rem;
      padding-top:1rem; 
      /* background:black; */
      text-decoration:none;
`
const HeaderUser =styled.div`
      display:flex;
      flex-direction:row;
      border:solid ${theme.BorderColor} 1px;
      gap:1rem;
`
const MessageUser =styled.textarea`
      padding:0.5rem;

      font-size:1.5rem;
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
`
const ButtonContainer=styled.div`
      width:100%;
      height:3rem;
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
`
const Buttons=styled.div`
      /* border:solid ${theme.BorderColor} 1px; */
      padding-top:0rem;
      gap:5px;
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
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
      /* border:solid ${theme.RedAlert} 1px; */
`
const LeftColumn=styled.div`
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      min-height:9rem;
      border:solid ${theme.BluePinned} 1px;
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
      border:solid ${theme.BorderColor} 1px;
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
      font-size:1rem;
      font-weight:400;
      color:white;
      /* border:solid ${theme.BorderColor} 1px; */
      text-align:justify;
      white-space:normal;
      overflow:hidden;
      p{
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            white-space:pre-wrap;}
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
      padding:0.5rem 0rem 0rem 0rem;
      /* border:solid ${theme.BorderColor} 1px; */
`

const CardColumns = styled.div`
      position:relative;
      padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
      padding-top:0;              
      /* padding-right: ${(props) => props.rightColumn && "0.5rem"}; */
      padding-bottom: 0;
      margin:0;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:center;
      /* border:solid ${theme.BorderColor} 1px; */
      /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
      gap:0;
`
const EmptyDivColumn=styled.div`
      height:1.2rem;
      width:100%;
      /* border:solid ${theme.BorderColor} 1px; */
`
const CardInner =styled.div`
      display:flex;
      flex-direction:column;
      border:none;
      /* border-top:solid ${theme.BorderColor} 1px; */
      /* border-bottom:solid ${theme.BorderColor} 1px; */
      gap:0rem;
      padding-top:0rem;
      z-index:100;
      /*  :hover{
      pointer-events: auto;
      background:rgba(255,255,255, 0.03);
      } */
`
const UserNameContainerQuoted =styled.div`
  width:100%;
  height:1.2rem;
  padding:0rem;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  position:relative;
  p{
    color:${theme.Text};
  }
`


const MessageBoxStatus = ({id, originalUidUser, messageForTimeline,messageMessage,  user, currentUserInfo, previousCommentAlias, addToTimeline, message,comments, changeStateAlert, changeAlert, changeShowPopUp}) => {

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
            <MessageContainer>
                  <TopBar>
                        <EmptyDivColumn/>
                        <UserNameContainerQuoted>
                                    <p>Replying to</p>
                                    <UserNameContainerLinkQuoted to={`/user/${previousCommentAlias}`}>
                                          @{previousCommentAlias}
                                    </UserNameContainerLinkQuoted >
                              </UserNameContainerQuoted>
                  </TopBar>
                  <CreateMessageForm onSubmit={AddCommentToTimeline}>
                        <CardColumns originalComment>
                              <PortraitContainer>
                              {user.photoURL ?
                                    <img alt="user portrait" src={user.photoURL}/>
                                    :
                                    <img alt="user portrait" src={ProfileImage}/>
                              }
                              </PortraitContainer>
                        </CardColumns>
                        <CardColumns reply rightColumn>
                              
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
                                    <Buttons>
                                          {messageReply === "" || messageReply.length >160 ?
                                          <>
                                          <ButtonDisabled disabled={true}>
                                                <p>Reply</p>
                                          </ButtonDisabled> 
                                          {messageReply.length >= 160 ?
                                          <ButtonExcess>
                                                <p>-{messageReply.length -160}</p>
                                          </ButtonExcess>
                                          :""}
                                          </>
                                          :
                                          <>
                                          <Button disabled={!messageReply} type="submit" name="sendMesssage">
                                                <p>Reply</p>
                                          </Button>
                                          {messageReply.length >=140 ?
                                          <ButtonLeft>
                                                <p>{ LettersLeft +140 - messageReply.length }</p>
                                          </ButtonLeft>
                                          :""}
                                          </>
                                          }
                                    </Buttons>     
                              </ButtonContainer>
                        </CardColumns>
                  </CreateMessageForm>
            </MessageContainer>     
       );
}
 
export default MessageBoxStatus;