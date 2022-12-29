import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'
import {LoadMoreButton,LoadMoreContainer} from '.././Elements/ElementsTimeline'




const LoadMore= ({ObtaineMoreMessages}) => {
  
      return ( 
        <LoadMoreContainer>
          <LoadMoreButton onClick= {() => ObtaineMoreMessages()}> <p>Load More</p></LoadMoreButton>
        </LoadMoreContainer>
       );
}
 
export default LoadMore;