import React from 'react';
import styled from 'styled-components';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessagesByUser from '../Hooks/useObtainMessagesByUser';
import ProfileImage from '../img/profile_avatar.png'
import getUnixTime from 'date-fns/getUnixTime';
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import AddLike from '../firebase/AddLike';
import {addRetweetToTimeline} from '../firebase/AddRetweet';
import RemoveLike from '../firebase/RemoveLike';
import RemoveRetweet from '../firebase/RemoveRetweet';
import '../index.css'
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet} from '.././Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import PinnedMessageContainer from './PinnedMessageContainer';
import {ReactComponent as IconPin} from '../img/pin_icon.svg';


const EmptyDiv=styled.div`
`

const TimelineUser = ({changeAlert, stateAlert, changeStateAlert, user,currentUserInfo}) => {
    const [messagesSentByUser] = useObtainMessagesByUser();
 
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
                <p>Pinned Message</p> 
                </NameContainerRetweet>
            </RetweetInfo>
            <PinnedMessageContainer user={user}
                        currentUserInfo={currentUserInfo}/>         
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
                   <IconContainerRetweet Retweet ><IconRetweet/></IconContainerRetweet>
                   <NameContainerRetweet> You <p>Retweeted</p> </NameContainerRetweet>
                 </RetweetInfo>
                 <RetweetContainer currentUserInfo={currentUserInfo} 
                                   originalId={MessageUser.originalId} 
                                   newRetweetId={MessageUser.id} 
                                   retweetUidUser={MessageUser.uidUser}/>
                 </>
                 :
                 <EmptyDiv/>
                 }
               </>
               :
                <UserColumns>
                    <CardColumns>
                      <PortraitContainer>
                        {MessageUser.photoURL ?
                        <img alt="userportrait" src={MessageUser.photoURL}/>
                        :
                        <img alt="userportrait" src={ProfileImage}/>
                        }
                        
                      </PortraitContainer>
                    </CardColumns>
                    <CardColumns rightColumn>
                      <UserNameContainer>
                        <NameContainer>{MessageUser.name}</NameContainer>
                        <AliasContainer>@{MessageUser.alias}</AliasContainer>
                      </UserNameContainer>
                      <MessageContent>
                        {MessageUser.message}
                        
                      </MessageContent>
                      <TimeBar>
                        {formatDate(MessageUser.date)}
                      </TimeBar>
                      <InteractionBar>
                        <IconContainer Reply ><IconComment/></IconContainer>
                        <IconContainer Retweet ><IconRetweetColor/></IconContainer>
                        <IconContainerCont Retweet>
                        {
                          !MessageUser.retweets.includes(currentUserInfo[0].uidUser)?
                          <RetweetButton onClick={()=>addRetweetToTimeline({
                          changeAlert, 
                          changeStateAlert, 
                          id:MessageUser.id, 
                          originalUidUser:MessageUser.uidUser, 
                          retweets:MessageUser.retweets, 
                          user, 
                          currentUserInfo, 
                          date: getUnixTime(new Date())})}>
                            <IconRetweet/>
                          </RetweetButton>
                        :
                        <RetweetButton onClick={()=>RemoveRetweet({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalRetweets:MessageUser.retweets, 
                        originalId:MessageUser.originalId, 
                        currentMessageUserId:MessageUser.id, 
                        retweetUidUser:MessageUser.uidUser})}
                        >
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