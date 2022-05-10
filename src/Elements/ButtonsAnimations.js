import React, { useState } from "react";
import Heart from "react-animated-heart";
import styled from 'styled-components'

const Icon=styled.div`
display:flex;
height:10rem;
div{
     
}

`

const HeartFunction = () => {
      const [isClick, setClick] = useState(false);

      return ( 
      <Icon className="App">
            <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
      </Icon>  
       );
}
 
export default HeartFunction;


/* 
export default function HeartFuncion() {
  const [isClick, setClick] = useState(false);
  return (
    <div className="App">
      <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
    </div>
  );
} */