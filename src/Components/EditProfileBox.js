import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {FormularyInput}  from '../Elements/ElementsFormulary';
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_img.png'

const ContainerEditProfile=styled.div`
      position:absolute;
      display:flex;
      flex-direction:column;
      max-height:45rem;
      max-width:40rem;
      width:40rem;
      padding:2rem;
      border-radius:30px;
      border: solid ${theme.BorderColor} 1px;
      background:black;
`
const TopBar=styled.div`
      border: solid ${theme.BorderColor} 1px;
      min-height:3rem;
      padding-bottom:1rem;
      width:100%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;

`
const CloseWindow=styled.div`
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      height:2.5rem;
      width:2.5rem;
      font-size:1.2rem;
      color:white;
      /* border: solid ${theme.BorderColor} 1px; */
      padding:5px;
      text-decoration:none;
      border-radius:50%;
      :hover{
            background:rgba(91, 112, 131, 0.8);
      }
`

const FormularyBox =styled.form`
  width:${(props)=> props.SignUpFormulary ? "80%" : "100%"};
  display:flex;
  flex-direction:column;
  align-items:center;
  align-self:center;
  height:auto;
  gap:0rem;
  border:${(props)=> props.LoginUpFormulary ? `solid ${theme.BorderColor} 1px` : "none"};
  /* border:solid ${theme.BorderColor} 1px; */
  padding:1rem 0rem;
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
const Inputs=styled.div`
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      gap:1rem;
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
      const [nameEdit, changeNameEdit] =useState("")
      const [bioEdit, changeBioEdit] =useState("")

      useEffect(()=>{
            if(currentUserInfo){
                  changeNameEdit(currentUserInfo[0].name)
                  changeBioEdit(currentUserInfo[0].bio)
            }

      },[currentUserInfo]);

      const handleChange = (e) =>{
            switch(e.target.name){
                  case 'name':
                        changeNameEdit(e.target.value);
                        break;
                  case 'bio':
                        changeBioEdit(e.target.value);
                        break;
                  default:
                        break;
            }
      }

      return ( 
            <ContainerEditProfile>
            <FormularyBox>
                  <TopBar>
                        <CloseWindow>X</CloseWindow>
                        <div>2</div>
                  </TopBar>
                  <BackgroundImage>
                        <img alt="userbackground" src={Starboy}/>
                  </BackgroundImage>
                  <ProfilePicContainer>
                        <ProfilePic>
                              <img alt="userprofile" src={ProfileImage}/>
                        </ProfilePic>
                  </ProfilePicContainer>
                  <Inputs>
                        <InputContainer>
                        <FormularyInput NameBox
                                    type="text"
                                    name="name"
                                    value={nameEdit}
                                    placeholder="Name"
                                    onChange={handleChange}
                                    />
                                    {currentUserInfo[0].name ==="" ?
                                          <SpanInputInitial>Name</SpanInputInitial> :
                                          <SpanInputFinal>Name</SpanInputFinal>
                                    }  
                        </InputContainer>
                        <InputContainer>
                        <FormularyInput BioBox
                                    type="text"
                                    name="bio"
                                    value={bioEdit}
                                    placeholder="Bio"
                                    onChange={handleChange}
                                    />
                                    {currentUserInfo[0].bio ==="" ?
                                          <SpanInputInitial>Bio</SpanInputInitial> :
                                          <SpanInputFinal>Bio</SpanInputFinal>
                                    }  
                        </InputContainer>
                  </Inputs>
                  
            </FormularyBox> 
            </ContainerEditProfile>
       );
}
 
export default EditProfileBox;