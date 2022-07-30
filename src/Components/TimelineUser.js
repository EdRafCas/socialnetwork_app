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
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet} from '.././Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import PinnedMessageContainer from './PinnedMessageContainer';
import {ReactComponent as IconPin} from '../img/pin_icon.svg';
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';



const EmptyDiv=styled.div`
`

const TimelineUser = ({user,currentUserInfo}) => {
    const [messagesSentByUser] = useObtainMessagesByUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
 
    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };
    


    /* console.log(MessagesSentByUser); */

      return ( 
        <> 
          {currentUserInfo[0].pinnedMessage &&
          <>
          <RetweetInfo>
            <IconContainerRetweet  >
              <IconPin/>
            </IconContainerRetweet>
              <NameContainerRetweet>
              <p>Pinned Message {currentUserInfo[0].pinnedMessage}</p> 
              </NameContainerRetweet>
          </RetweetInfo>
          <PinnedMessageContainer 
            user={user}
            currentUserInfo={currentUserInfo}
            changeShowPopUp={changeShowPopUp}
            changePopUpAlert={changePopUpAlert}
            originalId={currentUserInfo[0].pinnedMessage}/>          
          </>
          }
          {messagesSentByUser.map((MessageUser, index)=>{
            return(
            <Card key={MessageUser.id}>
              {MessageUser.originalId?
              <>
              {MessageUser.uidUser===currentUserInfo[0].uidUser ?
              <>
              <RetweetInfo>
                <IconContainerRetweet Retweet >
                  <IconRetweet/>
                </IconContainerRetweet>
                <NameContainerRetweet> 
                  <p> You Retweeted</p> 
                </NameContainerRetweet>
              </RetweetInfo>
              <RetweetContainer 
                currentUserInfo={currentUserInfo} 
                originalId={MessageUser.originalId} 
                newRetweetId={MessageUser.id} 
                retweetUidUser={MessageUser.uidUser}
                user={user}/>
              </>
              :
              <EmptyDiv/>
              }
            </>
            :
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
                      {MessageUser.message}
                      
                    </MessageContent>
                    <TimeBar>
                      {formatDate(MessageUser.date)}
                    </TimeBar>
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
                          likes:MessageUser.likes})}
                            > 
                            <IconLike />                               
                          </LikeButton>
                          :
                          <LikeButton  onClick={()=>RemoveLike({
                          id:MessageUser.id,
                          uidUser:currentUserInfo[0].uidUser,
                          likes:MessageUser.likes})}> 
                            <IconLikeColor />                               
                          </LikeButton>
                        }
                        <CounterContainer>
                          <p>{MessageUser.likes.length}</p>
                        </CounterContainer>
                      </IconContainerCont>
                    </InteractionBar>
                  </CardColumns>
              </UserColumns>
              
              }
            </Card>  
            )
          })}          
        </>
       );
}
 
export default TimelineUser;