import React from "react";
import { RetweetButton } from "../Elements/ElementsTimeline";




const receiveNotification = ({notification, changeShowPopUp, changePopUpAlert}) => {
  if(notification==="retweet"){
    changeShowPopUp(true)
    changePopUpAlert({type: "retweet"})
  } if(notification==="delete"){
    changeShowPopUp(true)
    changePopUpAlert({type: "delete"})
  }
}
 
export default receiveNotification;