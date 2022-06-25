import React from 'react';
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
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import '../index.css'
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import useObtainMessagesRetweet from '../Hooks/useObtainMessageRetweet';
import {addRetweetToTimeline} from '../firebase/AddRetweet';

const IconContainerRetweet=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items:center;
  height:1.5rem;
  width:100%;
  min-width:64px;
  /* border:1px solid white; */
  fill:currentcolor;

  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
`
const NameContainerRetweet = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  color: ${theme.Text};
  font-size:1rem;
  font-weight:800;
  /* border:solid ${theme.BorderColor} 1px; */
  overflow:hidden;
  padding-left:5px;
  gap:5px;
`
const RetweetButton=styled.button`
  background:black;
  border-radius:50%;
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

const RetweetTimeline = ({id, currentUserInfo}) => {
    const [messageForRetweet] = useObtainMessagesRetweet(id);
    console.log(messageForRetweet)
    
    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };

return ( 
        <Card key={id}>
          <p>{messageForRetweet}</p>
         {/*  <RetweetInfo>
            <IconContainerRetweet Retweet ><IconRetweet/></IconContainerRetweet>
            <NameContainerRetweet>{messageForRetweet.data().name} <p>Retweeted</p> </NameContainerRetweet>
          </RetweetInfo>
          <UserColumns>
            <CardColumns>
              <PortraitContainer>
                {messageForRetweet.data().photoURL ?
                <img alt="userportrait" src={messageForRetweet.data().photoURL}/>
                :
                <img alt="userportrait" src={ProfileImage}/>
                }
                
              </PortraitContainer>
            </CardColumns>
            <CardColumns rightColumn>
              <UserNameContainer>
                <NameContainer>{messageForRetweet.data().name}</NameContainer>
                <AliasContainer>@{messageForRetweet.data().alias}</AliasContainer>
              </UserNameContainer>
              <MessageContent>
                {messageForRetweet.data().message}
                
              </MessageContent>
              <TimeBar>
                {formatDate(messageForRetweet.data().date)}
              </TimeBar>
              <InteractionBar>
                <IconContainer Reply ><IconComment/></IconContainer>
                <IconContainer Retweet ><IconRetweetColor/></IconContainer>
                <IconContainerCont Retweet>
                  <RetweetButton onClick={()=>addRetweetToTimeline}>
                    <IconRetweet/>
                  </RetweetButton>
                  <CounterContainer>
                    {
                      messageForRetweet.data().retweets > 0 ?  
                      messageForRetweet.data().retweets.length 
                      : ""
                    }
                  </CounterContainer>
                </IconContainerCont>
                <IconContainerCont Like>
                  {
                    !messageForRetweet.data().likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton  onClick={()=>AddLike()}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <LikeButton  onClick={()=>RemoveLike()}> 
                      <IconLikeColor />                               
                    </LikeButton>
                  }
                  <CounterContainer>
                    <p>{messageForRetweet.data().likes.length}</p>
                  </CounterContainer>
                </IconContainerCont>
              </InteractionBar>
            </CardColumns>
          </UserColumns> */}
        </Card>
    )
}
 
export default RetweetTimeline;