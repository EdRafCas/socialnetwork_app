import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme'
import { TranslucidBack, CenterBox } from './ElementsFormulary';
import { AuthContext } from '../Context/AuthContext';
import RemoveTweet from '../firebase/RemoveTweet';
import {UpdateProfilePinnedMessage, RemoveTweetFromPinned, AddBookmarkToUser} from '../firebase/UpdateProfile';
import { addRetweetToTimeline } from '../firebase/AddRetweet';
import getUnixTime from 'date-fns/getUnixTime';
import { UpdateProfileRemovePinned } from '../firebase/UpdateProfile';
import MessageBoxComment from '../Components/MessageBoxComment';
import AddMessage from '../firebase/AddMessage';

const ConfirmationBox =styled.div`
    height:auto;
    width:400px;
`
const ContainerPopUp =styled.div`
    padding:3rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
`
const PopUpTitle=styled.p`
    font-size:1.5rem;
    font-weight:1000;
    color:#fff;
`
const PopUpText=styled.p`
    font-size:1.1rem;
`
const PopUpButtonContainer=styled.div`
    display:flex;
    height:4rem;
    width:100%;
    flex-direction:column;
    justify-content:flex-start;
    /* border:solid red 1px; */
`
const PopUpButtonDelete=styled.button`
    display:flex;
    height:100%;
    width:100%;
    border-radius:9999px;
    padding:1rem;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border:solid ${theme.BorderColor} 1px;
    background:${(props)=> props.Red ? `${theme.RedDelete}` 
    : "rgba(255,255,255, 0)"};
    p{
        font-size:1.2rem;
        font-weight:700;
        color:white;
        /* border:solid red 1px; */
    }
    :hover{
        background:${(props)=> props.Red ? `${theme.RedDeleteDark}` 
    : "rgba(255,255,255, 0.2)"};
    }
    :active{
        background:${(props)=> props.Red ? `rgb(195,26,37)` 
        : "rgba(255,255,255, 0.3)"}
    }
`
const PopUpButtonRetweet=styled.button`
    display:flex;
    height:100%;
    width:100%;
    border-radius:9999px;
    padding:1rem;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border:solid ${theme.BorderColor} 1px;
    background:${(props)=> props.Green ? `${theme.GreenRetweet}` 
    : "rgba(255,255,255, 0)"};
    p{
        font-size:1.2rem;
        font-weight:700;
        color:white;
        /* border:solid red 1px; */
    }
    :hover{
        background:${(props)=> props.Green ? "rgb(0, 186, 124, 0.8)"
    : "rgba(255,255,255, 0.2)"};
    }
    :active{
        background:${(props)=> props.Green ? `${theme.GreenRetweetBackground}` 
        : "rgba(255,255,255, 0.3)"}
    }
`
const PopUpButtonPin=styled.button`
    display:flex;
    height:100%;
    width:100%;
    border-radius:9999px;
    padding:1rem;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border:solid ${theme.BorderColor} 1px;
    background:${(props)=> props.Pinned ? `${theme.BlueReply}` 
    : "rgba(255,255,255, 0)"};
    p{
        font-size:1.2rem;
        font-weight:700;
        color:white;
        /* border:solid red 1px; */
    }
    :hover{
        background:${(props)=> props.Pinned ? `${theme.BluePinnedBackground}` 
    : "rgba(255,255,255, 0.2)"};
    }
    :active{
        background:${(props)=> props.Red ? `rgb(195,26,37)` 
        : "rgba(255,255,255, 0.3)"}
    }
`
const BackgroundBox=styled.div`
  position:absolute;
  width:100%;
  top:20%;
  left:00%;
  /* margin-top:-30rem;
  margin-left:-30rem;
  height:60rem;
  width:60rem;*/
  background:black; 
  z-index:101;
  display:flex;
  flex-direction:row;
  justify-content:center;
  img{
    height:40rem;
    width:auto;
    justify-content:center;
  }
`
const ProfilePictureBox=styled.div`
  position:absolute;
  width:auto;
  top:20%;
  /* margin-top:-30rem;
  margin-left:-30rem;
  height:60rem;
  width:60rem;*/
  z-index:101;
  display:grid;
  place-items:center;
  img{
    border-radius:50%;
    height:30rem;
    width:30rem;
    justify-content:center;
  }
`
const CloseWindow=styled.div`
    position:fixed;
    top:2.5rem;
    left:2.5rem;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    height:2.5rem;
    width:2.5rem;
    font-size:1.2rem;
    color:white;
    /* border: solid ${theme.BorderColor} 1px; */
    padding:5px;
    text-decoration:none;
    border-radius:50%;
    z-index:103;
    cursor:default;
    :hover{
        background:rgba(91, 112, 131, 0.8);
    }
`


const PopUp = ({type, id, userId, changeStateAlert, changeAlert, originalUidUser, retweets, user, currentUserInfo, bookmarks, backgroundPicture,profilePicture, messageForTimeline,messageMessage}) => {
    const [message, messageChange] = useState('');
    const {changeShowPopUp} =useContext(AuthContext);
    const {showPopUp} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);

    const handleChange = (e) =>{
        if(e.target.name==="message"){
          messageChange(e.target.value)
        }
    };

    const addToTimeline = (e) =>{
    e.preventDefault();
    if(message !==""){
        AddMessage({
        message:message,
        uidUser: currentUserInfo[0].uidUser,
        name:currentUserInfo[0].name,
        alias:currentUserInfo[0].alias,
        date: getUnixTime(new Date())
    })
    .then(()=>{
        messageChange("");
        changeStateAlert(true);
        changeAlert({
            type:'success',
            message: 'Your message was sent successfully'
        })
    })
    .catch((error)=>{
        changeStateAlert(true);
        changeAlert({
            type:'error',
            message: 'An error ocurred while sending your message'
        })
    }) 
    }

    };



    return (
        <>
        {showPopUp ===true ?
        <>
        <TranslucidBack onClick={()=>changeShowPopUp(!showPopUp)} />
        <CloseWindow onClick={()=>changeShowPopUp(false)} >X</CloseWindow>
        <CenterBox>
            <ConfirmationBox>
                {type ==="retweet" ?
                <ContainerPopUp>
                    <PopUpTitle>Add Retweet?</PopUpTitle>
                    <PopUpText>you Will Re-post this message and will be visible in your timeline</PopUpText>
                    <PopUpButtonContainer>
                        <PopUpButtonRetweet Green onClick={()=>addRetweetToTimeline({
                        update,
                        changeUpdate,
                        changeAlert,
                        changeStateAlert,
                        id,
                        retweets, 
                        originalUidUser, 
                        user, 
                        currentUserInfo, 
                        changeShowPopUp,
                        showPopUp,
                        date: getUnixTime(new Date())})}>
                            <p>Retweet</p>
                        </PopUpButtonRetweet>
                    </PopUpButtonContainer>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete  onClick={()=>changeShowPopUp(false)}>
                            <p>Cancel</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                </ContainerPopUp>
                :type ==="unPin" ?
                <ContainerPopUp>
                    <PopUpTitle>Delete Message?</PopUpTitle>
                    <PopUpText>This action can't be undone, your message  will be removed from all timelines.</PopUpText>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete Pinned onClick={()=>UpdateProfileRemovePinned({
                            changeStateAlert, 
                            changeAlert,
                            id,
                            userId, 
                            changeShowPopUp, 
                            showPopUp,
                            update,
                            changeUpdate})}>
                            <p>Remove Pinned</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete  onClick={()=>changeShowPopUp(false)}>
                            <p>Cancel</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                </ContainerPopUp>
                :type ==="delete" ?
                <ContainerPopUp>
                    <PopUpTitle>Delete Message?</PopUpTitle>
                    <PopUpText>This action can't be undone, your message  will be removed from all timelines.</PopUpText>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete Red onClick={()=>RemoveTweet({
                            changeStateAlert, 
                            changeAlert,
                            id, 
                            changeShowPopUp, 
                            showPopUp,
                            update,
                            changeUpdate})}>
                            <p>Delete</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete  onClick={()=>changeShowPopUp(false)}>
                            <p>Cancel</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                </ContainerPopUp>
                :type ==="deleteAndRemove" ?
                <ContainerPopUp>
                    <PopUpTitle>Delete Message?</PopUpTitle>
                    <PopUpText>This action can't be undone, your message  will be removed from all timelines.</PopUpText>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete Red onClick={()=>RemoveTweetFromPinned({
                            changeStateAlert, 
                            changeAlert,
                            id,
                            userId, 
                            changeShowPopUp, 
                            showPopUp,
                            update,
                            changeUpdate})}>
                            <p>Delete</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete  onClick={()=>changeShowPopUp(false)}>
                            <p>Cancel</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                </ContainerPopUp>
                :type ==="pinned" ?
                <ContainerPopUp>
                    <PopUpTitle>Pin this Message?</PopUpTitle>
                    <PopUpText>If you pin this message it will be shown at the top of your profile.</PopUpText>
                    <PopUpButtonContainer>
                        <PopUpButtonPin Pinned onClick={()=>UpdateProfilePinnedMessage({
                            changeStateAlert, 
                            changeAlert,
                            id,
                            userId, 
                            changeShowPopUp, 
                            showPopUp,
                            update,
                            changeUpdate})}>
                            <p>Pin Message</p>
                        </PopUpButtonPin>
                    </PopUpButtonContainer>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete onClick={()=>changeShowPopUp(false)}>
                            <p>Cancel</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                </ContainerPopUp>
                :type ==="bookmark" ?
                <ContainerPopUp>
                    <PopUpTitle>Add to bookmarks?</PopUpTitle>
                    <PopUpText>This message will be added to your Boomark list (we won't notify the creator).</PopUpText>
                    <PopUpButtonContainer>
                        <PopUpButtonPin Pinned onClick={()=>AddBookmarkToUser({
                            changeStateAlert, 
                            changeAlert,
                            id,
                            userId, 
                            bookmarks,
                            changeShowPopUp, 
                            showPopUp})}>
                            <p>Bookmark Message</p>
                        </PopUpButtonPin>
                    </PopUpButtonContainer>
                    <PopUpButtonContainer>
                        <PopUpButtonDelete onClick={()=>changeShowPopUp(false)}>
                            <p>Cancel</p>
                        </PopUpButtonDelete>
                    </PopUpButtonContainer>
                </ContainerPopUp>
                :""}
            </ConfirmationBox>
        </CenterBox>
        { type ==="backgroundPicture" &&
        <BackgroundBox>
            <img alt="userbackground" src={backgroundPicture}/>
        </BackgroundBox>
        }
        { type ==="profilePicture" &&
        <ProfilePictureBox>
            <img alt="userbackground" src={profilePicture}/>
        </ProfilePictureBox>
        }
        { type ==="comment" &&
        <MessageBoxComment 
            messageMessage={messageMessage}
            id={id}
            originalUidUser={originalUidUser}
            messageForTimeline={messageForTimeline}
            user={user}
            currentUserInfo={currentUserInfo}
            message={message}
            handleChange={handleChange}
            changeStateAlert={changeStateAlert} 
            changeAlert={changeAlert}
            changeShowPopUp={changeShowPopUp}  /> 
        }
        </>
        :
        ""}
        </>
           
      );
}
 
export default PopUp;