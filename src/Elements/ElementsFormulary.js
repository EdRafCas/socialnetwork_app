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
  display:flex;
  flex-direction:column;
  align-items:center;
  height:auto;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
  padding:1rem;


`
const FormularyInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  text-align:left;
  /* border:solid ${theme.BorderColor} 1px; */
  height:${(props)=> props.Registration ? "3rem" : "3rem"};
  background:${(props)=> props.Registration && "none"};
  color:${(props)=> props.Registration && `${theme.Text}`};
  transition:0.4s all ease;
  z-index:100;

 
  p{
    text-align
  }
 
  :focus{
    padding-top:1rem
    font-size:14px;
    
  }
`
const PasswordInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`
const EmailInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`
 
export {InputContainer, Formulary, FormularyInput, PasswordInput} ;