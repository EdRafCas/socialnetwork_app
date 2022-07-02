import React from 'react';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessagesLikesUser from '../Hooks/useObtainMessagesLikesUser';
import ProfileImage from '../img/profile_avatar.png';
import getUnixTime from 'date-fns/getUnixTime';
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import AddLike from '../firebase/AddLike';
import {addRetweetToTimeline} from '../firebase/AddRetweet';
import RemoveLike from '../firebase/RemoveLike';
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet} from '.././Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import RemoveRetweet from '../firebase/RemoveRetweet';


const TimelineLikes = ({changeAlert, changeStateAlert, user, currentUserInfo, addToTimeline, message, handleChange}) => {
    const ExampleOrder = [
      {name: "Eduardo",
        value: [{Gold:15, Silver:10}]
      },
      {
        name: "Ana",
        value: [{Gold:10, Silver:12}]
      }
    ]

    const [messagesLikedByUser] = useObtainMessagesLikesUser();

    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };

    var filterLikes= messagesLikedByUser.filter(function(items) {
      return items.likes.includes(currentUserInfo[0].uidUser)
      });

     
    /*
    console.log(messagesSent)
    console.log(ExampleOrder)
    console.log(filterLikes) 
    */


      return ( 
            <>
            {filterLikes.map((Message, index)=>{
              return(
              <Card key={Message.id}>
                <UserColumns>
                    <CardColumns>
                      <PortraitContainer>
                        {Message.photoURL ?
                        <img alt="userportrait" src={Message.photoURL}/>
                        :
                        <img alt="userportrait" src={ProfileImage}/>
                        }
                        
                      </PortraitContainer>
                    </CardColumns>
                    <CardColumns rightColumn>
                      <UserNameContainer>
                        <NameContainer>{Message.name}</NameContainer>
                        <AliasContainer>@{Message.alias}</AliasContainer>
                      </UserNameContainer>
                      <MessageContent>
                        {Message.message}
                        
                      </MessageContent>
                      <TimeBar>
                        {formatDate(Message.date)}
                      </TimeBar>
                      <InteractionBar>
                        <IconContainer Reply ><IconComment/></IconContainer>
                        <IconContainer Retweet ><IconRetweetColor/></IconContainer>
                        <IconContainerCont Retweet>
                        {
                            !Message.retweets.includes(currentUserInfo[0].uidUser)?
                          <RetweetButton onClick={()=>addRetweetToTimeline({changeAlert, changeStateAlert, id:Message.id, originalUidUser:Message.uidUser, retweets:Message.retweets, user, currentUserInfo, date: getUnixTime(new Date())})}>
                            <IconRetweet/>
                          </RetweetButton>
                        :
                        <RetweetButton onClick={()=>RemoveRetweet({currentUidUser:currentUserInfo[0].uidUser,originalRetweets:Message.retweets, originalId:Message.originalId, newRetweetId:Message.id, retweetUidUser:Message.uidUser})}>
                            <IconRetweetColor/>
                          </RetweetButton>
                        }
                          <CounterContainer>
                            {Message.retweets.length}
                          </CounterContainer>
                        </IconContainerCont>
                        <IconContainerCont Like>
                          {
                            !Message.likes.includes(currentUserInfo[0].uidUser)?
                            <LikeButton  onClick={()=>AddLike({id:Message.id,uidUser:currentUserInfo[0].uidUser,likes:Message.likes})}> 
                              <IconLike />                               
                            </LikeButton>
                            :
                            <LikeButton  onClick={()=>RemoveLike({id:Message.id,uidUser:currentUserInfo[0].uidUser,likes:Message.likes})}> 
                              <IconLikeColor />                               
                            </LikeButton>
                          }
                          <CounterContainer>
                            <p>{Message.likes.length}</p>
                          </CounterContainer>
                        </IconContainerCont>
                      </InteractionBar>
                    </CardColumns>
                </UserColumns>
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikes;