import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {useNavigate } from 'react-router-dom';
import {PortraitContainer, AliasContainer} from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import '../index.css'
import {CardInner, CardColumns, MessageLink, UserNameContainer, UserNameContainerLink,  MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, BarButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { collection, limit, query, where, onSnapshot} from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import AddRemove from '../firebase/AddRemove';


const RetweetButton=styled.button`
  background:none;
  border-radius:50%;
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`
const Container=styled.div`
z-index:100;
`


const MessageTimelineContainer = ({ id, user, currentUserInfo, messageUidUser,messageDate, messageMessage,messageComments, messageRetweets,messageLikes,messageOriginalId, changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert, update, changeUpdate}) => {
    const [loadingMessageData, changeLoadingMessageData] =useState(true);
    const [messageForTimeline, changeMessageForTimeline] = useState([{}])
    const navigate = useNavigate();

    useEffect(()=>{
      const obtainMessageTimeline = async() =>{
      console.log("loading message")
        const consult = query(
          collection(db, 'userInfo'),
          where('uidUser', "==", messageUidUser),
          limit(10)
        );
        
        onSnapshot(consult, (snapshot)=>{
          changeMessageForTimeline(snapshot.docs.map((originalUser)=>{
            return {...originalUser.data(), id:originalUser.id}
          }))
        })
        console.log("message loaded")
        changeLoadingMessageData(false)
      }
      
    obtainMessageTimeline();

    /* By not calling changeLoadingMessageData in useEffect it keeps loading each time we update*/
    },[update, currentUserInfo, messageUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
  <>
    {!loadingMessageData ?
      <CardInner>
        <MessageLink onClick={()=> navigate(`/user/${messageForTimeline[0].alias}/status/${id}`)}>
          <CardColumns>
            <PortraitContainer>
              {messageForTimeline[0].photoURL ?
                <img alt="userportrait" src={messageForTimeline[0].photoURL}/>
                :
                <img alt="userportrait" src={ProfileImage}/>
              }
            </PortraitContainer>
          </CardColumns>
          <CardColumns rightColumn>
            <UserNameContainer>
              <UserNameContainerLink 
                onClick={(e)=>{
                e.stopPropagation();}}
                to={`/user/${messageForTimeline[0].alias}`}>
                {messageForTimeline[0].name}
              </UserNameContainerLink >
              <AliasContainer>
                @{messageForTimeline[0].alias}
              </AliasContainer>
              <Container >
              <ShowMoreMenu 
                changeAlert={changeAlert}
                changeStateAlert={changeStateAlert}
                messageUidUser={messageUidUser} 
                currentUserInfo={currentUserInfo}
                id={id} />
              </Container>
            </UserNameContainer>
            <MessageContent>
              <span onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >
              {messageMessage}
              </span>
            </MessageContent>
          {/*  <TimeBar>
              {formatDate(messageDate)}
            </TimeBar> */}
            <InteractionBar>
              <IconContainerCont Reply>
                <BarButton onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    receiveNotification({
                    notification:"comment",
                    messageMessage,
                    messageForTimeline:messageForTimeline,
                    id:id,
                    comments:messageComments,
                    retweets:messageRetweets,
                    originalUidUser:messageUidUser,
                    user,
                    currentUserInfo,
                    changeShowPopUp:changeShowPopUp, 
                    changePopUpAlert:changePopUpAlert,
                    update,
                    changeUpdate})}}>
                  <IconComment/>
                </BarButton>
                <CounterContainer>
                  <p>{messageComments?
                  messageComments.length
                  :""}</p>
                </CounterContainer>
              </IconContainerCont>
              <IconContainerCont Retweet>
              {!messageRetweets.includes(currentUserInfo[0].uidUser)?
                <RetweetButton onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  receiveNotification({
                  notification:"retweet",
                  id:id,
                  retweets:messageRetweets,
                  originalUidUser:messageUidUser,
                  user,
                  currentUserInfo,
                  changeShowPopUp:changeShowPopUp, 
                  changePopUpAlert:changePopUpAlert,
                  update,
                  changeUpdate})}}>
                  <IconRetweet/>
                </RetweetButton>
              :
              <>
                {messageUidUser === currentUserInfo[0].uidUser ?
                <RetweetButton onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  RemoveRetweetSameUser({
                  currentUidUser:currentUserInfo[0].uidUser,
                  originalRetweets:messageRetweets, 
                  currentMessageId:id, 
                  update,
                  changeUpdate})}}>
                  <IconRetweetColor/>
                </RetweetButton>
                :
                <RetweetButton onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  RemoveRetweet({
                  currentUidUser:currentUserInfo[0].uidUser,
                  originalRetweets:messageRetweets, 
                  originalId:messageOriginalId, 
                  currentMessageId:id, 
                  retweetUidUser:messageUidUser, 
                  update,
                  changeUpdate})}}>
                  <IconRetweetColor/>
                </RetweetButton>
                }
              </>
              }
                <CounterContainer>
                  <p>{messageRetweets.length}</p>
                </CounterContainer>
              </IconContainerCont>
              <IconContainerCont Like>
                  <LikeButton  onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  AddRemove({
                  messageLikes,
                  currentUserInfo, 
                  id:id,
                  messageUidUser, 
                  uidUser:currentUserInfo[0].uidUser,
                  originalUidUser:messageUidUser,
                  likes:messageLikes,
                  originalLikes:messageLikes,
                  originalMessageId:id,
                  currentUidUser:currentUserInfo[0].uidUser,
                  likeUidUser:messageUidUser,
                  newId:id,
                  update,
                  changeUpdate})}}> 
                  {!messageLikes.includes(currentUserInfo[0].uidUser)?
                    <IconLike />
                    :
                    <IconLikeColor />
                  }                              
                  </LikeButton>
                <CounterContainer>
                  <p>{messageLikes.length}</p>
                </CounterContainer>
              </IconContainerCont>
            </InteractionBar>
          </CardColumns>
        </MessageLink>
      </CardInner>
    :
    <LoadingComponent/>
    }
  </>
    )
}
 
export default MessageTimelineContainer;