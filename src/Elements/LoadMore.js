import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'

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
  flex-direction:column;
  align-items:center;
  justify-content:center;
 /*  border-bottom:solid ${theme.BorderColor} 1px;
  border-right:solid ${theme.BorderColor} 1px;
  border-left:solid ${theme.BorderColor} 1px; */
  padding:0.5rem 0.5rem;
`


const LoadMore= ({ObtaineMoreMessages}) => {
  
      return ( 
        <LoadMoreContainer>
          <LoadMoreButton onClick= {() => ObtaineMoreMessages()}> <p>Load More</p></LoadMoreButton>
        </LoadMoreContainer>
       );
}
 
export default LoadMore;