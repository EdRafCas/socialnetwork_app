import React from 'react';

const addToTimeline = (e) =>{
      e.preventDefault();
      if(timeline.length>0){
        const newTimeline = [...timeline];
        newTimeline.unshift(
          { 
            id:3,
            profilePicture:ProfileImage,
            username:"username",
            alias:"alias",
            message:message
          });
        changeTimeline(newTimeline);
        console.log(timeline)
      } 
    };

 
export default addToTimeline;