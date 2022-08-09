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
import { collection, limit, query, where, onSnapshot, doc, getDoc} from "firebase/firestore";
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

const BookmarkTimelineContainer = ({ id, user, currentUserInfo, messageUidUser,messageDate, messageMessage, messageRetweets,messageLikes,messageOriginalId, changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert}) => {
    const [loadingMessageData, changeLoadingMessageData] =useState(true);
    const [messageForBookMark, changeMessageForBookMark] = useState('')
    const [userInfoForBookmark, changeUserInfoForBookmark] =useState(currentUserInfo)

    useEffect(()=>{
      const obtainBookmarkTimeline = async() =>{
        const document = await getDoc(doc(db, 'userTimeline', id));
        changeMessageForBookMark(document)

        const consult = query(
          collection(db, 'userInfo'),
          where('uidUser', "==", messageForBookMark.data().uidUser),
          limit(10)
        );
        
        onSnapshot(consult, (snapshot)=>{
          changeUserInfoForBookmark(snapshot.docs.map((originalUser)=>{
            return {...originalUser.data()}
          }))
        }) 

        changeLoadingMessageData(false)
      }
      obtainBookmarkTimeline()

    /* By not calling changeLoadingMessageData in useEffect it keeps loading each time we update*/
    },)
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
  <>
  {!loadingMessageData &&
    <>
    <div>{messageForBookMark.data().uidUser}</div>
    <UserColumns>
      <CardColumns>
        <PortraitContainer>
          
            <img alt="userportrait" src={ProfileImage}/>

        </PortraitContainer>
      </CardColumns>
      <CardColumns rightColumn>
        <UserNameContainer>
          <NameContainer></NameContainer>
          <AliasContainer></AliasContainer>
          <ShowMoreMenu 
                        changeAlert={changeAlert}
                        changeStateAlert={changeStateAlert}
                        messageUidUser={userInfoForBookmark[0].uidUser} 
                        currentUserInfo={currentUserInfo}
                        id={id} />
        </UserNameContainer>
        <MessageContent>
                {messageForBookMark.data().message}
              </MessageContent>
              <TimeBar>
                {messageForBookMark.data().date}
              </TimeBar>
        <InteractionBar>
          <IconContainer Reply onClick={()=>receiveNotification({
            notification:"delete",
            changeShowPopUp, 
            changePopUpAlert})}>
            <IconComment/>
          </IconContainer>
          <IconContainerCont Retweet>
          {
            !messageForBookMark.data().retweets.includes(currentUserInfo[0].uidUser)?
            <RetweetButton onClick={()=>receiveNotification({
              notification:"retweet",
              id:id,
              retweets:messageForBookMark.data().retweets, 
              originalUidUser:messageForBookMark.data().uidUser, 
              user,
              currentUserInfo,
              changeShowPopUp:changeShowPopUp, 
              changePopUpAlert:changePopUpAlert})}>
              <IconRetweet/>
            </RetweetButton>
          :
          <>
            {
            messageForBookMark.data().uidUser === currentUserInfo[0].uidUser ?
            <RetweetButton onClick={()=>RemoveRetweetSameUser({
              currentUidUser:currentUserInfo[0].uidUser,
              originalRetweets:messageForBookMark.data().retweets, 
              currentMessageId:id})}>
              <IconRetweetColor/>
            </RetweetButton>
            :
            <RetweetButton onClick={()=>RemoveRetweet({
              currentUidUser:currentUserInfo[0].uidUser,
              originalRetweets:messageForBookMark.data().retweets,
              currentMessageId:id, 
              retweetUidUser:messageForBookMark.data().uidUser})}>
              <IconRetweetColor/>
            </RetweetButton>
            }
          </>
          }
            <CounterContainer>
              {messageForBookMark.data().retweets.length}
            </CounterContainer>
          </IconContainerCont>
          <IconContainerCont Like>
            {!messageLikes.includes(currentUserInfo[0].uidUser)?
              <LikeButton  onClick={()=>AddLike({
              id:id,
              uidUser:currentUserInfo[0].uidUser,
              likes:messageForBookMark.data().likes})}> 
                <IconLike />                               
              </LikeButton>
              :
              <LikeButton  onClick={()=>RemoveLike({
              id:id,
              uidUser:currentUserInfo[0].uidUser,
              likes:messageForBookMark.data().likes})}> 
                <IconLikeColor />                               
              </LikeButton>
            }
            <CounterContainer>
              <p>{messageForBookMark.data().likes.length}</p>
            </CounterContainer>
          </IconContainerCont>
        </InteractionBar>
      </CardColumns>
    </UserColumns>
    </>
  }
  </>
    )
}
 
export default BookmarkTimelineContainer;