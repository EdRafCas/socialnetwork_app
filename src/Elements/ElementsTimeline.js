import styled from 'styled-components'
import theme from '../Theme'

const Card =styled.div`
  display:grid;
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
  /* border-top:solid ${theme.BorderColor} 1px; */
  width:100%;
  max-height:6rem;
  padding-top:0.5rem;
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
  justify-content:flex-start;
  /* border:solid ${theme.BorderColor} 1px; */
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

export {Card, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton};