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

const Card =styled.div`
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  border-bottom:solid ${theme.BorderColor} 1px;
  /* border-radius:15px; */
  gap:0rem;
  background:black;
`
const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top: ${(props) => props.rightColumn && "0.5rem"};
  padding-right: ${(props) => props.rightColumn && "0.5rem"};
  padding-bottom: ${(props) => props.rightColumn && "0.5rem"};
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  gap:0.5rem;
`
const UserNameContainer =styled.div`
  width:100%;
  padding:0rem;
  border-bottom:solid ${theme.BorderColor} 1px;
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
`
const MessageContent = styled.div`
  width:100%;
  padding:0rem;
  max-height:200px;
  min-height:50px;
  font-size:1rem;
  font-weight:400;
  color:white;
  /* border:solid ${theme.BorderColor} 1px; */
  text-align:justify;
  white-space:normal;
  overflow:hidden;
`
const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:solid ${theme.BorderColor} 1px;
  width:100%;
  max-height:6rem;
`
const IconContainer=styled.div`
  border-radius:50%;
  display:flex;
  align-items:center;
  height:1.8rem;
  /* border:1px solid white; */
  fill:currentcolor;
  :hover{
    background:${theme.GradientBackround};
  }
    svg{
      max-height:1.2rem;
      fill:white;
    }
  :active{
    background:white;;
    fill:black;
  }
`
const CounterContainer=styled.div`
  border-radius:50%;
  display:flex;
  align-items:center;
  height:1.8rem;
  /* border:1px solid white; */
  fill:currentcolor;
  :hover{
    background:${theme.GradientBackround};
  }
    svg{
      max-height:1.2rem;
      fill:white;
    }
  :active{
    background:white;;
    fill:black;
  }
`
const IconContainerCont=styled.div`
  border-radius:50%;
  display:flex;
  align-items:center;
  height:1.8rem;
  gap:5px;
`
const TimeBar =styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:solid ${theme.BorderColor} 1px;
  width:100%;
`

const LikeButton=styled.button`
  background:black;
  border-radius:50%;
  display:flex;
  align-items:center;
  height:1.8rem;
  gap:5px;
`



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
                    <NameContainer>{Message.name+" "+Message.lastname}</NameContainer><AliasContainer>@{Message.alias}</AliasContainer>
                  </UserNameContainer>
                  <MessageContent>
                    {Message.message}
                    
                  </MessageContent>
                  <TimeBar>
                    {formatDate(Message.date)}
                  </TimeBar>
                  <TimeBar>
                    {Message.id}
                  </TimeBar>
                  <TimeBar>
                    {Message.uidUser}
                  </TimeBar>
                  <TimeBar>
                    {Message.likes}
                  </TimeBar>
                  
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