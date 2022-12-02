import React, {useContext, useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import {PortraitContainer,AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessagesByUserAlias from '../Hooks/useObtainMessagesByUserAlias';
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
import {Card,CardInner,MessageLink, CardColumns, UserNameContainer, UserNameContainerLink, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet} from '../Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import PinnedMessageContainerAlias from './PinnedMessageContainerAlias';
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';


const TimelineUserAlias = ({userByAlias,user,currentUserInfo, changeAlert, changeStateAlert}) => {
    const [messagesSentByUserAlias] = useObtainMessagesByUserAlias(userByAlias[0].uidUser);
    const [messagesByUserLoaded, changeMessagesByUserLoaded] =useState(true)
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
      const ObtainMessagesByUserAlias = async() =>{
        if(userByAlias[0].uidUser){
          console.log("userByAlias[0].uidUser exist")
          console.log(userByAlias[0].uidUser)    
          changeMessagesByUserLoaded(false) 
        } else{
              console.log("userByAlias[0].uidUser not found")
        }

      }
      ObtainMessagesByUserAlias();
    },[update, userByAlias])
 
    var filtertype= messagesSentByUserAlias.filter(function(items) {
      return items.type.includes("retweet") ||
              items.type.includes("message") 
      });

    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };
    
      return ( 
        <>
        {!messagesByUserLoaded?
        <> 
          {userByAlias[0].pinnedMessage &&
          <>
          <PinnedMessageContainerAlias
            update={update}
            changeUpdate={changeUpdate} 
            user={user}
            currentUserInfo={currentUserInfo}
            changeShowPopUp={changeShowPopUp}
            changePopUpAlert={changePopUpAlert}
            originalId={userByAlias[0].pinnedMessage}
            changeAlert={changeAlert}
            changeStateAlert={changeStateAlert}
            userByAlias={userByAlias}/>          
          </>
          }
          {filtertype.map((MessageUser, index)=>{
            return(
            <Card key={MessageUser.id}>
              {MessageUser.originalId?
              <>
              <RetweetContainer 
                update={update}
                changeUpdate={changeUpdate}
                currentUserInfo={currentUserInfo} 
                originalId={MessageUser.originalId} 
                newRetweetId={MessageUser.id}
                originalUidUser={MessageUser.originalUidUser} 
                retweetUidUser={MessageUser.uidUser}
                user={user}
                changeAlert={changeAlert}
                changeStateAlert={changeStateAlert}
                />
              </>
              :
              <CardInner >
                <MessageLink  onClick={()=> navigate(`/user/${userByAlias[0].alias}/status/${MessageUser.id}`)}>
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
                      <UserNameContainerLink 
                      onClick={(e)=>{e.stopPropagation();}}
                      to={`/user/${userByAlias[0].alias}`}>
                        {userByAlias[0].name}
                      </UserNameContainerLink>
                      <AliasContainer>
                        @{userByAlias[0].alias}
                      </AliasContainer>
                      <ShowMoreMenu 
                        changeAlert={changeAlert}
                        changeStateAlert={changeStateAlert}
                        messageUidUser={MessageUser.uidUser} 
                        currentUserInfo={currentUserInfo}
                        id={MessageUser.id}/>
                    </UserNameContainer>
                    <MessageContent>
                      <span onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >
                        {MessageUser.message}
                      </span>
                    </MessageContent>
                   {/*  <TimeBar>
                      {formatDate(MessageUser.date)}
                    </TimeBar> */}
                    <InteractionBar>
                  <IconContainer Reply ><IconComment/></IconContainer>
                  <IconContainerCont Retweet>
                  {!MessageUser.retweets.includes(currentUserInfo[0].uidUser)?
                    <RetweetButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                      notification:"retweet",
                      id:MessageUser.id, 
                      retweets:MessageUser.retweets, 
                      originalUidUser:MessageUser.uidUser, 
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
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:MessageUser.retweets, 
                      currentMessageId:MessageUser.id})}}>
                      <IconRetweetColor/>
                    </RetweetButton>
                  }
                    <CounterContainer>
                      {MessageUser.retweets.length}
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Like>
                    {!MessageUser.likes.includes(currentUserInfo[0].uidUser)?
                      <LikeButton  onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      AddLike({
                      id:MessageUser.id,
                      uidUser:currentUserInfo[0].uidUser,
                      originalUidUser:MessageUser.uidUser,
                      likes:MessageUser.likes,
                      update,
                      changeUpdate})}}> 
                        <IconLike />                               
                      </LikeButton>
                      :
                      <LikeButton  onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveLike({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalLikes:MessageUser.likes,
                        originalMessageId:MessageUser.id,
                        likeUidUser:MessageUser.uidUser, 
                        newId:MessageUser.id,
                        update,
                        changeUpdate})}}> 
                        <IconLikeColor />                               
                      </LikeButton>
                    }
                    <CounterContainer>
                      <p>{MessageUser.likes.length}</p>
                    </CounterContainer>
                  </IconContainerCont>
                    </InteractionBar>
                  </CardColumns>
                </MessageLink>
              </CardInner>
              }
            </Card>  
            )
          })}          
        </>
        :
        <LoadingComponent/>
        }
        </>
        
       );
}
 
export default TimelineUserAlias;