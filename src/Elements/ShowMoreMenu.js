import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconMoreOptions} from '../img/more_icon.svg';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const IconMore=styled.div`
  position: absolute;
  right: 5px;
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
const OptionsCard =styled.div`
right:5px;
top:5px;
position:absolute;
border:solid ${theme.BorderColor} 1px;
width:30rem;
height:5rem;

`
const ShowMoreMenu = () => {
      const [showOptions, changeShowOptions] =useState(false)

      return ( 
            <>
            <IconMore Reply onClick={()=>{changeShowOptions(!showOptions)}}
                      onBlur={()=>changeShowOptions(false)} >
            <IconMoreOptions/>
            </IconMore>
            {showOptions &&
            <OptionsCard/>
            }   
            </>
       );
}
 
export default ShowMoreMenu;