import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {FormularyInput}  from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {ReactComponent as IconAddPhoto} from '../img/addphoto_icon.svg';
import {ReactComponent as IconDeleteImage} from '../img/x_icon.svg';
import {UpdateProfileNoImage, UpdateProfileImage, UpdateProfileImageBackground, UpdateProfileImageOnlyBackground, UpdateProfileImages, UpdateProfileDeleteBackground} from '../firebase/UpdateProfile';


const ContainerEditProfile=styled.div`
      position:absolute;
      top:50%;
      left:50%;
      margin-top:-350px;
      margin-left:-300px;
      height:700px;
      width:600px;
      background:#000;
      /*  background:${(props)=> props.Picture ? `none`
                                          : `#000`}; */
      border-radius:5%;
      z-index:101;
      @media(max-width: 760px){ 
      height:auto;
      width:350px;
      margin-top:-100px;
      margin-left:-175px;
      font-size:0.9rem;
      }
`
const TopBar=styled.div`
      /* border: solid ${theme.BorderColor} 1px; */
      min-height:3rem;
      padding-bottom:1rem;
      padding-left:5px;
      padding-right:5px;
      padding-top:5px;
      width:100%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      @media(max-width: 760px){ 
            min-height:2rem;
            padding-bottom:0.5rem;
      }

`
const CloseWindow=styled.div`
      top:2.5rem;
      left:2.5rem;
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
  padding:1rem 1rem;
`
const BackgroundImageContainer =styled.div`
      position:relative;
      /* border:solid blue 1px; */
      overflow:hidden;
      justify-content:center;
      width:100%;
      height:auto;
      max-height:20rem;
      min-height:10rem;
            img{
            opacity:0.8;
            max-width:50rem;
            width:100%;
            overflow:hidden;
            }
`
const BackgroundInner=styled.div`
     /*  position:relative; */
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      margin:auto;
      width:100%;
      /* border:solid red 1px; */
      overflow:hidden;
      img{
            
            width:100%;
      }
`

const BackgroundImage=styled.img`
      min-height:10rem;
      /* border:1px solid white; */
      /* opacity:0.8;
      width:100%;
      overflow:hidden;
      max-width:50rem; */
`

const ProfilePicContainer=styled.div`
      display:flex;
      width:100%;
      height:5rem;    
      position: relative;
      /* border: solid red 1px; */
`
const ProfilePic =styled.div`
      position:relative;
      border: solid #000 3px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      flex-direction:column;
      margin-top:-4rem;
      margin-left:1.2rem;
      width:8rem;
      height:8rem;
      border-radius:50%;
      opacity:0.8;
      overflow:hidden;
      
`
const IconContainerProfile=styled.div`
      position:absolute;
      top:50%;
      left:50%;
      margin-left:-1.5rem;
      margin-top:-1.5rem;
      display:flex;
      align-items:center;
      justify-content:center;
      height:3rem;
      width:3rem;
      border-radius:50%;     
      border:1px solid #fff;
      fill:#000;
      background:${theme.BorderColor};
      opacity:0.8;
      :hover{
            opacity:1;
               
      }
      svg{
            max-height:3rem;
            
            fill:${theme.Text};     
      }
      :active{
            opacity:0.5;
            fill:black;
      }
`
const IconContainerBackground=styled.div`
      display:flex;
      flex-direction;
      align-items:center;
      justify-content:center;
      height:3rem;
      width:3rem;
      border-radius:50%;     
      /* border:1px solid white; */
      fill:#000;
      background:${theme.BorderColor};
      opacity:0.7;
      :hover{
            opacity:1;
               
      }
      svg{
            max-height:3rem;
            
            fill:${theme.Text};     
      }
      :active{
            opacity:0.5;
            fill:black;
      }
      @media(max-width: 760px){ 
            height:2.5rem;
            width:2.5rem;
            svg{
                  max-height:2.5rem;
                  fill:${theme.Text};     
            }
      }
`

const ContainerIcons=styled.div`
      position: absolute;
      top:40%;
      gap:2rem;
      display:flex;
      flex-direction:row
      align-items:center;
      justify-content:center;
      /* border:1px solid red; */
      @media(max-width: 760px){ 
            gap:1rem;

      }
`

const Inputs=styled.div`
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      padding-top:1rem;
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      gap:1rem;
`
const InputContainer=styled.div`
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content: flex-start;
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
      @media(max-width: 760px){ 
            font-size:0.8rem;
      }    
`
const SpanInputFinal =styled.span`
      position:absolute;
      font-size:11px;
      pointer-events:none;
      transition: 0.2s ease all;
      left:3px;
      top:1px;
      color:${theme.Text};  
      @media(max-width: 760px){ 
            font-size:9px;
      }    
`
const EditButton=styled.button`
      display:flex;
      height:3rem;
      width:6rem;
      border-radius:9999px;
      padding:0rem;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:#fff;
      cursor:default;
            p{
            font-size:1rem;
            font-weight:1000;
            color:#000;
                  }
      :hover{
            
            background:${theme.Text}};
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
            p{
                  font-size:0.9rem;
                  font-weight:1000;
                  color:#000;
                        }
      }

`
const Inputest=styled.input`
      display:none;
`
const ImageHolder=styled.img`
      width:100%;
`
const BackgroundImageBlank=styled.div`
      height:10rem;
      width:100%;
      background:#000;
`
const MessageUser =styled.textarea`
      padding-left:5px;
      border-radius:5px;
      width:100%;
      text-align:justify;
      font-size:1rem;
      /* border:solid ${theme.BorderColor} 1px; */
      height:6rem;
      background:none;
      color:${theme.Text};
      transition:none;
      z-index:100;
      padding-top:1rem;
      overflow:scroll;
      text-align:justify;
      white-space:normal;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      outline:none;   
      :focus ~ span{
            top:1px;
            left:3px;
            font-size:9px;
      }
      :focus ~ .spanFinal{
            color:${theme.Text} 
      }
      :focus ~ .bottomSpan{
            top:auto;
            left:auto;
            bottom:5px;
            right:5px;
      }
      :focus::placeholder{
            transition:none;
            color:transparent;
      }
      
      @media(max-width: 760px){ 
            font-size:0.8rem;
            height:6rem;
      }     
`
const InputContainerFormulary =styled.div`
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content: flex-start;
      align-items:center;
      gap:1rem;
      

`
const SpanCounterBottom =styled.span`
      position:absolute;
      font-size:11px;
      pointer-events:none;
      transition: 0.2s ease all;
      right:5px;
      bottom:5px;
      color:${(props)=> props.RED ? `${theme.RedAlert}` 
                     :`${theme.Text}`};  
      @media(max-width: 760px){ 
            font-size:9px;
      }    
`


const EditProfileBox = ({user, currentUserInfo, changeShowEditProfile, showEditProfile, changeAlert, changeStateAlert}) => {
      const [nameEdit, changeNameEdit] =useState("")
      const [bioEdit, changeBioEdit] =useState("")
      const [selectedImage, changeSelectedImage] =useState(null);
      const [selectedImageBackground, changeSelectedImageBackground] =useState(null);
      const [removingBackground, changeRemovingBackground] =useState(false);

      const [loading, changeLoading] =useState(false);      

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

      const handlesubmitEdit =async(e)=>{
            e.preventDefault();
            changeShowEditProfile(!showEditProfile);
                  if(nameEdit.length >20){
                        changeStateAlert(true);
                        changeAlert({
                              type:'error',
                              message: "your name can't be longer than 20 characters"
                        })
                        return;
                  }
                  if(bioEdit.length > 200){
                        changeStateAlert(true);
                        changeAlert({
                              type:'error',
                              message: "your bio can't be longer than 20 characters"
                        })
                        return;
                  }
                  if(selectedImageBackground && selectedImage == null){
                        console.log("Only Background")
                        try{
                              await UpdateProfileImageBackground({
                                          file:selectedImageBackground,
                                          user:user,
                                          changeLoading, 
                                          id:currentUserInfo[0].id,
                                          newName:nameEdit,
                                          newBio:bioEdit})
                        } catch(error){
                              console.log(error+"error UpdateProfileImageBackground")
                        }                                   
                  } 
                  if (selectedImage && selectedImageBackground == null && removingBackground === false){
                        console.log("only profile")
                        try{
                              await UpdateProfileImage({
                                          file:selectedImage,
                                          user:user,
                                          changeLoading, 
                                          id:currentUserInfo[0].id,
                                          newName:nameEdit,
                                          newBio:bioEdit})
                        } catch(error){
                              console.log(error+"error UpdateProfile")
                        }           
                  }
                  if (selectedImage && removingBackground && selectedImageBackground == null ){
                        console.log("only profile and deleting background")
                        try{
                              await UpdateProfileDeleteBackground({
                                    file:selectedImage,
                                    user:user,
                                    changeLoading, 
                                    id:currentUserInfo[0].id,
                                    newName:nameEdit,
                                    newBio:bioEdit})
                        } catch(error){
                              console.log(error+"error UpdateProfile")
                        }           
                  }
                  if (selectedImage && selectedImageBackground){
                        console.log("uploading both images")
                        try{
                              await UpdateProfileImages({
                                          file:selectedImage,
                                          fileBackground:selectedImageBackground,
                                          user:user,
                                          changeLoading, 
                                          id:currentUserInfo[0].id,
                                          newName:nameEdit,
                                          newBio:bioEdit});
                        } catch(error){
                              console.log("error uploading both images")
                        }
                  } 
                  if (selectedImage==null && selectedImageBackground==null) { 
                        await UpdateProfileNoImage({
                                    id:currentUserInfo[0].id,
                                    newName:nameEdit,
                                    newBio:bioEdit})
                        console.log("none selected")
                  }
            /* changeShowEditProfile(!showEditProfile); */
            console.log("Finished changes, closing window")
      }

      const handleImageChange = (e) => {
            if (e.target.files && e.target.files.length > 0){
                  changeSelectedImage(e.target.files[0])
                  console.log(e.target.files[0])
            }
      }
      const handleImageChangeBackground = (e) => {
            if (e.target.files && e.target.files.length > 0){
                  changeSelectedImageBackground(e.target.files[0])
                  console.log(e.target.files[0])
                  changeRemovingBackground(false);
            }
      }
      
      return ( 
            <ContainerEditProfile>
            <FormularyBox onSubmit={handlesubmitEdit}>
                  <TopBar>
                        <CloseWindow onClick={()=>changeShowEditProfile(!showEditProfile)} >X</CloseWindow>
                        <EditButton disabled={loading} type="submit">
                              <p>Save</p>
                        </EditButton>
                  </TopBar>
                  <BackgroundImageContainer>
                        <BackgroundInner>
                              {selectedImageBackground ?
                              <BackgroundImage alt="userbackground" src={URL.createObjectURL(selectedImageBackground)}/>
                              :
                              selectedImageBackground == null && currentUserInfo[0].backgroundURL == null ?
                              <BackgroundImageBlank/>
                              :
                              removingBackground === true?
                              <BackgroundImageBlank/>
                              :
                              selectedImageBackground == null && currentUserInfo[0].backgroundURL ?
                              <BackgroundImage alt="userbackground" src={currentUserInfo[0].backgroundURL}/>
                              :""
                              }
                              <ContainerIcons>
                                    <IconContainerBackground>
                                          <label>
                                                <Inputest type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChangeBackground}/>
                                                <IconAddPhoto/>   
                                          </label>
                                    </IconContainerBackground>
                                    {!removingBackground &&
                                    <IconContainerBackground onClick={()=>{changeRemovingBackground(true); changeSelectedImageBackground(null)}}>
                                          <IconDeleteImage/> 
                                    </IconContainerBackground>
                                    }
                              </ContainerIcons>
                        </BackgroundInner>
                  </BackgroundImageContainer>           
                  <ProfilePicContainer>
                        <ProfilePic>
                              {selectedImage ?
                              <ImageHolder alt="newAvatar" src={URL.createObjectURL(selectedImage)}/>
                              :
                              selectedImage == null && user.photoURL == null ?
                              <ImageHolder alt="placeholderAvatar" src={ProfileImage}/>
                              :
                              selectedImage == null && user.photoURL ? 
                              <ImageHolder alt="user Avatar" src={user.photoURL}/>
                              :""
                              }  
                              <IconContainerProfile>
                                    <label>
                                          <Inputest type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange}/>
                                          <IconAddPhoto/>     
                                    </label>
                              </IconContainerProfile>      
                        </ProfilePic>
                  </ProfilePicContainer>       
                  <Inputs>
                        <InputContainer>
                        <FormularyInput NameBox
                                    maxLength={20}
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
                                    {nameEdit.length < 1 ?
                                    ""
                                    :nameEdit.length < 15 ?
                                    <SpanCounterBottom className="bottomSpan"  >
                                          {nameEdit.length}/20
                                    </SpanCounterBottom>
                                    :
                                    <SpanCounterBottom RED className="bottomSpan"  >
                                          {nameEdit.length}/20
                                    </SpanCounterBottom>
                                    }  
                        </InputContainer>
                        <InputContainer>
                        {/* <FormularyInput BioBox
                                    type="text"
                                    name="bio"
                                    value={bioEdit}
                                    placeholder="Bio"
                                    onChange={handleChange}
                                    /> */}
                                    <MessageUser className='timeline-user'
                                    name="bio"
                                    id="bio"
                                    maxLength={160}
                                    type="text"
                                    placeholder="Bio"
                                    value={bioEdit}
                                    onChange={handleChange}/>
                                    {currentUserInfo[0].bio ==="" ?
                                          <SpanInputInitial>Bio</SpanInputInitial> :
                                          <SpanInputFinal>Bio</SpanInputFinal>
                                    }
                                    {bioEdit.length < 1 ?
                                    ""
                                    :bioEdit.length < 140 ?
                                    <SpanCounterBottom className="bottomSpan"  >
                                          {bioEdit.length}/160
                                    </SpanCounterBottom>
                                    :
                                    <SpanCounterBottom RED className="bottomSpan"  >
                                          {bioEdit.length}/160
                                    </SpanCounterBottom>
                                    }

                        </InputContainer>
                  </Inputs>
                  
            </FormularyBox> 
            </ContainerEditProfile>
       );
}
 
export default EditProfileBox;