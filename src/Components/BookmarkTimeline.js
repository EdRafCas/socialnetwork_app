import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer,AliasContainer} from '../Elements/ElementsFormulary';
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
import {CardInner, MessageLink, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, BarButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { collection, limit, query, where, onSnapshot} from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import {useNavigate} from 'react-router-dom';

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
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1.1rem;
  font-weight:1000;
  color:white;
  overflow:hidden;
  :hover{
    text-decoration:underline;
  }
  
`

const BookmarkTimeline = ({date, likes, comments, retweets, message, uidUser, id, user, currentUserInfo,changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert, userInfoForBookmark, changeUserInfoForBookmark, update, changeUpdate}) => {
    const [loadingBookmarkData, changeLoadingBookmarkData] =useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
      const obtainBookmarkTimeline = async() =>{
        const consult = query(
          collection(db, 'userInfo'),
          where('uidUser', "==", uidUser),
          limit(10)
        );
        onSnapshot(consult, (snapshot)=>{
          changeUserInfoForBookmark(snapshot.docs.map((originalUser)=>{
            return {...originalUser.data()}
          }))
        }) 
        console.log("bookmark refresh")
        changeLoadingBookmarkData(false)
      }
      obtainBookmarkTimeline()

    /* By not calling changeLoadingBookmarkData in useEffect it keeps loading each time we update*/
    },[changeUserInfoForBookmark, uidUser, update])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
  <>
  {!loadingBookmarkData ?
    <CardInner>
    <MessageLink to={`/user/${userInfoForBookmark[0].alias}/status/${id}`}>
      <CardColumns>
        <PortraitContainer>
          {userInfoForBookmark[0].photoURL ?
          <img alt="userportrait" src={userInfoForBookmark[0].photoURL}/>
          :
          <img alt="userportrait" src={ProfileImage}/>
          }
          </PortraitContainer>
      </CardColumns>
      <CardColumns rightColumn>
        <UserNameContainer>
          <NameContainer  onClick={() => navigate(`/user/${userInfoForBookmark[0].alias}`)}>{userInfoForBookmark[0].name}
          </NameContainer>
          <AliasContainer>@{userInfoForBookmark[0].alias}</AliasContainer>
          <ShowMoreMenu 
                        bookmarkTimeline={true}
                        update={update}
                        changeUpdate={changeUpdate}
                        changeAlert={changeAlert}
                        changeStateAlert={changeStateAlert}
                        messageUidUser={userInfoForBookmark[0].uidUser} 
                        currentUserInfo={currentUserInfo}
                        id={id} />
        </UserNameContainer>
        <MessageContent>
          <span 
          onClick={(e)=>{e.preventDefault();e.stopPropagation()}}>
            {message}
          </span>
        </MessageContent>
        <TimeBar>
          {formatDate(date)}
        </TimeBar>
        <InteractionBar>
          <IconContainerCont Reply>
            <BarButton onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    receiveNotification({
                    notification:"comment",
                    message,
                    messageForTimeline:userInfoForBookmark,
                    id:id,
                    comments:comments,
                    retweets:retweets,
                    originalUidUser:userInfoForBookmark[0].uidUser,
                    user,
                    currentUserInfo,
                    changeShowPopUp:changeShowPopUp, 
                    changePopUpAlert:changePopUpAlert,
                    update,
                    changeUpdate})}}>
              <IconComment/>
            </BarButton>
            <CounterContainer>
              <p>lol</p>
            </CounterContainer>
          </IconContainerCont>
          <IconContainerCont Retweet>
          {
            !retweets.includes(currentUserInfo[0].uidUser)?
            <RetweetButton onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              receiveNotification({
              notification:"retweet",
              id:id,
              retweets:retweets, 
              originalUidUser:uidUser, 
              user,
              currentUserInfo,
              changeShowPopUp,
              changePopUpAlert})}}>
              <IconRetweet/>
            </RetweetButton>
          :
          <>
            {
            uidUser === currentUserInfo[0].uidUser ?
            <RetweetButton onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              RemoveRetweetSameUser({
              currentUidUser:currentUserInfo[0].uidUser,
              originalRetweets:retweets, 
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
              originalRetweets:retweets,
              currentMessageId:id, 
              retweetUidUser:uidUser,
              update,
              changeUpdate})}}>
              <IconRetweetColor/>
            </RetweetButton>
            }
          </>
          }
            <CounterContainer>
              {retweets.length}
            </CounterContainer>
          </IconContainerCont>
          <IconContainerCont Like>
            {!likes.includes(currentUserInfo[0].uidUser)?
              <LikeButton  onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                AddLike({
                update,
                changeUpdate,
                originalUidUser:uidUser,
                id:id,
                uidUser:currentUserInfo[0].uidUser,
                likes:likes})} }> 
                <IconLike />                               
              </LikeButton>
              :
              <LikeButton  onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              RemoveLike({
              update,
              changeUpdate,
              originalMessageId:id,
              likeUidUser:uidUser,
              currentUidUser:currentUserInfo[0].uidUser,
              uidUser:currentUserInfo[0].uidUser,
              originalLikes:likes})}}> 
                <IconLikeColor />                               
              </LikeButton>
            }
            <CounterContainer>
              <p>{likes.length}</p>
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
 
export default BookmarkTimeline;