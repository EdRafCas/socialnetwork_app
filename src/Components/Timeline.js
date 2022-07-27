import React,{useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessages from '../Hooks/useObtainMessages';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import RemoveRetweet from '../firebase/RemoveRetweet';
import MessageBox from './MessageBox';
import '../index.css'
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet} from '.././Elements/ElementsTimeline'
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import { AuthContext } from '../Context/AuthContext';
import receiveNotification from './ReceiveNotification';
import RetweetContainerMainTimeline from './RetweetContainerMainTimeline';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import MessageTimelineContainer from './MessageTimelineContainer';
 
const TimelineContainer = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
  padding:0rem;
  border:solid ${theme.BorderColor} 1px;
  gap:0rem;
  overflow:scroll;
  overflow-x:hidden;
`
const EmptyDiv=styled.div`
`


const Timeline = ({changeAlert, changeStateAlert, user, currentUserInfo, addToTimeline, message, handleChange}) => {
    const [messagesSent] = useObtainMessages();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    
    console.log("reloading timeline")
    console.log(currentUserInfo)

    
    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
    };
    

    /* console.log(MessagesSent); */

      return ( 
      <TimelineContainer className='timeline-user'>
        <MessageBox user={user}
                    currentUserInfo={currentUserInfo}
                    addToTimeline={addToTimeline}
                    message={message}
                    handleChange={handleChange} /> 
        {messagesSent.map((Message, index)=>{
        return(
          <Card key={Message.id}>
            {Message.originalId?
            <>
              {Message.uidUser!==currentUserInfo[0].uidUser ?
              <>
              <RetweetInfo>
                <IconContainerRetweet Retweet >
                  <IconRetweet/>
                </IconContainerRetweet>
                <NameContainerRetweet>
                  {Message.name}<p>Retweeted</p> 
                </NameContainerRetweet>
              </RetweetInfo>
              <RetweetContainerMainTimeline 
                currentUserInfo={currentUserInfo} 
                originalId={Message.originalId} 
                newRetweetId={Message.id} 
                retweetUidUser={Message.uidUser}
                changeShowPopUp={changeShowPopUp}
                changePopUpAlert={changePopUpAlert}
                user={user}/>
              </>
              :
              <EmptyDiv/>
              }
            </>
            :
            <>
            <MessageTimelineContainer
              id={Message.id}
              user={user}
              currentUserInfo={currentUserInfo}
              messageUidUser={Message.uidUser}
              messageDate={Message.date}
              messageMessage={Message.message}
              messageRetweets={Message.retweets}
              messageLikes={Message.likes}
              messageOriginalId={Message.originalId}
              changeShowPopUp={changeShowPopUp}
              changePopUpAlert={changePopUpAlert}
              changeAlert={changeAlert}
              changeStateAlert={changeStateAlert}
            />
            {/* <UserColumns>
              <CardColumns>
                <PortraitContainer>
                  {Message.photoURL ?
                  <img alt="user-portrait" src={Message.photoURL}/>
                  :
                  <img alt="user-portrait" src={ProfileImage}/>
                  }
                  
                </PortraitContainer>
              </CardColumns>
              <CardColumns rightColumn>
                <UserNameContainer>
                  <NameContainer>{Message.name}</NameContainer>
                  <AliasContainer>@{Message.alias}</AliasContainer>
                  <ShowMoreMenu 
                                changeAlert={changeAlert}
                                changeStateAlert={changeStateAlert}
                                messageUidUser={Message.uidUser} 
                                currentUserInfo={currentUserInfo}
                                id={Message.id} />
                </UserNameContainer>
                <MessageContent>
                  {Message.message}
                </MessageContent>
                <TimeBar>
                  {formatDate(Message.date)}
                </TimeBar>
                <InteractionBar>
                  <IconContainer Reply onClick={()=>receiveNotification({
                    notification:"delete",
                    changeShowPopUp:changeShowPopUp, 
                    changePopUpAlert:changePopUpAlert})}>
                    <IconComment/>
                  </IconContainer>
                  <IconContainerCont Retweet>
                  {
                    !Message.retweets.includes(currentUserInfo[0].uidUser)?
                    <RetweetButton onClick={()=>receiveNotification({
                      notification:"retweet",
                      id:Message.id,
                      retweets:Message.retweets,
                      originalUidUser:Message.uidUser,
                      user,
                      currentUserInfo,
                      changeShowPopUp:changeShowPopUp, 
                      changePopUpAlert:changePopUpAlert})}>
                      <IconRetweet/>
                    </RetweetButton>
                  :
                  <>
                    {
                    Message.uidUser === currentUserInfo[0].uidUser ?
                    <RetweetButton onClick={()=>RemoveRetweetSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:Message.retweets, 
                      currentMessageId:Message.id})}>
                      <IconRetweetColor/>
                    </RetweetButton>
                    :
                    <RetweetButton onClick={()=>RemoveRetweet({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:Message.retweets, 
                      originalId:Message.originalId, 
                      currentMessageId:Message.id, 
                      retweetUidUser:Message.uidUser})}>
                      <IconRetweetColor/>
                    </RetweetButton>
                    }
                  </>
                  }
                    <CounterContainer>
                      {Message.retweets.length}
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Like>
                    {!Message.likes.includes(currentUserInfo[0].uidUser)?
                      <LikeButton  onClick={()=>AddLike({
                      id:Message.id,
                      uidUser:currentUserInfo[0].uidUser,
                      likes:Message.likes})}> 
                        <IconLike />                               
                      </LikeButton>
                      :
                      <LikeButton  onClick={()=>RemoveLike({
                      id:Message.id,
                      uidUser:currentUserInfo[0].uidUser,
                      likes:Message.likes})}> 
                        <IconLikeColor />                               
                      </LikeButton>
                    }
                    <CounterContainer>
                      <p>{Message.likes.length}</p>
                    </CounterContainer>
                  </IconContainerCont>
                </InteractionBar>
              </CardColumns>
            </UserColumns> */}
            </>
            }
          </Card>  
        )})
        }        
      </TimelineContainer>
       );
}
 
export default Timeline;