import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import '../index.css'
import {UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';

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

const MessageTimelineContainer = ({ id, user, currentUserInfo, messageUidUser, changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert}) => {
    const [loadingMessageData, changeLoadingMessageData] =useState(true);
    const [messageForRetweet, changeMessageForRetweet] = useState('')

    useEffect(()=>{
      const obtainMessage = async() =>{
            
            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", messageUidUser),
              limit(10)
            );

            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeMessageForRetweet(document) 
             /* if(document.exists){
                  console.log("id existe")
             }else{
                  console.log("id no existe")
             } */
             
          changeLoadingMessageData(false)
      }
      obtainMessage();

      /* By not calling changeLoadingMessageData in useEffect it keeps loading each time we update*/
      },)
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
  <>
  {!loadingMessageData &&
    <UserColumns>
      <CardColumns>
        <PortraitContainer>
          {Message.photoURL ?
          <img alt="user-portrait" src={Message.photoURL}/>
          :
          <img alt="user-portrait" src={ProfileImage}/>
          }
          
        </PortraitContainer>
      </CardColumns>
      <CardColumns rightColumn>
        <UserNameContainer>
          <NameContainer>{Message.name}</NameContainer>
          <AliasContainer>@{Message.alias}</AliasContainer>
          <ShowMoreMenu 
                        changeAlert={changeAlert}
                        changeStateAlert={changeStateAlert}
                        messageUidUser={Message.uidUser} 
                        currentUserInfo={currentUserInfo}
                        id={Message.id} />
        </UserNameContainer>
        <MessageContent>
          {Message.message}
        </MessageContent>
        <TimeBar>
          {formatDate(Message.date)}
        </TimeBar>
        <InteractionBar>
          <IconContainer Reply onClick={()=>receiveNotification({
            notification:"delete",
            changeShowPopUp:changeShowPopUp, 
            changePopUpAlert:changePopUpAlert})}>
            <IconComment/>
          </IconContainer>
          <IconContainerCont Retweet>
          {
            !Message.retweets.includes(currentUserInfo[0].uidUser)?
            <RetweetButton onClick={()=>receiveNotification({
              notification:"retweet",
              id:Message.id,
              retweets:Message.retweets,
              originalUidUser:Message.uidUser,
              user,
              currentUserInfo,
              changeShowPopUp:changeShowPopUp, 
              changePopUpAlert:changePopUpAlert})}>
              <IconRetweet/>
            </RetweetButton>
          :
          <>
            {
            Message.uidUser === currentUserInfo[0].uidUser ?
            <RetweetButton onClick={()=>RemoveRetweetSameUser({
              currentUidUser:currentUserInfo[0].uidUser,
              originalRetweets:Message.retweets, 
              currentMessageId:Message.id})}>
              <IconRetweetColor/>
            </RetweetButton>
            :
            <RetweetButton onClick={()=>RemoveRetweet({
              currentUidUser:currentUserInfo[0].uidUser,
              originalRetweets:Message.retweets, 
              originalId:Message.originalId, 
              currentMessageId:Message.id, 
              retweetUidUser:Message.uidUser})}>
              <IconRetweetColor/>
            </RetweetButton>
            }
          </>
          }
            <CounterContainer>
              {Message.retweets.length}
            </CounterContainer>
          </IconContainerCont>
          <IconContainerCont Like>
            {!Message.likes.includes(currentUserInfo[0].uidUser)?
              <LikeButton  onClick={()=>AddLike({
              id:Message.id,
              uidUser:currentUserInfo[0].uidUser,
              likes:Message.likes})}> 
                <IconLike />                               
              </LikeButton>
              :
              <LikeButton  onClick={()=>RemoveLike({
              id:Message.id,
              uidUser:currentUserInfo[0].uidUser,
              likes:Message.likes})}> 
                <IconLikeColor />                               
              </LikeButton>
            }
            <CounterContainer>
              <p>{Message.likes.length}</p>
            </CounterContainer>
          </IconContainerCont>
        </InteractionBar>
      </CardColumns>
    </UserColumns> 
  }
  </>
    )
}
 
export default MessageTimelineContainer;