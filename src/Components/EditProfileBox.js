import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {FormularyInput}  from '../Elements/ElementsFormulary';
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png'
import {ReactComponent as IconAddPhoto} from '../img/addphoto_icon.svg';
import {UpdateProfileNoImage, UpdateProfileImage, UpdateProfileImageBackground, UpdateProfileImageOnlyBackground} from '../firebase/UpdateProfile';


const ContainerEditProfile=styled.div`
      position:absolute;
      display:flex;
      flex-direction:column;
      max-height:45rem;
      max-width:40rem;
      width:40rem;
      padding-top:0rem;
      padding-left:1rem;
      padding-right:1rem;
      padding-bottom:2rem;
      border-radius:30px;
      border: solid ${theme.BorderColor} 1px;
      background:#000;
      z-index:100;
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
      cursor:default;
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
const BackgroundImageContainer =styled.div`
      position:relative;
      /* border:solid red 1px; */
      overflow:hidden;
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
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      margin:auto;
      width:100%;
      /* border:solid red 1px; */
      img{
            width:100%;
      }

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
      position: absolute;
      top:40%;
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

`
const Inputest=styled.input`
      display:none;
`
const ImageHolder=styled.img`
      width:100%;
`
const BackgroundImage=styled.img`
      max-height:20rem;
      min-height:10rem;
      /* opacity:0.8;
      width:100%;
      overflow:hidden;
      max-width:50rem; */
`
const BackgroundImageBlank=styled.div`
      height:10rem;
      width:100%;
      background:#000;
      /* border:1px solid white; */

`

const EditProfileBox = ({user, currentUserInfo, changeShowEditProfile, showEditProfile}) => {
      const [nameEdit, changeNameEdit] =useState("")
      const [bioEdit, changeBioEdit] =useState("")
      const [selectedImage, changeSelectedImage] =useState(null);
      const [selectedImageBackground, changeSelectedImageBackground] =useState(null);
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
                  if (selectedImage && selectedImageBackground == null){
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
                  if (selectedImage && selectedImageBackground){
                        try{
                              await UpdateProfileImage({
                                    file:selectedImage,
                                    user:user,
                                    changeLoading, 
                                    id:currentUserInfo[0].id,
                                    newName:nameEdit,
                                    newBio:bioEdit});
                                    try{
                                          await UpdateProfileImageOnlyBackground({
                                                file:selectedImageBackground,
                                                user:user, 
                                                changeLoading, 
                                                id:currentUserInfo[0].id})
                                    } catch(error){
                                          console.log(error)
                                    }
                        } catch(error){
                              console.log("error uploading both images")
                        }
                  } 
                  if (selectedImage==null && selectedImageBackground==null) { 
                        await UpdateProfileNoImage({
                              id:currentUserInfo[0].id,
                              newName:nameEdit,
                              newBio:bioEdit,
                        })
                        console.log("none selected")
                  }
            changeShowEditProfile(!showEditProfile);
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
            }
      }
      const handleSubmitBackground =async(e)=>{
            e.preventDefault();
            if (selectedImageBackground){
                  try{
                        await UpdateProfileImageBackground({
                              file:selectedImageBackground,
                              user:user,
                              changeLoading, 
                              id:currentUserInfo[0].id})
                  } catch(error){
                        console.log(error+"error UpdateProfileImageBackground")
                  }           
            }
            changeShowEditProfile(!showEditProfile);
            console.log("Finished changes Backgroun, closing window")
      }
      
      return ( 
            <ContainerEditProfile>
             {/* <form onSubmit={handleSubmitBackground}>
             <label>
                  <input type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChangeBackground}/>   
            </label>
            <button type="submit">
                  <p>test</p>
            </button>
            </form> */}     
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
                              selectedImageBackground == null && currentUserInfo[0].backgroundURL ?
                              <BackgroundImage alt="userbackground" src={currentUserInfo[0].backgroundURL}/>
                              :""
                              }
                              <IconContainerBackground>
                              <label>
                                    <Inputest type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChangeBackground}/>
                                    <IconAddPhoto/>   
                              </label>
                              </IconContainerBackground>
                              {/* <IconContainerBackground>
                                    <IconAddPhoto/>
                              </IconContainerBackground> */}
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