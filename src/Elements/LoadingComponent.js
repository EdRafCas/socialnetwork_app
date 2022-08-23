import React from 'react';
import styled from 'styled-components';
import loadingImage from '../img/loading.gif'

const LoadingDiv=styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
max-height:10rem;
overflow:hidden;
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