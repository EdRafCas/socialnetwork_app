import React, {useEffect, useContext} from 'react';
import styled, {keyframes} from 'styled-components';
import theme from '../Theme'
import { TranslucidBack, CenterBox } from './ElementsFormulary';
import { AuthContext } from '../Context/AuthContext';

    const ConfirmationBox =styled.div`
        height:400px;
        width:400px;
    `
    const DeletePopUp =styled.div`
    display:flex;
    flex-direction:column;
    
    `

const PopUp = ({type}) => {
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
                    {popUpAlert.type ==="retweet" ?
                    <p>casa</p>
                    :popUpAlert.type ==="delete" ?
                    <DeletePopUp>
                        <p>Delete Message?</p>
                        <p>This action can't be undone, it will be removed from all timelines.</p>
                        <button>Delete</button>
                        <button>Cancel</button>
                    </DeletePopUp>
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