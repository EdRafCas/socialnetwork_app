import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme'
import { TranslucidBack, CenterBox, PopUpTitle, ConfirmationBox, ContainerPopUp, PopUpText, PopUpButtonContainer} from './ElementsFormulary';
import { AuthContext } from '../Context/AuthContext';
import RemoveTweet from '../firebase/RemoveTweet';
import RemoveComment from '../firebase/RemoveComment';
import {UpdateProfilePinnedMessage, RemoveTweetFromPinned, AddBookmarkToUser} from '../firebase/UpdateProfile';
import { addRetweetToTimeline } from '../firebase/AddRetweet';
import getUnixTime from 'date-fns/getUnixTime';
import { UpdateProfileRemovePinned } from '../firebase/UpdateProfile';
import MessageBoxComment from '../Components/MessageBoxComment';



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
    @media(max-width: 760px){
        width:fit-content;
        min-width:180px;
        padding:0.5rem;
        p{
            font-size:1rem;
        }
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
    @media(max-width: 760px){
        width:fit-content;
        min-width:180px;
        padding:0.5rem;
        p{
            font-size:1rem;
        }
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
    @media(max-width: 760px){
        width:fit-content;
        min-width:180px;
        padding:0.5rem;
        p{
            font-size:1rem;
        }
    }
`
const BackgroundBox=styled.div`
  position:absolute;
  width:100%;
  top:20%;
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
  @media(max-width: 1240px){
    img{
    height:20rem;
    width:auto;
    justify-content:center;
    }
  }
  @media(max-width: 760px){
    img{
    height:10rem;
    width:auto;
    justify-content:center;
  }
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
  background:none;
  z-index:101;
  display:grid;
  place-items:center;
  img{
    border-radius:50%;
    height:30rem;
    width:30rem;
    justify-content:center;
  }
  @media(max-width: 760px){ 
    img{
    height:10rem;
    width:10rem;
  }
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
const CloseWindowSmall=styled.div`
   
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
    @media(max-width: 760px){ 
            font-size:0.9rem;
            height:2rem;
            width:2rem;
      }
      @media(max-width: 550px){ 
            font-size:0.8rem;
      
      }
`

const PopUp = ({type, id, userId, changeStateAlert, changeAlert, originalUidUser, originalId, originalMessageComments, comments, retweets, user, currentUserInfo, bookmarks, backgroundPicture,profilePicture, messageForTimeline,messageMessage}) => {
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

    return (
        <>
        {showPopUp ===true ?
        <>
        <TranslucidBack onClick={()=>changeShowPopUp(!showPopUp)} />
        {type ==="retweet" ?
        <CenterBox>
            <ConfirmationBox>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
            <ContainerPopUp>
                    <PopUpTitle>Add Retweet?</PopUpTitle>
                    <PopUpText>You Will Re-post this message and will be visible in your timeline</PopUpText>
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
            </ConfirmationBox>
        </CenterBox>
        :type ==="unPin" ?
        <CenterBox>
            <ConfirmationBox>
                <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
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
            </ConfirmationBox>
        </CenterBox>
        :type ==="delete" ?
        <CenterBox>
            <ConfirmationBox>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
            <ContainerPopUp>
            <PopUpTitle>Delete Comment?</PopUpTitle>
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
            </ConfirmationBox>
        </CenterBox>
        :type ==="deleteComment" ?
        <CenterBox>
            <ConfirmationBox>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
            <ContainerPopUp>
            <PopUpTitle>Delete Comment?</PopUpTitle>
            <PopUpText>This action can't be undone, your message  will be removed from all timelines.</PopUpText>
            <PopUpButtonContainer>
                <PopUpButtonDelete Red onClick={()=>RemoveComment({
                    changeStateAlert, 
                    changeAlert,
                    id, 
                    originalId,
                    originalUidUser,
                    originalMessageComments,
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
            </ConfirmationBox>
        </CenterBox>
        :type ==="deleteAndRemove" ?
        <CenterBox>
            <ConfirmationBox>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
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
            </ConfirmationBox>
        </CenterBox>
        :type ==="pinned" ?
        <CenterBox>
            <ConfirmationBox>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
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
            </ConfirmationBox>
        </CenterBox>  
        :type ==="bookmark" ?
        <CenterBox>
            <ConfirmationBox>
            <CloseWindowSmall onClick={()=>changeShowPopUp(false)} >X</CloseWindowSmall>
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
            </ConfirmationBox>
        </CenterBox> 
        :type ==="backgroundPicture" &&
        <>
        <CloseWindow onClick={()=>changeShowPopUp(false)} >X</CloseWindow>
        <BackgroundBox>
            <img alt="userbackground" src={backgroundPicture}/>
        </BackgroundBox>
        </>
        }
        { type ==="profilePicture" &&
        <>
        <CloseWindow onClick={()=>changeShowPopUp(false)} >X</CloseWindow>
        <ProfilePictureBox>
            <img alt="user profile" src={profilePicture}/>
        </ProfilePictureBox>
        </>
        }
        { type ==="comment" &&
        <MessageBoxComment 
            messageMessage={messageMessage}
            id={id}
            originalUidUser={originalUidUser}
            messageForTimeline={messageForTimeline}
            user={user}
            currentUserInfo={currentUserInfo}
            comments={comments}
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