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
  border:${(props)=> props.LoginUpFormulary ? "none" : "none"};
  /* border:solid ${theme.BorderColor} 1px; */
  padding:1rem 0rem;
`
const FormularyInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:100%;
  text-align:justify;
  font-size:1rem;
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
  @media(max-width: 760px){ 
            font-size:0.8rem;
            height:${(props)=> props.Registration ? "2rem" 
                     : props.NameBox ? "4rem" 
                     : props.BioBox ? "7rem" 
                     :"3rem"};
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
  @media(max-width: 760px){ 
    height:2.5rem;
    width:4rem;
    border:none;
    p{
      font-size:0.9rem;
      font-weight:1000;
      color:#fff;
      
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
  border:none;
  p{
    font-size:1rem;
    font-weight:1000;
    color:#000;
  }
  @media(max-width: 760px){ 
    height:2.5rem;
    width:4rem;
    p{
      font-size:0.9rem;
      font-weight:1000;
      color:#000;
  }
}
`
const Button2 =styled.div`
  height:2.5rem;
  width:5rem;;
`
const CounterLeft =styled.div`
  display:flex;
  height:3rem;
  width:3rem;
  border-radius:9999px;
  padding:0rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background:${theme.GradientBackround};
  p{
        font-size:1rem;
        font-weight:1000;
        color:#fff;
  }
  @media(max-width: 760px){ 
    height:2.5rem;
    width:2.5rem;
    border:none;
    p{
          font-size:0.8rem;
          font-weight:1000;
    }
  }
`
const CounterExcess =styled.div`
      display:flex;
      height:3rem;
      width:3rem;
      border-radius:9999px;
      padding:0rem;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:${theme.GradientBackround};
            p{
                  font-size:1rem;
                  font-weight:1000;
                  color:${theme.RedAlert};
            }
      @media(max-width: 760px){ 
      height:2.5rem;
      width:2.5rem;
      border:none;
      p{
            font-size:0.9rem;
            font-weight:1000;
      }
}
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
  min-height:3rem;
  height:3rem;
  flex-direction:column;
  overflow:hidden;
  img{
    width:100%;
    min-width:12px;
  }
  @media(max-width: 760px){ 
    width:2rem;
    min-height:2rem;
    height:2rem;
  }
  
`
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1.1rem;
  font-weight:1000;
  color:white;
  overflow:hidden;
  :hover{
    text-decoration:underline;
  }
  @media(max-width: 760px){ 
    font-size:1rem;
  }
`

const AliasContainer = styled.p`
  /* border:solid ${theme.BorderColor} 1px; */
  color:${theme.Text};
  @media(max-width: 760px){ 
    font-size:0.8rem;
  }
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
  top:50%;
  left:50%;
  margin-top:-200px;
  margin-left:-200px;
  height:400px;
  width:400px;
  background:#000;
 /*  background:${(props)=> props.Picture ? `none`
                                      : `#000`}; */
  border-radius:5%;
  z-index:101;
  @media(max-width: 760px){ 
    height:auto;
    width:350px;
    margin-top:-175px;
    margin-left:-175px;
    font-size:0.9rem;
  }
`
const CenterBoxComment=styled.div`
      position:absolute;
      max-width:700px;
      /* width:700px; */
      top:50%;
      left:50%;
      margin-top:-350px;
      margin-left:-350px;
      padding:2rem 2rem;
      background:black; 
      border-radius:5%;
      z-index:101;
      @media(max-width: 760px){ 
            height:auto;
            width:500px;
            margin-top:-250px;
            margin-left:-250px;
            font-size:0.9rem;
            padding:0.5rem 1rem;
      }
      @media(max-width: 550px){ 
            height:auto;
            width:350px;
            margin-top:-175px;
            margin-left:-175px;
            font-size:0.9rem;
            padding:0.5rem 1rem;
      }
`
const ConfirmationBox =styled.div`
  /* border:solid red 1px; */
  padding:1rem;
    @media(max-width: 760px){ 
      padding:0.5rem;
  }
`
const PopUpTitle=styled.p`
  font-size:1.5rem;
  font-weight:1000;
  color:#fff;
  @media(max-width: 760px){ 
    font-size:1rem;
  }
`

const ContainerPopUp =styled.div`
  padding:1.5rem;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:1rem;
  /* border:solid red 1px; */
  @media(max-width: 760px){ 
   padding:1rem;
  }
    
`
const PopUpText=styled.p`
    font-size:1.1rem;
    color: ${theme.Text};
    /* border:solid red 1px; */
    padding:0rem 0.5rem;
    @media(max-width: 760px){
      font-size:0.9rem;
    }
`
const PopUpButtonContainer=styled.div`
    display:flex;
    height:4rem;
    width:100%;
    flex-direction:row;
    justify-content:center;
    /* border:solid red 1px; */
    @media(max-width: 760px){
      height:2rem;
    }
`
const CloseWindowSmall=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    height:2.5rem;
    width:2.5rem;
    font-size:1rem;
    color:${theme.Text};
    /* border: solid ${theme.BorderColor} 1px; */
    padding:10px;
    margin-bottom:5px;
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
export {InputContainer, Formulary, FormularyInput, ButtonContainer, Button, Button2, ButtonDisabled, CounterLeft,CounterExcess,PortraitContainer, NameContainer, AliasContainer, TranslucidBack, CenterBox,PopUpTitle, ConfirmationBox, ContainerPopUp, PopUpText, PopUpButtonContainer,CenterBoxComment, CloseWindowSmall } ;