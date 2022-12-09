import React,{useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
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
import {CardInner, CardColumns, UserNameContainer, UserNameContainerLink, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, MessageLink, BarButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';


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

const LikeContainer = ({ changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user, originalId,originalUidUser, update, changeUpdate, newId}) => {
    const [loadingLikes, changeLoadingLikes] =useState(true);
    const [messageForLike, changeMessageForLike] = useState('')
    const [userInfoForLike, changeUserInfoForLike] =useState([{}])
    const navigate = useNavigate();

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeMessageForLike(document) 
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
              changeUserInfoForLike(snapshot.docs.map((originalUser)=>{
                return {...originalUser.data()}
              }))
            })
            console.log("like reload")

          changeLoadingLikes(false)
      }
      obtainMessage();

      /* By not calling changeLoadingLikes in useEffect it keeps loading each time we update*/
      },[currentUserInfo, update, originalId, originalUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
        <>
        {!loadingLikes ?
        <>
          {messageForLike.exists()?
          <CardInner>
            <MessageLink onClick={()=> navigate(`/user/${userInfoForLike[0].alias}/status/${originalId}`)}>
              <CardColumns>
                <PortraitContainer>
                  {userInfoForLike[0].photoURL ?
                  <img alt="userportrait" src={userInfoForLike[0].photoURL}/>
                  :
                  <img alt="userportrait" src={ProfileImage}/>
                  }
                </PortraitContainer>
              </CardColumns>
              <CardColumns rightColumn>
                <UserNameContainer>
                  <UserNameContainerLink 
                    onClick={(e)=>{e.stopPropagation();}}
                    to={`/user/${userInfoForLike[0].alias}`}>
                    {userInfoForLike[0].alias}
                  </UserNameContainerLink >
                  <AliasContainer>
                    @{userInfoForLike[0].alias}
                  </AliasContainer>
                  <ShowMoreMenu 
                          changeAlert={changeAlert}
                          changeStateAlert={changeStateAlert}
                          messageUidUser={messageForLike.data().uidUser} 
                          currentUserInfo={currentUserInfo}
                          id={originalId}/>
                </UserNameContainer>
                <MessageContent>
                  <span onClick={(e)=>{e.preventDefault();e.stopPropagation()}}>
                    {messageForLike.data().message}
                  </span>
                </MessageContent>
                <TimeBar>
                  {formatDate(messageForLike.data().date)}
                </TimeBar>
                <InteractionBar>
                  <IconContainerCont Reply>
                    <BarButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                        notification:"comment",
                        messageMessage:messageForLike.data().message,
                        messageForTimeline:userInfoForLike,
                        id:originalId,
                        retweets:messageForLike.data().retweets,
                        comments:messageForLike.data().comments,
                        originalUidUser:messageForLike.data().uidUser,
                        user,
                        currentUserInfo,
                        changeShowPopUp:changeShowPopUp, 
                        changePopUpAlert:changePopUpAlert,
                        update,
                        changeUpdate})}}>
                      <IconComment/>
                    </BarButton>
                    <CounterContainer>
                    <p>
                      {messageForLike.data().comments?
                        messageForLike.data().comments.length
                      :""}
                    </p>
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Retweet>
                    {!messageForLike.data().retweets.includes(currentUserInfo[0].uidUser)?
                      <RetweetButton onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        receiveNotification({
                        notification:"retweet",
                        id:originalId,
                        retweets:messageForLike.data().retweets, 
                        originalUidUser:messageForLike.data().uidUser, 
                        user, 
                        currentUserInfo, 
                        changeShowPopUp, 
                        changePopUpAlert})}}>
                        <IconRetweet/>
                      </RetweetButton>
                      :
                      <>
                      {messageForLike.data().uidUser ===currentUserInfo[0].uidUser ?
                      <RetweetButton onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveRetweetSameUser({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalRetweets:messageForLike.data().retweets,
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
                        originalRetweets:messageForLike.data().retweets,
                        currentMessageId:originalId,
                        retweetUidUser:messageForLike.data().uidUser,
                        update,
                        changeUpdate})}}>
                        <IconRetweetColor/>
                      </RetweetButton>
                        }
                      </>
                    }
                    <CounterContainer>
                      {messageForLike.data().retweets.length}
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Like>
                    {!messageForLike.data().likes.includes(currentUserInfo[0].uidUser)?
                      <LikeButton  onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        AddLike({
                        update,
                        changeUpdate,
                        id:originalId,
                        uidUser:currentUserInfo[0].uidUser,
                        originalUidUser:messageForLike.data().originalUidUser,
                        likes:messageForLike.data().likes})}}> 
                        <IconLike />                               
                      </LikeButton>
                      :
                      <>
                      {messageForLike.data().uidUser ===currentUserInfo[0].uidUser ?
                      <LikeButton  onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveLikeSameUser({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalLikes:messageForLike.data().likes,
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
                        originalLikes:messageForLike.data().likes,
                        originalMessageId:originalId,
                        likeUidUser:messageForLike.data().uidUser,
                        newId:newId,
                        update,
                        changeUpdate})}}> 
                        <IconLikeColor />                               
                      </LikeButton>
                      }
                      </>
                    }
                    <CounterContainer>
                      <p>{messageForLike.data().likes.length}</p>
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
 
export default LikeContainer;