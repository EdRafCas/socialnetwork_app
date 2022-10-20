import styled from 'styled-components'
import { Link } from 'react-router-dom';
import theme from '../Theme'

const Card =styled.div`
  display:flex;
  flex-direction:column;
  /* border-left:none;
  border-right:none */;
  border:solid ${theme.BorderColor} 1px;
  /* border-radius:15px; */
  /* border-top:solid ${theme.BorderColor} 1px; */
  gap:0rem;
  padding-top:0rem;
  z-index:100;
  /* :hover{
    background:rgba(255,255,255, 0.03);
    } */
`
const PinnedInfo=styled.div`
  height:1.5rem;
  width:100%;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  /* border-bottom:solid ${theme.BorderColor} 1px; */

`
const RetweetInfoContainer=styled.div`
  height:1.5rem;
  width:100%;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  border:none;

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
  padding-top: ${(props) => props.rightColumn && "0.5rem"};
  padding-right: ${(props) => props.rightColumn && "0.5rem"};
  padding-bottom: ${(props) => props.rightColumn && "0.5rem"};
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
  gap:0.5rem;
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
const MessageContent = styled.div`
  width:100%;
  padding:0rem;
  max-height:200px;
  min-height:100px;
  font-size:1rem;
  font-weight:400;
  color:white;
  /* border:solid ${theme.BorderColor} 1px; */
  text-align:justify;
  white-space:normal;
  overflow:hidden;
  p{
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
  padding-top:0.5rem;
  padding-bottom:0.5rem;
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
    background:white;
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
        color:${theme.PinkLike};
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
  
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const IconContainerRetweet=styled.div`
  background:none;
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
  align-items:end;
  color: ${theme.Text};
  font-size:1rem;
  font-weight:800;
  /* border:solid ${theme.BorderColor} 1px; */
  overflow:hidden;
  padding-left:5px;
  gap:5px;
`

const UserNameContainerLink =styled(Link)`
  width:auto;
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
  color:white;
  overflow:hidden;
  :hover{
    text-decoration:underline;
  }
`
const MessageLink=styled(Link)`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
 /*  border-bottom:solid ${theme.BorderColor} 1px; */
  /* border-radius:15px; */
  gap:0rem;
  padding-top:0.5rem;
  /* background:black; */
  text-decoration:none;
  z-index:99;
  :hover{
    pointer-events: auto;
    background:rgba(255,255,255, 0.03);
  }
`
const InteractionBarPinned=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:none;
  border-bottom:solid ${theme.BorderColor} 2px;
  width:100%;
  max-height:6rem;
  padding-top:0.5rem;
  padding-bottom:0.5rem;
  z-index:100;
`

export {Card, UserColumns,CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, PinnedInfo,RetweetInfoContainer, RetweetButton, IconContainerRetweet, NameContainerRetweet, UserNameContainerLink, MessageLink, InteractionBarPinned};