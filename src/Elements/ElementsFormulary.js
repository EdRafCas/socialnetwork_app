import styled from 'styled-components'
import theme from '../Theme'

const InputContainer =styled.div`
  display:flex;
  height:3rem;
  justify-content:center;
  flex-direction:row;
  gap:1rem;

`
const LoginForm =styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
  padding:1rem;

`
const UsernameInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`
const PasswordInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`
 
export {InputContainer, LoginForm, UsernameInput, PasswordInput} ;