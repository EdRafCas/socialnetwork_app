import styled from 'styled-components'
import theme from '../Theme'

const Card =styled.div`
  display:flex;
  flex-direction:column;
  /* border:solid ${theme.BorderColor} 1px; */
  /* border-radius:15px; */
  gap:0rem;
  padding-top:0rem;
  background:black;
  
`
const RetweetInfo=styled.div`
  height:1.5rem;
  width:100%;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  

`
const UserColumns=styled.div`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
  border-bottom:solid ${theme.BorderColor} 1px;
  /* border-radius:15px; */
  gap:0rem;
  padding-top:0.5rem;
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
  /* border-bottom:solid ${theme.BorderColor} 1px; */
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
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
`
const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border-top:solid ${theme.BorderColor} 1px;
  width:100%;
  max-height:6rem;
  padding-top:0.5rem;
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
  :hover{
    
  }
  :active{
    background:white;;
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
  /* border:solid ${theme.BorderColor} 1px; */
  width:100%;
`
const LikeButton=styled.button`
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

export {Card, UserColumns,CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetInfo, RetweetButton, IconContainerRetweet, NameContainerRetweet};