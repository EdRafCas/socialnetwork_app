import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessages from '../Hooks/useObtainMessages';
import ProfileImage from './../img/profile_img.png';
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import addLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import {Card, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '.././Elements/ElementsTimeline'




const TimelineLikes = ({currentUserInfo}) => {
    const [messagesSent] = useObtainMessages();

    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };

    var filterLikes= messagesSent.filter(function(items) {
      return items.likes.includes(currentUserInfo[0].uidUser)
      });
    console.log(filterLikes)

    /* console.log(MessagesSent); */

      return ( 
            <>
            {filterLikes.map((Message, index)=>{
              return(
              <Card key={Message.id}>
                <CardColumns>
                  <PortraitContainer>
                    <img alt="userportrait" src={ProfileImage}/>
                  </PortraitContainer>
                </CardColumns>
                <CardColumns rightColumn>
                  <UserNameContainer>
                    <NameContainer>{Message.name}</NameContainer><AliasContainer>@{Message.alias}</AliasContainer>
                  </UserNameContainer>
                  <MessageContent>
                    {Message.message}
                    
                  </MessageContent>
                  <TimeBar>
                    {formatDate(Message.date)}
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
                    <CounterContainer>{Message.retweets > 0 ?  Message.retweets.length : "" }</CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont>
                    {!Message.likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton onClick={()=>addLike({id:Message.id,uidUser:currentUserInfo[0].uidUser,likes:Message.likes})}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <LikeButton onClick={()=>RemoveLike({id:Message.id,uidUser:currentUserInfo[0].uidUser,likes:Message.likes})}> 
                      <IconLikeColor />                               
                    </LikeButton>}
                    <CounterContainer>{Message.likes.length}</CounterContainer>
                  </IconContainerCont>
                  
                  
                  
                  
                  </InteractionBar>
                </CardColumns>
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikes;