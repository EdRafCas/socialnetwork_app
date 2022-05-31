import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Formulary, FormularyInput}  from '../Elements/ElementsFormulary';
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_img.png'

const ContainerEditProfile=styled.div`
      position:absolute;
      display:flex;
      flex-direction:column;
      border-radius:30px;
      padding:1rem;
      border: solid ${theme.BorderColor} 1px;
      width:40rem;
      height:40rem;
      max-height:40rem;
      max-width:40rem;
      background:black;

`
const BackgroundImage =styled.div`
      border:solid red 1px;
      overflow:hidden;
      height:auto;
            img{
            max-width:50rem;
            width:100%;
            overflow:hidden;
            }
`
const ProfilePicContainer=styled.div`
      display:flex;
      width:100%;
      height:5rem;    
      position: relative;
      border: solid red 1px;
`
const ProfilePic =styled.div`
      border: solid red 1px;
      position: absolute;
      top:-4rem;
      left:1rem;
      padding:0;
      border-radius:50%;
      height:auto;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      width:8rem;
      flex-direction:column;
      overflow:hidden;
      img{
      width:100%;
      }
`
const InputContainer=styled.div`
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      gap:1rem;
`
const SpanInputInitial =styled.span`
      position:absolute;
      font-size:1rem;
      pointer-events:none;
      transition: none;
      color:transparent;
      left:3px;
      top:1px;       
`
const SpanInputFinal =styled.span`
      position:absolute;
      font-size:11px;
      pointer-events:none;
      transition: 0.2s ease all;
      left:3px;
      top:1px;
      color:${theme.Text};  
`

const EditProfileBox = ({currentUserInfo}) => {
      const [username, changeUsername] =useState()
      const [bio, changeBio] =useState()

      const handleChange = (e) =>{
            switch(e.target.username){
                  case 'username':
                        changeUsername(e.target.value);
                        break;
                  default:
                        break;
            }
      }

      return ( 
            <ContainerEditProfile>
                  <BackgroundImage>
                  <img alt="userbackground" src={Starboy}/>
                </BackgroundImage>
                <ProfilePicContainer>
                  <ProfilePic>
                        <img alt="userprofile" src={ProfileImage}/>
                  </ProfilePic>
                </ProfilePicContainer>
                  <Formulary>
                        <InputContainer>
                        <FormularyInput Registration
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="Username"
                                    onChange={handleChange}
                                    />
                                    {username ==="" ?
                                          <SpanInputInitial>Name</SpanInputInitial> :
                                          <SpanInputFinal>Name</SpanInputFinal>
                                    }  
                        </InputContainer>
                        <InputContainer>
                        <FormularyInput Registration
                                    type="text"
                                    name="username"
                                    value={bio}
                                    placeholder="Username"
                                    onChange={handleChange}
                                    />
                                    {bio ==="" ?
                                          <SpanInputInitial>Bio</SpanInputInitial> :
                                          <SpanInputFinal>Bio</SpanInputFinal>
                                    }  
                        </InputContainer>
                  </Formulary>
                  
            </ContainerEditProfile>
       );
}
 
export default EditProfileBox;