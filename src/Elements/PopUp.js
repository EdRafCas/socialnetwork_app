import React, {useEffect, useContext} from 'react';
import styled, {keyframes} from 'styled-components';
import theme from '../Theme'
import { TranslucidBack, CenterBox } from './ElementsFormulary';
import { AuthContext } from '../Context/AuthContext';

    const ConfirmationBox =styled.div`
        height:100px;
        width:100px;
    `

const PopUp = () => {
        const {changeShowPopUp} =useContext(AuthContext);
        const {showPopUp} =useContext(AuthContext);
     

      return (
            <>
            {showPopUp ===true ?
            <>
            <TranslucidBack onClick={()=>changeShowPopUp(!showPopUp)} />
            <CenterBox>
                <ConfirmationBox>
                    <p>hi</p>
                </ConfirmationBox>
            </CenterBox>
            </>
            :
            ""}
            </>
           
      );
}
 
export default PopUp;