import React, {useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme'
import { TranslucidBack, CenterBox } from './ElementsFormulary';
import { AuthContext } from '../Context/AuthContext';
import RemoveTweet from '../firebase/RemoveTweet';
import {UpdateProfilePinnedMessage} from '../firebase/UpdateProfile';

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

const PopUp = ({type, id, userId, changeStateAlert, changeAlert}) => {
        const {changeShowPopUp} =useContext(AuthContext);
        const {showPopUp} =useContext(AuthContext);
        const {popUpAlert} =useContext(AuthContext);
        const {changePopUpAlert} =useContext(AuthContext);
     

      return (
            <>
            {showPopUp ===true ?
            <>
            <TranslucidBack onClick={()=>changeShowPopUp(!showPopUp)} />
            <CenterBox>
                <ConfirmationBox>
                    {type ==="retweet" ?
                    <p>casa</p>
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
                                showPopUp})}>
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
                                showPopUp})}>
                                <p>Pin Message</p>
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
            </>
            :
            ""}
            </>
           
      );
}
 
export default PopUp;