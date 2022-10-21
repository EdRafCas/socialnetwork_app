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
import {ReactComponent as IconPin} from '../img/pin_icon.svg';
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import '../index.css'
import {MessageLink,CardInner, CardColumns, UserNameContainer, MessageContent, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, InteractionBarPinned,PinnedInfo, IconContainerRetweet, NameContainerRetweet} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';

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

const PinnedMessageContainerAlias = ({ userByAlias, originalId, user, changeShowPopUp, changePopUpAlert, currentUserInfo, update, changeUpdate}) => {
    const [loadingPinned, changeLoadingPinned] =useState(true);
    const [messagePinned, ChangeMessagePinned] = useState('')
    console.log(userByAlias[0].alias)
    console.log(currentUserInfo[0].name)
    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId ));
            ChangeMessagePinned(document) 
          console.log("PinnedMessageContainerAlias")
          changeLoadingPinned(false)
      }
      obtainMessage();
      /* By not calling changeLoadingPinned in useEffect it keeps loading each time we update*/
      },[currentUserInfo, update, originalId])

      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
        <>
        {!loadingPinned ?
        <CardInner>
          <PinnedInfo>
            <IconContainerRetweet  >
              <IconPin/>
            </IconContainerRetweet>
              <NameContainerRetweet>
              <p>Pinned Message </p> 
              </NameContainerRetweet>
          </PinnedInfo>
          <MessageLink to={`/user/${userByAlias[0].alias}/status/${originalId}`}>
            <CardColumns>
              <PortraitContainer>
                {userByAlias[0].photoURL ?
                <img alt="userportrait" src={userByAlias[0].photoURL}/>
                :
                <img alt="userportrait" src={ProfileImage}/>
                }  
              </PortraitContainer>
            </CardColumns>
            <CardColumns rightColumn>
              <UserNameContainer>
                <NameContainer>{userByAlias[0].name}</NameContainer>
                <AliasContainer>@{userByAlias[0].alias}</AliasContainer>
                <ShowMoreMenu 
                        pinnedMenu={true}
                        messageUidUser={userByAlias[0].uidUser} 
                        currentUserInfo={currentUserInfo}
                        id={originalId} />
              </UserNameContainer>
              <MessageContent>
                <p>{messagePinned.data().message}</p>
              </MessageContent>
              <TimeBar>
                {formatDate(messagePinned.data().date)}
              </TimeBar>
              <InteractionBarPinned>
            <IconContainer Reply ><IconComment/></IconContainer>
            <IconContainerCont Retweet>
              {!messagePinned.data().retweets.includes(currentUserInfo[0].uidUser)?
                <RetweetButton onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    receiveNotification({
                    notification:"retweet",
                    id:originalId, 
                    retweets:messagePinned.data().retweets, 
                    originalUidUser:userByAlias[0].uidUser, 
                    user, 
                    currentUserInfo, 
                    changeShowPopUp:changeShowPopUp, 
                    changePopUpAlert:changePopUpAlert})}}>
                  <IconRetweet/>
                </RetweetButton>
                :
                <RetweetButton onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  RemoveRetweetSameUser({
                  update,
                  changeUpdate,
                  currentUidUser:currentUserInfo[0].uidUser,
                  originalRetweets:messagePinned.data().retweets, 
                  currentMessageId:originalId})}}>
                  <IconRetweetColor/>
                </RetweetButton>
              }
              <CounterContainer>
                {messagePinned.data().retweets.length}
              </CounterContainer>
            </IconContainerCont>
            <IconContainerCont Like>
              {!messagePinned.data().likes.includes(currentUserInfo[0].uidUser)?
                <LikeButton  onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  AddLike({
                  id:originalId,
                  uidUser:currentUserInfo[0].uidUser,
                  likes:messagePinned.data().likes,
                  update,
                  changeUpdate})}}> 
                  <IconLike />                               
                </LikeButton>
                :
                <LikeButton  onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  RemoveLike({
                  id:originalId,
                  uidUser:currentUserInfo[0].uidUser,
                  likes:messagePinned.data().likes,
                  update,
                  changeUpdate})}}> 
                  <IconLikeColor />                               
                </LikeButton>
              }
              <CounterContainer>
                <p>{messagePinned.data().likes.length}</p>
              </CounterContainer>
            </IconContainerCont>
          </InteractionBarPinned>
            </CardColumns> 
          </MessageLink>
        </CardInner>
        :
        <LoadingComponent/>
        }
        </>
    )
}
 
export default PinnedMessageContainerAlias;