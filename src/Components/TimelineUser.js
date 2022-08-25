import React, {useContext} from 'react';
import styled from 'styled-components';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
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
import '../index.css'
import {Card, PinnedInfo,CardColumns, UserNameContainer, UserNameContainerLink, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet, MessageLink} from '.././Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import PinnedMessageContainer from './PinnedMessageContainer';
import {ReactComponent as IconPin} from '../img/pin_icon.svg';
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import RetweetInfo from '../Elements/RetweetInfo';


const EmptyDiv=styled.div`
`

const TimelineUser = ({user,currentUserInfo, changeAlert, changeStateAlert}) => {
    const [messagesSentByUser] = useObtainMessagesByUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    console.log("TimelineUser")
 
    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };
    


    /* console.log(MessagesSentByUser); */

      return ( 
        <> 
          {currentUserInfo[0].pinnedMessage &&
          <Card>
          <PinnedInfo>
            <IconContainerRetweet  >
              <IconPin/>
            </IconContainerRetweet>
              <NameContainerRetweet>
              <p>Pinned Message </p> 
              </NameContainerRetweet>
          </PinnedInfo>
          <PinnedMessageContainer
            update={update}
            changeUpdate={changeUpdate} 
            user={user}
            currentUserInfo={currentUserInfo}
            changeShowPopUp={changeShowPopUp}
            changePopUpAlert={changePopUpAlert}
            originalId={currentUserInfo[0].pinnedMessage}
            changeAlert={changeAlert}
            changeStateAlert={changeStateAlert}/>          
          </Card>
          }
          {messagesSentByUser.map((MessageUser, index)=>{
            return(
            <Card key={MessageUser.id}>
              {MessageUser.originalId?
              <>
              {MessageUser.uidUser===currentUserInfo[0].uidUser ?
              <>
                <RetweetInfo
                currentUidUser={currentUserInfo[0].uidUser}
                retweetUidUser={MessageUser.uidUser}
                />
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
              <EmptyDiv/>
              }
              </>
              :
              <>
              <MessageLink to={`/user/${currentUserInfo[0].alias}/status/${MessageUser.id}`}>
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
                    <UserNameContainerLink to={`/user/${currentUserInfo[0].alias}`} >
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
                    {MessageUser.message}
                  </MessageContent>
                  <TimeBar>
                    {formatDate(MessageUser.date)}
                  </TimeBar>
                </CardColumns>
              </MessageLink>
              <InteractionBar>
                <IconContainer Reply ><IconComment/></IconContainer>
                <IconContainerCont Retweet>
                {
                  !MessageUser.retweets.includes(currentUserInfo[0].uidUser)?
                  <RetweetButton onClick={()=>receiveNotification({
                    notification:"retweet",
                    id:MessageUser.id, 
                    retweets:MessageUser.retweets, 
                    originalUidUser:MessageUser.uidUser, 
                    user, 
                    currentUserInfo, 
                    changeShowPopUp:changeShowPopUp, 
                    changePopUpAlert:changePopUpAlert})}>
                    <IconRetweet/>
                  </RetweetButton>
                :
                  <RetweetButton onClick={()=>RemoveRetweetSameUser({
                  currentUidUser:currentUserInfo[0].uidUser,
                  originalRetweets:MessageUser.retweets, 
                  currentMessageId:MessageUser.id})}>
                    <IconRetweetColor/>
                  </RetweetButton>
                }
                  <CounterContainer>
                    {MessageUser.retweets.length}
                  </CounterContainer>
                </IconContainerCont>
                <IconContainerCont Like>
                  {
                    !MessageUser.likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton  onClick={()=>AddLike({
                    id:MessageUser.id,
                    uidUser:currentUserInfo[0].uidUser,
                    likes:MessageUser.likes, 
                    update,
                    changeUpdate})}
                      > 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <LikeButton  onClick={()=>RemoveLike({
                    id:MessageUser.id,
                    uidUser:currentUserInfo[0].uidUser,
                    likes:MessageUser.likes, 
                    update,
                    changeUpdate})}> 
                      <IconLikeColor />                               
                    </LikeButton>
                  }
                  <CounterContainer>
                    <p>{MessageUser.likes.length}</p>
                  </CounterContainer>
                </IconContainerCont>
              </InteractionBar>
              </>
              }
            </Card>  
            )
          })}          
        </>
       );
}
 
export default TimelineUser;