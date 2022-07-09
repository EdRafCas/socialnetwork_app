import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconMoreOptions} from '../img/more_icon.svg';
import {ReactComponent as IconDelete} from '../img/delete_icon.svg';
import {ReactComponent as IconPin} from '../img/pin_icon.svg';
import {ReactComponent as IconBookmark} from '../img/bookmark_icon.svg';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconContainer } from './ElementsTimeline';

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
    background:rgb(29,155,240, 0.2);
    fill:black;
  }
`
const OptionsCard =styled.div`
  right:5px;
  top:2rem;
  position:absolute;
  border:solid ${theme.BorderColor} 1px;
  width:auto;
  height:auto;
  padding:5px;
  padding-right:15px;
  background:black;
  
`

const Option =styled.div`
  width:auto;
  gap:10px;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  cursor: pointer;
  :hover{
    background:rgba(255,255,255, 0.2);
    }
`


const ShowMoreMenu = () => {
      const [open, setOpen] =useState(false)

      
      const handleClick = () => {
        setOpen((prev) => !prev);
      };

      const handleClickAway = () => {
        setOpen(false);
      };


        {/* <>
            <IconMore Reply onClick={()=>{changeShowOptions(!showOptions)}}
                      onBlur={()=>changeShowOptions(false)} >
            <IconMoreOptions/>
            </IconMore>
            {showOptions &&
            <OptionsCard/>
            }   
            </> */}
      return ( 
        
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
            <div>
              <IconMore Reply>
                <IconMoreOptions type="button" onClick={handleClick}/>
              </IconMore>
              {open ? (
                <OptionsCard >
                  <Option>
                    <IconContainer>
                      <IconDelete/>
                    </IconContainer>
                    <p>Delete Tweet</p>
                  </Option>
                  <Option>
                    <IconContainer>
                      <IconPin/>
                    </IconContainer>
                    <p>Pin Tweet</p>
                  </Option>
                  <Option>
                    <IconContainer>
                      <IconBookmark/>
                    </IconContainer>
                    <p>Bookmark Tweet</p>
                  </Option>
                </OptionsCard>
              ) : null}
            </div> 

            
          </ClickAwayListener>  
        
        
       );
}
 
export default ShowMoreMenu;