import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessagesByUser from '../Hooks/useObtainMessagesByUser';
import ProfileImage from './../img/profile_img.png';
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import addLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import {Card, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '.././Elements/ElementsTimeline'





const TimelineUser = ({currentUserInfo}) => {
    const [messagesSentByUser] = useObtainMessagesByUser();

    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };
    

    /* console.log(MessagesSentByUser); */

      return ( 
          <>
            {messagesSentByUser.map((MessageUser, index)=>{
              return(
              <Card key={MessageUser.id}>
                <CardColumns>
                  <PortraitContainer>
                    <img alt="userportrait" src={ProfileImage}/>
                  </PortraitContainer>
                </CardColumns>
                <CardColumns rightColumn>
                  <UserNameContainer>
                    <NameContainer>{MessageUser.name}</NameContainer><AliasContainer>@{MessageUser.alias}</AliasContainer>
                  </UserNameContainer>
                  <MessageContent>
                    {MessageUser.message}
                    
                  </MessageContent>
                  <TimeBar>
                    {formatDate(MessageUser.date)}
                  </TimeBar>
                  {/* <TimeBar>
                    {Message.id}
                  </TimeBar>
                  <TimeBar>
                    {Message.uidUser}
                  </TimeBar>
                  <TimeBar>
                    {Message.likes}
                  </TimeBar> */}
                  
                  <InteractionBar>
                  <IconContainer><IconComment/></IconContainer>
                  <IconContainer><IconRetweet/></IconContainer>
                  <IconContainerCont>
                    <IconContainer><IconRetweet/></IconContainer>
                    <CounterContainer>{MessageUser.retweets > 0 ?  MessageUser.retweets.length : "" }</CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont>
                    {!MessageUser.likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton onClick={()=>addLike({id:MessageUser.id,uidUser:currentUserInfo[0].uidUser,likes:MessageUser.likes})}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <LikeButton onClick={()=>RemoveLike({id:MessageUser.id,uidUser:currentUserInfo[0].uidUser,likes:MessageUser.likes})}> 
                      <IconLikeColor />                               
                    </LikeButton>}
                    <CounterContainer>{MessageUser.likes.length}</CounterContainer>
                  </IconContainerCont>
                  
                  
                  
                  
                  </InteractionBar>
                </CardColumns>
              </Card>  
              )
            })}          
          </>
       );
}
 
export default TimelineUser;