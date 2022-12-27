import styled from 'styled-components'
import { Link } from 'react-router-dom';
import theme from '../Theme'

const Card =styled.div`
  display:flex;
  flex-direction:column;
  max-width:700px;
 /*  border-left:solid ${theme.BorderColor} 1px ;
  border-right:solid ${theme.BorderColor} 1px ; */
  border-bottom: ${(props) => props.TimelineComment ? ` solid ${theme.BorderColor} 1px`: "none"};
  /* border-radius:15px; */
  /* border-top:solid ${theme.BorderColor} 1px; */
  gap:0rem;
  padding-top:0rem;
  z-index:100;
  /* :hover{
    background:rgba(255,255,255, 0.03);
    } */
`
const CardInner =styled.div`
  display:flex;
  flex-direction:column;
  border:none;
  /* border-top:solid ${theme.BorderColor} 1px; */
  border-bottom:solid ${theme.BorderColor} 1px;
  gap:0rem;
  padding-top:${(props)=> props.Reply ? `0.5rem`
                        : props.Like ? `12px`
                        : props.Retweet ? `12px` 
                        : props.Pinned ? `12px` 
                        : "0rem"};
  z-index:1;                   
  :hover{
    pointer-events: auto;
    cursor:pointer;
    background:rgba(255,255,255, 0.03);
  }
`
const MessageLink=styled.div`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
  gap:0rem;
  padding-top:${(props)=> props.Reply ? `0rem`
                        : props.Like ? `0rem`
                        : props.Retweet ? `0rem` 
                        : "12px"};
  padding-bottom:0;
  text-decoration:none;
  /* background:black; */
  :hover{
    cursor:pointer;
 /*  background:rgba(255,255,255, 0.03); */
  }
`
const PinnedInfo=styled.div`
  height:auto;;
  width:100%;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  padding-bottom: 3px;
  /* border-bottom:solid ${theme.BorderColor} 1px; */

`
const RetweetInfoContainer=styled.div`
  height:auto;
  width:100%;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  /* border:solid ${theme.BorderColor} 1px; */
  padding-bottom: 3px;

`
const UserColumns=styled.div`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  /* border-radius:15px; */
  gap:0rem;
  padding-top:0.5rem;
  /* background:black; */
`
const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top: 0rem;
  padding-right: ${(props) => props.rightColumn && "0"};
  padding-bottom: ${(props) => props.rightColumn && "0.5rem"};
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
  gap:0;
`
const UserNameContainer =styled.div`
  width:100%;
  padding:0rem;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  position:relative;
`
const UserNameContainerQuoted =styled.div`
  width:100%;
  padding:2.5px 0rem;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  position:relative;
  p{
    color:${theme.Text};
  }
`
const MessageContent = styled.div`
  width:100%;
  padding-left:0rem;
  padding-right:1rem;
  padding-top:0.5rem;
  padding-bottom:0.5rem;
  max-height:200px;
  font-size:1rem;
  font-weight:400;
  color:white;
  /* border:solid ${theme.BorderColor} 1px; */
  text-align:justify;
  white-space:normal;
  overflow:hidden;
  z-index:101;
  span{
    user-select: text;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    white-space:pre-wrap;}
`
const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:none;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  width:100%;
  max-height:6rem;
  padding-top:0rem;
  padding-bottom:0rem;
  margin-top:0.5rem;
  z-index:98;
`
const IconContainer=styled.div`
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:2.5rem;
  width:2.5rem;
  /* border:1px solid white; */
  fill:currentcolor;
  :hover{
    background:${(props)=> props.Reply ? `${theme.BlueReplyBackground}`
                         : props.Like ? `${theme.PinkLikeBackground}` 
                         : props.Retweet ? `${theme.GreenRetweetBackground}` 
                         : "auto"};
    svg{
      /* max-height:3rem; */
      stroke: ${(props)=> props.Reply ? `${theme.BlueReply}`
                         : props.Like ? `${theme.PinkLike}` 
                         : props.Retweet ? `${theme.GreenRetweet}` 
                         : "auto"};
    }
  }
  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
  :active{
    background:white;;
    fill:black;
  }
`
const CounterContainer=styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  /* border:1px solid white; */
  fill:currentcolor;
  width:40px;
  height:40px;
  padding-left:5px;
  background:none;
  color:${theme.Text};
  :hover{
   
  }
  :active{
 /*    background:white; */
    fill:black;
  }
`
const IconContainerCont=styled.div`
  /* border-radius:50%; */
  /*  border:solid red 1px; */
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  background:none;
  button{
    svg{
      max-height:1.2rem;
    }
  }
  :hover{
    button{
      cursor:pointer;
      background:${(props)=> props.Reply ? `${theme.BlueReplyBackground}`
                         : props.Like ? `${theme.PinkLikeBackground}` 
                         : props.Retweet ? `${theme.GreenRetweetBackground}` 
                         : "auto"};
    svg{
      stroke: ${(props)=> props.Reply ? `${theme.BlueReply}`
                      : props.Like ? `${theme.PinkLike}` 
                      : props.Retweet ? `${theme.GreenRetweet}` 
                      : "auto"};
    }   
    }
    div{
      p{
        color: ${(props)=> props.Reply ? `${theme.BlueReply}`
                      : props.Like ? `${theme.PinkLike}` 
                      : props.Retweet ? `${theme.GreenRetweet}` 
                      : "auto"};
      }
    }
  } 
`
const TimeBar =styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  border:none;
  width:100%;
  color:${theme.Text};
`
const LikeButton=styled.button`
  background:none;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  border:none;
  
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const RetweetButton=styled.button`
  background:none;
  border-radius:50%;
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  z-index:100;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`

const IconContainerRetweet=styled.div`
  background:none;
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items:end;
  height:1.5rem;
  width:100%;
  min-width:64px;
  /* border:1px solid white; */
  fill:currentcolor;
  padding-left:0.5rem;
  padding-right:0.5rem;
  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
`
const NameContainerRetweet = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:end;
  color: ${theme.Text};
  font-size:1rem;
  font-weight:800;
  /* border:solid ${theme.BorderColor} 1px; */
  overflow:hidden;
  padding-left:0;
  gap:5px;
`

const UserNameContainerLink =styled(Link)`
  width: fit-content;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  /* border:solid ${theme.BorderColor} 1px; */
  gap:5px;
  text-decoration:none;
  font-size:1.1rem;
  font-weight:1000;
  color:white;
  overflow:hidden;
  z-index:81;
  :hover{
    text-decoration:underline;
  }
`
const UserNameContainerLinkQuoted =styled(Link)`
  width:fit-content;
  padding:0rem;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  position:relative;
  text-decoration:none;
  font-size:1.1rem;
  font-weight:1000;
  color:${theme.BlueReply};
  overflow:hidden;
  :hover{
    text-decoration:underline;
  }
`

const InteractionBarPinned=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:none;
  /* border-bottom:solid ${theme.BorderColor} 2px; */
  width:100%;
  max-height:6rem;
  padding-top:0.5rem;
  padding-bottom:0.5rem;
  z-index:100;
`

const BarButton=styled.button`
  background:none;
  border-radius:50%;
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  z-index:100;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const EmptyDiv =styled.div`
  visibility:hidden
  display:none;
  overflow:hidden;
`
const EmptyDivColumn=styled.div`
  height:0.5rem;
  width:100%;
  /* border:solid ${theme.BorderColor} 1px; */
`
const StraightLine2=styled.div`
  height:0.5rem;
  width:2px;
  border:solid ${theme.BorderColor} 1px;
  background-color: rgb(51, 54, 57);
`
const LoadMoreButton=styled.button`
  display:flex;
  height:4rem;
  width:15rem;
  border-radius:15px;
  padding:2rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  /* border:solid red 1px; */
  background:${theme.GradientBackround};
  p{
    font-size:1.2rem;
    font-weight:1000;
    color:white;
    /* border:solid red 1px; */
  }
  :hover{
    background:${theme.BluePinned}};
  }
  :active{
    border:solid black 3px;
    p{
      color:black;
      
    }
  }
`
const LoadMoreContainer=styled.div`
  display:flex;
  height:100%;
  max-width:700px;
  min-width:350px;
  flex-direction:column;
  align-items:center;
  justify-content:center;
 /*  border-bottom:solid ${theme.BorderColor} 1px;
  border-right:solid ${theme.BorderColor} 1px;
  border-left:solid ${theme.BorderColor} 1px; */
  padding:0.5rem 0.5rem;
`

const DeletedMessage = styled.div`
  padding: 1rem 0.5rem;
  margin: 0.5rem 0.5rem;
  border-radius:15px;
  background-color: rgb(22, 24, 28);
  min-width:350px;
`
const DeletedCommentLink =styled(Link)`
  padding:0.5rem 1rem;
  width: fit-content;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  /* border:solid ${theme.BorderColor} 1px; */
  gap:5px;
  color:${theme.BlueReply};
  text-decoration:none;
  font-weight:1000;
  overflow:hidden;
  z-index:81;
  :hover{
    text-decoration:underline;
  }
`
export {Card,CardInner, UserColumns,CardColumns, UserNameContainer, UserNameContainerQuoted, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, PinnedInfo,RetweetInfoContainer, RetweetButton, IconContainerRetweet, NameContainerRetweet, UserNameContainerLink,UserNameContainerLinkQuoted, MessageLink, InteractionBarPinned, BarButton, EmptyDiv, EmptyDivColumn, StraightLine2, LoadMoreButton,LoadMoreContainer, DeletedMessage, DeletedCommentLink};