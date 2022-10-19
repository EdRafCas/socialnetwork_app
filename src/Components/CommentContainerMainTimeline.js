import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
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
import {CardColumns, UserNameContainer, UserNameContainerLink, MessageContent, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
import RetweetInfo from '../Elements/RetweetInfo';


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
  z-index:100;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const MessageLink=styled(Link)`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
 /*  border:red ${theme.BorderColor} 1px; */
  gap:0rem;
  padding-top:0.5rem;
  /* background:black; */
  text-decoration:none;
  z-index:80;
  :hover{
    pointer-events: auto;
  }
`
const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
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
const StraightLine=styled.div`
  height:90%;
  width:2px;
  border:solid ${theme.BorderColor} 1px;
`

const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:solid ${theme.BorderColor} 1px;
  width:100%;
  max-height:6rem;
  padding-top:0.5rem;
  padding-bottom:0.5rem;
  z-index:98;
`

const CommentContainerMainTimeline = ({ changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user, originalId,originalUidUser, update, changeUpdate, commentUidUser, commentContent, commentId}) => {
    const [loadingRetweets, changeLoadingRetweets] =useState(true);
    const [messageForComment, changeMessageForComment] = useState('')
    const [userInfoForComment, changeUserInfoForComment] =useState([{}])

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeMessageForComment(document) 
           /*  if(document.exists()){
              console.log(originalId +" existe")
            
            } else{
              console.log(originalId +" no existe")
            } */
            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", originalUidUser),
              limit(10)
            );

            onSnapshot(consult, (snapshot)=>{
              changeUserInfoForComment(snapshot.docs.map((originalUser)=>{
                return {...originalUser.data()}
              }))
            })
            console.log("retweet reload")

          changeLoadingRetweets(false)
      }
      obtainMessage();

      /* By not calling changeLoadingRetweets in useEffect it keeps loading each time we update*/
      },[currentUserInfo, update, originalId, originalUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
      <>
        {!loadingRetweets ?
        <>
          {messageForComment.exists() ?
          <>
          {/* <RetweetInfo commentUidUser={commentUidUser}
                        currentUidUser={currentUserInfo[0].uidUser}/> */}
          <>
          <MessageLink to={`/user/${userInfoForComment[0].alias}/status/${originalId}`}>
            <CardColumns>
              <PortraitContainer>
                {userInfoForComment[0].photoURL ?
                <img alt="userportrait" src={userInfoForComment[0].photoURL}/>
                :
                <img alt="userportrait" src={ProfileImage}/>
                }
              </PortraitContainer>
              <StraightLine/>
            </CardColumns>
            <CardColumns rightColumn>
              <UserNameContainer>
                <UserNameContainerLink to={`/user/${userInfoForComment[0].alias}`}>
                  {userInfoForComment[0].name}
                </UserNameContainerLink >
                <AliasContainer>
                  @{userInfoForComment[0].alias}
                </AliasContainer>
                  <ShowMoreMenu 
                    changeAlert={changeAlert}
                    changeStateAlert={changeStateAlert}
                    messageUidUser={messageForComment.data().uidUser} 
                    currentUserInfo={currentUserInfo}
                    id={originalId} />
              </UserNameContainer>
              <MessageContent>
                <p>
                {messageForComment.data().message}
                </p>
              </MessageContent>
              <TimeBar>
                {formatDate(messageForComment.data().date)}
              </TimeBar>
              <InteractionBar>
              <IconContainer onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  receiveNotification({
                  notification:"comment",
                  messageMessage:messageForComment.data().message,
                  messageForTimeline:userInfoForComment,
                  id:originalId,
                  comments:messageForComment.data().comments,
                  retweets:messageForComment.data().retweets,
                  originalUidUser:messageForComment.data().uidUser,
                  user,
                  currentUserInfo,
                  changeShowPopUp:changeShowPopUp, 
                  changePopUpAlert:changePopUpAlert,
                  update,
                  changeUpdate})}}>
                <IconComment/>
              </IconContainer>
                <IconContainerCont Retweet>
                  {!messageForComment.data().retweets.includes(currentUserInfo[0].uidUser)?
                    <RetweetButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                      notification:"retweet",
                      id:originalId,
                      retweets:messageForComment.data().retweets, 
                      originalUidUser:messageForComment.data().uidUser, 
                      user, 
                      currentUserInfo, 
                      changeShowPopUp, 
                      changePopUpAlert
                    })}}>
                      <IconRetweet/>
                    </RetweetButton>
                    :
                    <>
                    {
                    messageForComment.data().uidUser ===currentUserInfo[0].uidUser ?
                    <RetweetButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveRetweetSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:messageForComment.data().retweets,
                      currentMessageId:originalId,
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
                        originalRetweets:messageForComment.data().retweets,
                        currentMessageId:originalId,
                        commentUidUser:messageForComment.data().uidUser,
                        update,
                        changeUpdate})}}>
                        <IconRetweetColor/>
                      </RetweetButton>
                      }
                    </>
                  }
                  <CounterContainer>
                    {messageForComment.data().retweets.length}
                  </CounterContainer>
                </IconContainerCont>
                <IconContainerCont Like>
                  {!messageForComment.data().likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton  onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    AddLike({
                    update,
                    changeUpdate,
                    originalUidUser:messageForComment.data().uidUser,
                    id:originalId,
                    uidUser:currentUserInfo[0].uidUser,
                    likes:messageForComment.data().likes})}}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <>
                    {
                      messageForComment.data().uidUser ===currentUserInfo[0].uidUser ?
                    <LikeButton  onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveLikeSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalLikes:messageForComment.data().likes,
                      originalMessageId:originalId,
                      update,
                      changeUpdate})}}> 
                      <IconLikeColor />                               
                    </LikeButton>
                      :
                    <LikeButton  onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveLike({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalLikes:messageForComment.data().likes,
                      originalMessageId:originalId,
                      likeUidUser:originalUidUser,
                      newId:commentId,
                      update,
                      changeUpdate})}}> 
                      <IconLikeColor />                               
                    </LikeButton>
                  }
                  </>
                  }
                  <CounterContainer>
                    <p>{messageForComment.data().likes.length}</p>
                  </CounterContainer>
                </IconContainerCont>
              </InteractionBar>
            </CardColumns> 
          </MessageLink>
          </>
          <>
          <MessageLink to={`/user/${currentUserInfo[0].alias}/status/${commentId}`}>
            <CardColumns>
              <PortraitContainer>
                {currentUserInfo[0].photoURL ?
                <img alt="userportrait" src={currentUserInfo[0].photoURL}/>
                :
                <img alt="userportrait" src={ProfileImage}/>
                }
              </PortraitContainer>
            </CardColumns>
            <CardColumns rightColumn>
              <UserNameContainer>
                <UserNameContainerLink to={`/user/${currentUserInfo[0].alias}`}>
                  {currentUserInfo[0].name}
                </UserNameContainerLink >
                <AliasContainer>
                  @{currentUserInfo[0].alias}
                </AliasContainer>
                  <ShowMoreMenu 
                    changeAlert={changeAlert}
                    changeStateAlert={changeStateAlert}
                    messageUidUser={messageForComment.data().uidUser} 
                    currentUserInfo={currentUserInfo}
                    id={originalId} />
              </UserNameContainer>
              <MessageContent>
                <p>
                {commentContent}
                </p>
              </MessageContent>
              <TimeBar>
                {formatDate(messageForComment.data().date)}
              </TimeBar>
              <InteractionBar>
              <IconContainer Reply ><IconComment/></IconContainer>
              <IconContainerCont Retweet>
                {!messageForComment.data().retweets.includes(currentUserInfo[0].uidUser)?
                  <RetweetButton onClick={()=>receiveNotification({
                    notification:"retweet",
                    id:originalId,
                    retweets:messageForComment.data().retweets, 
                    originalUidUser:messageForComment.data().uidUser, 
                    user, 
                    currentUserInfo, 
                    changeShowPopUp, 
                    changePopUpAlert
                  })}>
                    <IconRetweet/>
                  </RetweetButton>
                  :
                  <>
                  {
                  messageForComment.data().uidUser ===currentUserInfo[0].uidUser ?
                  <RetweetButton onClick={()=>RemoveRetweetSameUser({
                    currentUidUser:currentUserInfo[0].uidUser,
                    originalRetweets:messageForComment.data().retweets,
                    currentMessageId:originalId,
                    update,
                    changeUpdate})}>
                    <IconRetweetColor/>
                  </RetweetButton>
                    :
                    <RetweetButton onClick={()=>RemoveRetweet({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:messageForComment.data().retweets,
                      currentMessageId:originalId,
                      commentUidUser:messageForComment.data().uidUser,
                      update,
                      changeUpdate
                    })}>
                      <IconRetweetColor/>
                    </RetweetButton>
                    }
                  </>
                }
                <CounterContainer>
                  {messageForComment.data().retweets.length}
                </CounterContainer>
              </IconContainerCont>
              <IconContainerCont Like>
                {!messageForComment.data().likes.includes(currentUserInfo[0].uidUser)?
                  <LikeButton  onClick={()=>AddLike({
                  update,
                  changeUpdate,
                  originalUidUser:messageForComment.data().uidUser,
                  id:originalId,
                  uidUser:currentUserInfo[0].uidUser,
                  likes:messageForComment.data().likes})}> 
                    <IconLike />                               
                  </LikeButton>
                  :
                  <>
                  {
                    messageForComment.data().uidUser ===currentUserInfo[0].uidUser ?
                  <LikeButton  onClick={()=>RemoveLikeSameUser({
                    currentUidUser:currentUserInfo[0].uidUser,
                    originalLikes:messageForComment.data().likes,
                    originalMessageId:originalId,
                    update,
                    changeUpdate})}> 
                    <IconLikeColor />                               
                  </LikeButton>
                    :
                  <LikeButton  onClick={()=>RemoveLike({
                    currentUidUser:currentUserInfo[0].uidUser,
                    originalLikes:messageForComment.data().likes,
                    originalMessageId:originalId,
                    likeUidUser:originalUidUser,
                    newId:commentId,
                    update,
                    changeUpdate})}> 
                    <IconLikeColor />                               
                  </LikeButton>
                }
                </>
                }
                <CounterContainer>
                  <p>{messageForComment.data().likes.length}</p>
                </CounterContainer>
              </IconContainerCont>
            </InteractionBar>
            </CardColumns> 
            
          </MessageLink>
          </>
          </>
          :
          <EmptyDiv/>
          }
        </>
        :
        <LoadingComponent/>
        }
      </>
    )
}
 
export default CommentContainerMainTimeline;