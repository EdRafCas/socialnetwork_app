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
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
  padding:1rem;

`
const FormularyInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
  height:3rem;
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