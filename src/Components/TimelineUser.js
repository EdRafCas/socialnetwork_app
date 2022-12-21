import React, {useContext} from 'react';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';
import {PortraitContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessagesByUser from '../Hooks/useObtainMessagesByUser';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
import '../index.css'
import {Card,CardInner, CardColumns, UserNameContainer, UserNameContainerLink, MessageContent, InteractionBar,CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton,MessageLink, BarButton, EmptyDiv, LoadMoreButton,LoadMoreContainer} from '.././Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import PinnedMessageContainer from './PinnedMessageContainer';
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import ShowMoreMenu from '../Elements/ShowMoreMenu';





const TimelineUser = ({user,currentUserInfo, changeAlert, changeStateAlert}) => {
    const [messagesSentByUser,ObtainMoreMessagesByUser,thereAreMoreMessagesByUser] = useObtainMessagesByUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    const navigate = useNavigate();
 
    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };
    
    var filtertype= messagesSentByUser.filter(function(items) {
      return items.type.includes("retweet") ||
              items.type.includes("message") 
      });


    /* console.log(MessagesSentByUser); */

      return ( 
        <> 
          {currentUserInfo[0].pinnedMessage &&
          <Card>
            <PinnedMessageContainer
              update={update}
              changeUpdate={changeUpdate} 
              user={user}
              originalId={currentUserInfo[0].pinnedMessage}
              currentUserInfo={currentUserInfo}
              changeShowPopUp={changeShowPopUp}
              changePopUpAlert={changePopUpAlert}
              changeAlert={changeAlert}
              changeStateAlert={changeStateAlert}/>          
          </Card>
          }
          {filtertype.map((MessageUser, index)=>{
            return(
            <Card key={MessageUser.id}>
              {MessageUser.originalId?
              <>
              {MessageUser.uidUser===currentUserInfo[0].uidUser ?
                <RetweetContainer 
                  update={update}
                  changeUpdate={changeUpdate}
                  currentUidUser={currentUserInfo[0].uidUser}
                  currentUserInfo={currentUserInfo} 
                  originalId={MessageUser.originalId} 
                  newRetweetId={MessageUser.id}
                  originalUidUser={MessageUser.originalUidUser} 
                  retweetUidUser={MessageUser.uidUser}
                  user={user}
                  changeAlert={changeAlert}
                  changeStateAlert={changeStateAlert}
                  changeShowPopUp={changeShowPopUp}
                  changePopUpAlert={changePopUpAlert}/>
              :
                <EmptyDiv/>
              }
              </>
              :
              <CardInner>
                <MessageLink onClick={()=> navigate(`/user/${currentUserInfo[0].alias}/status/${MessageUser.id}`)}>
                  <CardColumns >
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
                      <UserNameContainerLink 
                        onClick={(e)=>{e.stopPropagation();}}
                        to={`/user/${currentUserInfo[0].alias}`}>
                        {currentUserInfo[0].name}
                      </UserNameContainerLink>
                      <AliasContainer>
                        @{currentUserInfo[0].alias}
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
                      <IconContainerCont Reply>
                        <BarButton onClick={(e)=>{
                          e.preventDefault();
                          e.stopPropagation();
                          receiveNotification({
                            notification:"comment",
                            messageMessage:MessageUser.message,
                            messageForTimeline:currentUserInfo,
                            id:MessageUser.id,
                            retweets:MessageUser.retweets,
                            comments:MessageUser.comments,
                            originalUidUser:MessageUser.uidUser,
                            user,
                            currentUserInfo,
                            changeShowPopUp:changeShowPopUp, 
                            changePopUpAlert:changePopUpAlert,
                            update,
                            changeUpdate})}}>
                          <IconComment/>
                        </BarButton>
                        <CounterContainer>
                        <p>{MessageUser.comments?
                            MessageUser.comments.length
                            :""}</p>
                        </CounterContainer>
                      </IconContainerCont>
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
                          currentMessageId:MessageUser.id,
                          update,
                          changeUpdate})}}>
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
                    <>
                      {MessageUser.uidUser === currentUserInfo[0].uidUser ?
                      <LikeButton  onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveLikeSameUser({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalLikes:MessageUser.likes,
                        originalMessageId:MessageUser.id,
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
                        originalLikes:MessageUser.likes,
                        originalMessageId:MessageUser.id,
                        likeUidUser:MessageUser.uidUser,
                        newId:MessageUser.id,
                        update,
                        changeUpdate})}}> 
                        <IconLikeColor />                               
                      </LikeButton>
                      }
                    </>
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
          })
          }  
          {thereAreMoreMessagesByUser &&
          <LoadMoreContainer>
          <LoadMoreButton onClick= {() => ObtainMoreMessagesByUser()}> <p>Load More</p></LoadMoreButton>
          </LoadMoreContainer>
          }
        </>
       );
}
 
export default TimelineUser;