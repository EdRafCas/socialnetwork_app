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
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import { AddRetweet } from '../firebase/AddRetweet';
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

const RetweetContainer = ({ currentUserInfo, newRetweetId, originalId, originalUidUser, retweetUidUser, changeAlert, changeStateAlert, update, changeUpdate}) => {
    const [loadingRetweets, changeLoadingRetweets] =useState(true);
    const [messageForRetweet, changeMessageForRetweet] = useState('')
    const [userInfoForRetweet, changeUserInfoForRetweet] =useState(currentUserInfo)

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeMessageForRetweet(document) 

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
        {!loadingRetweets &&
          <UserColumns>
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
                <NameContainer>{userInfoForRetweet[0].name}</NameContainer>
                <AliasContainer>@{userInfoForRetweet[0].alias}</AliasContainer>
                <ShowMoreMenu 
                        changeAlert={changeAlert}
                        changeStateAlert={changeStateAlert}
                        messageUidUser={messageForRetweet.data().uidUser} 
                        currentUserInfo={currentUserInfo}
                        id={messageForRetweet.data().id}/>
              </UserNameContainer>
              <MessageContent>
                {messageForRetweet.data().message}
                
              </MessageContent>
              <TimeBar>
                {formatDate(messageForRetweet.data().date)}
              </TimeBar>
              <InteractionBar>
                <IconContainer Reply ><IconComment/></IconContainer>
                <IconContainerCont Retweet>
                  {!messageForRetweet.data().retweets.includes(currentUserInfo[0].uidUser)?
                    <RetweetButton onClick={()=>AddRetweet(
                    )}>
                      <IconRetweet/>
                    </RetweetButton>
                    :
                    <RetweetButton onClick={()=>RemoveRetweet({
                      update,
                      changeUpdate,
                      newRetweetId:newRetweetId, 
                      originalId:originalId, 
                      retweetUidUser, 
                      currentUidUser:currentUserInfo[0].uidUser,originalRetweets:messageForRetweet.data().retweets})}>
                      <IconRetweetColor/>
                    </RetweetButton>
                  }
                  <CounterContainer>
                    {messageForRetweet.data().retweets.length}
                  </CounterContainer>
                </IconContainerCont>
                <IconContainerCont Like>
                  {!messageForRetweet.data().likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton  onClick={()=>AddLike({
                    update,
                    changeUpdate,
                    id:originalId,
                    uidUser:currentUserInfo[0].uidUser,
                    likes:messageForRetweet.data().likes})}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <LikeButton  onClick={()=>RemoveLike({
                      update,
                      changeUpdate,
                      id:originalId, 
                      uidUser:currentUserInfo[0].uidUser, likes:messageForRetweet.data().likes})}> 
                      <IconLikeColor />                               
                    </LikeButton>
                  }
                  <CounterContainer>
                    <p>{messageForRetweet.data().likes.length}</p>
                  </CounterContainer>
                </IconContainerCont>
              </InteractionBar>
            </CardColumns> 
          </UserColumns>
        }
        </>
    )
}
 
export default RetweetContainer;