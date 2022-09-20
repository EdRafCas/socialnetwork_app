import styled from 'styled-components'
import theme from '../Theme'

const InputContainer =styled.div`
  display:flex;
  height:auto;
  justify-content:center;
  flex-direction:row;
  gap:1rem;
`
const Formulary =styled.form`
  width:${(props)=> props.SignUpFormulary ? "80%" : "100%"};
  display:flex;
  flex-direction:column;
  align-items:center;
  align-self:center;
  height:auto;
  gap:1rem;
  border:${(props)=> props.LoginUpFormulary ? `solid ${theme.BorderColor} 1px` : "none"};
  /* border:solid ${theme.BorderColor} 1px; */
  padding:1rem 0rem;
`
const FormularyInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:100%;
  text-align:justify;
  /* border:solid ${theme.BorderColor} 1px; */
  height:${(props)=> props.Registration ? "3rem" 
                     : props.NameBox ? "4rem" 
                     : props.BioBox ? "7rem" 
                     :"3rem"};
  background:${(props)=> props.Registration ? "none"
                         : props.NameBox ? "none" 
                         : props.BioBox ? "none" 
                         : "auto"};
  color:${(props)=> props.Registration ? `${theme.Text}`
                    : props.Profile ? `${theme.Text}`
                    : props.NameBox ? `${theme.Text}`
                    : props.BioBox ? `${theme.Text}`
                    : "auto"};
  transition:none;
  z-index:100;
  :focus ~ span{
    
    top:1px;
    left:3px;
    font-size:11px;
    color:${theme.Text};
  }
  :focus::placeholder{
    transition:none;
    color:transparent;
  }
`
const ButtonContainer=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;
  width:6rem;
  gap:1rem;
  /* border:solid ${theme.BorderColor} 1px; */

`
const Button =styled.button`
  display:flex;
  height:3rem;
  width:6rem;
  border-radius:9999px;
  padding:0rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background:${theme.GradientBackround};
  p{
    font-size:1rem;
    font-weight:1000;
    color:white;
  }
  :hover{
    background:${(props)=> props.Logout ? `${theme.RedDark}`
                                        : `${theme.BluePinned}`};
  }
  :active{
    border:solid black 3px;
    p{
      color:black;
      
    }
  }
`
const ButtonDisabled =styled.button`
  display:flex;
  height:3rem;
  width:6rem;
  border-radius:9999px;
  padding:0rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background:${theme.GradientBackround};
  p{
    font-size:1rem;
    font-weight:1000;
    color:#000;
  }
`
const Button2 =styled.div`
  height:2.5rem;
  width:5rem;;
`

//ELEMENTS FROM CARDS
const PortraitContainer =styled.div`
  /* border: solid red 1px; */
  padding:0;
  width:100%;
  border-radius:50%;
  height:auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:3rem;
  height:3rem;
  flex-direction:column;
  overflow:hidden;
  img{
    width:100%;
  }
`
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1.1rem;
  font-weight:1000;
  color:white;
  overflow:hidden;
`

const AliasContainer = styled.p`
  /* border:solid ${theme.BorderColor} 1px; */
  color:${theme.Text};
`

/*Elements for background */
const TranslucidBack=styled.div`
  position:absolute;
  width:100%;
  height:100%;
  left:0%;
  top:0%;
  background:${theme.LightGrey};
  opacity:50%;
  z-index:100;
`
const CenterBox=styled.div`
  position:absolute;
  top:20%;
  left:40%;
  /* margin-top:-30rem;
  margin-left:-30rem;
  height:60rem;
  width:60rem;*/
  background:black; 
  border-radius:5%;
  z-index:101;
`
export {InputContainer, Formulary, FormularyInput, ButtonContainer, Button, Button2, ButtonDisabled, PortraitContainer, NameContainer, AliasContainer, TranslucidBack, CenterBox} ;