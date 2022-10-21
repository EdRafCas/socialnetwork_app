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
import {CardInner, MessageLink, CardColumns, UserNameContainer, UserNameContainerLink, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import { AddRetweet } from '../firebase/AddRetweet';
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
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`

const RetweetContainer = ({ currentUidUser, currentUserInfo, newRetweetId, originalId, originalUidUser, retweetUidUser, changeAlert, changeStateAlert, update, changeUpdate}) => {
    const [loadingRetweets, changeLoadingRetweets] =useState(true);
    const [messageForRetweet, changeMessageForRetweet] = useState('')
    const [userInfoForRetweet, changeUserInfoForRetweet] =useState([{}])

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeMessageForRetweet(document) 
            if(document.exists()){
              console.log(originalId +" existe")
            
            } else{
              console.log(originalId +" no existe")
            }

            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", originalUidUser),
              limit(10)
            );

            onSnapshot(consult, (snapshot)=>{
              changeUserInfoForRetweet(snapshot.docs.map((originalUser)=>{
                return {...originalUser.data()}
              }))
            })
             
            console.log("reload retweet")
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
          {messageForRetweet.exists() ?
          <CardInner>
            <RetweetInfo
                    currentUidUser={currentUidUser}
                    retweetUidUser={retweetUidUser}/>
            <MessageLink to={`/user/${userInfoForRetweet[0].alias}/status/${originalId}`}>
              <CardColumns>
                <PortraitContainer>
                  {userInfoForRetweet[0].photoURL ?
                  <img alt="userportrait" src={userInfoForRetweet[0].photoURL}/>
                  :
                  <img alt="userportrait" src={ProfileImage}/>
                  }
                </PortraitContainer>
              </CardColumns>
              <CardColumns rightColumn>
                <UserNameContainer>
                  <UserNameContainerLink to={`/user/${userInfoForRetweet[0].alias}`}>
                    {userInfoForRetweet[0].name}
                    </UserNameContainerLink>
                  <AliasContainer>
                    @{userInfoForRetweet[0].alias}
                    </AliasContainer>
                  <ShowMoreMenu 
                    changeAlert={changeAlert}
                    changeStateAlert={changeStateAlert}
                    messageUidUser={messageForRetweet.data().uidUser} 
                    currentUserInfo={currentUserInfo}
                    id={originalId}/>
                </UserNameContainer>
                <MessageContent>
                  <p>{messageForRetweet.data().message}</p>
                </MessageContent>
                <TimeBar>
                  {formatDate(messageForRetweet.data().date)}
                </TimeBar>
                <InteractionBar>
                  <IconContainer Reply ><IconComment/></IconContainer>
                  <IconContainerCont Retweet>
                    {!messageForRetweet.data().retweets.includes(currentUserInfo[0].uidUser)?
                      <RetweetButton onClick={()=>AddRetweet()}>
                        <IconRetweet/>
                      </RetweetButton>
                      :
                      <>
                      {messageForRetweet.data().uidUser ===currentUserInfo[0].uidUser?
                      <RetweetButton onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveRetweetSameUser({
                        update,
                        changeUpdate,
                        currentUidUser:currentUserInfo[0].uidUser,originalRetweets:messageForRetweet.data().retweets, 
                        currentMessageId:originalId})}}>
                        <IconRetweetColor/>
                      </RetweetButton>
                      :
                      <RetweetButton onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveRetweet({
                        update,
                        changeUpdate,
                        currentUidUser:currentUserInfo[0].uidUser,originalRetweets:messageForRetweet.data().retweets, 
                        currentMessageId:originalId, 
                        newRetweetId:newRetweetId, 
                        retweetUidUser})}}>
                        <IconRetweetColor/>
                      </RetweetButton>
                      }
                      </>
                    }
                    <CounterContainer>
                      {messageForRetweet.data().retweets.length}
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Like>
                {!messageForRetweet.data().likes.includes(currentUserInfo[0].uidUser)?
                  <LikeButton  onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  AddLike({
                  update,
                  changeUpdate,
                  id:originalId,
                  originalUidUser:messageForRetweet.data().uidUser,
                  uidUser:currentUserInfo[0].uidUser,
                  likes:messageForRetweet.data().likes})}}> 
                    <IconLike />                               
                  </LikeButton>
                  :
                  <>
                  {originalUidUser === currentUserInfo[0].uidUser ?
                  <LikeButton  onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    RemoveLikeSameUser({
                    currentUidUser:currentUserInfo[0].uidUser,
                    originalLikes:messageForRetweet.data().likes,
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
                    originalLikes:messageForRetweet.data().likes,
                    originalMessageId:originalId,
                    likeUidUser:originalUidUser,
                    newId:newRetweetId,
                    update,
                    changeUpdate})}}> 
                    <IconLikeColor />                               
                  </LikeButton>
                  }
                  </>
                }
                <CounterContainer>
                  <p>{messageForRetweet.data().likes.length}</p>
                </CounterContainer>
                </IconContainerCont>
                </InteractionBar>
              </CardColumns> 
            </MessageLink>
          </CardInner>
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
 
export default RetweetContainer;