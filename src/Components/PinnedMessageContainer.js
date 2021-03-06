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
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';

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

const PinnedMessageContainer = ({ originalId, user, changeShowPopUp, changePopUpAlert, currentUserInfo}) => {
    const [loadingPinned, changeLoadingPinned] =useState(true);
    const [messagePinned, ChangeMessagePinned] = useState('')

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId ));
            ChangeMessagePinned(document) 
             /* if(document.exists){
                  console.log("id existe")
             }else{
                  console.log("id no existe")
             } */
             
          changeLoadingPinned(false)
      }
      obtainMessage();

      /* By not calling changeLoadingPinned in useEffect it keeps loading each time we update*/
      },)
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
        <>
        {!loadingPinned &&
          <UserColumns>
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
                <NameContainer>{currentUserInfo[0].name}</NameContainer>
                <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
              </UserNameContainer>
              <MessageContent>
                {messagePinned.data().message}
                
              </MessageContent>
              <TimeBar>
                {formatDate(messagePinned.data().date)}
              </TimeBar>
              <InteractionBar>
                <IconContainer Reply ><IconComment/></IconContainer>
                <IconContainerCont Retweet>
                  {!messagePinned.data().retweets.includes(currentUserInfo[0].uidUser)?
                     <RetweetButton onClick={()=>receiveNotification({
                      notification:"retweet",
                      id:originalId, 
                      retweets:messagePinned.data().retweets, 
                      originalUidUser:currentUserInfo[0].uidUser, 
                      user, 
                      currentUserInfo, 
                      changeShowPopUp:changeShowPopUp, 
                      changePopUpAlert:changePopUpAlert})}>
                      <IconRetweet/>
                    </RetweetButton>
                    :
                    <RetweetButton onClick={()=>RemoveRetweetSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:messagePinned.data().retweets, 
                      currentMessageId:originalId})}>
                      <IconRetweetColor/>
                    </RetweetButton>
                  }
                  <CounterContainer>
                    {messagePinned.data().retweets.length}
                  </CounterContainer>
                </IconContainerCont>
                <IconContainerCont Like>
                  {!messagePinned.data().likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton  onClick={()=>AddLike({})}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <LikeButton  onClick={()=>RemoveLike({})}> 
                      <IconLikeColor />                               
                    </LikeButton>
                  }
                  <CounterContainer>
                    <p>{messagePinned.data().likes.length}</p>
                  </CounterContainer>
                </IconContainerCont>
              </InteractionBar>
            </CardColumns> 
          </UserColumns>
        }
        </>
    )
}
 
export default PinnedMessageContainer;