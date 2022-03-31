import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';


WebFont.load({
  google: {
    families: ['Montserrat', 'sans-serif']
  }
});

const Index = () => {
  return ( 
    
    <App/>
    
   
  );
}
 
ReactDOM.render( <Index />, document.getElementById('root')
);