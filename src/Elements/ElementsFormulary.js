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
  /* border:solid ${theme.BorderColor} 1px; */
  padding:1rem 0rem;
`
const FormularyInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:100%;
  text-align:left;
  /* border:solid ${theme.BorderColor} 1px; */
  height:${(props)=> props.Registration ? "3rem" : "3rem"};
  background:${(props)=> props.Registration && "none"};
  color:${(props)=> props.Registration && `${theme.Text}`};
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
  width:15rem;
  gap:1rem;
  /* border:solid ${theme.BorderColor} 1px; */

`
const Button =styled.button`
  height:2.5rem;
  width:5rem;;
`


 
export {InputContainer, Formulary, FormularyInput, ButtonContainer, Button} ;