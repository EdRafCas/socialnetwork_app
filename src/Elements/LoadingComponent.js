import React from 'react';
import theme from '../Theme'
import styled from 'styled-components';
import loadingImage from '../img/loading.gif'

const LoadingDiv=styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
max-height:10rem;
overflow:hidden;
border:solid ${theme.BorderColor} 1px;
border-top:none;
border-right:solid ${theme.BorderColor} 1px;;
border-left:none;
img{
  height:100%;
  width:auto;
}
`

const LoadingComponent = () => {
      return (
        <LoadingDiv>
            <img src={loadingImage} alt="loading..." />
        </LoadingDiv>
      );
}
 
export default LoadingComponent;