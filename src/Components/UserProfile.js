import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Alert from '../Elements/Alert';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import { useAuth } from '../Context/AuthContext';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, where, limit, query } from 'firebase/firestore';
import {Link } from 'react-router-dom';
import UserProfileRoutes from './UserProfileRoutes';
import Account from './Account';
import Starboy from '../img/starboy.png'


const MainPageContainer = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content: center;
  background:#000;
  border:solid red 1px;
`
const ColumnContainer=styled.div`
  max-width:40%;
  display:flex;
  flex-direction:column;
`
const HeaderUser =styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:1rem;
  width:100%;
  height:30rem;
  border:solid red 1px;
`

const BackgroundImage =styled.div`
  border:solid red 1px;
  overflow:hidden;
  img{
    max-width:50rem;
    width:100%;
    overflow:hidden;
  }
`
const UserCard =styled.div`
  padding:1rem;
  height:10rem;
  display:flex;
  flex-direction:column;
  border:solid red 1px;

`
const NamesContainer=styled.div`
display:flex;
flex-direction:column;

gap:5px;

`
const Bio=styled.div`
  display:flex;
  width:100%;
  height:4rem;
  font-size:1rem;
  font-weight:800;
  color:white;
`


const LinksContainer = styled.div`
      width:100%;
      
      background:black;
      margin:auto;
      display:flex;
      flex-direction:row;
      justify-content:center;
      margin:0;
      a{    
            text-decoration:none;
      }
      @media(max-width: 720px){ /* 950px */
        width: 100%;
        min-width:600px;
    }
      @media(max-width: 400px){ 
            width: 100%;
            min-width:400px;
            
      }
      
`
const RedirectLink =styled(Link)`
      /* border-bottom: 1px solid #FFFFFF; */
      
      box-sizing: content-box;
      font-size:14px;
      display:inline-block;
      color:white;
      width:auto;
      padding:15px 5px;
      margin: 0.25rem 0.5rem;
      letter-spacing:1px;
      white-space: nowrap;
      border: 3px solid #000000;
      
      
      :hover{
            color:#000000;
            background:#fff;
            
            :active{
                  border: 3px double #000;
                  font-size: 14px;
                  font-weight: 800;
            }   
      }
      @media(max-width: 400px){ 
            font-size:12px;
            padding:10px 2px;
           
            :hover{
            color:#000000;
            background:#fff;
            
                  :active{
                        border: 3px double #000;
                        font-size: 12px;
                        font-weight: 800;
                  }   
      }
    }
`

const UserProfile = ({alert, changeAlert, stateAlert, changeStateAlert}) => {

  const {user} =useAuth();
  const [currentUserInfo, changeCurrentUserInfo] =useState([])
  const [loadingUserData, changeLoadingUserData] =useState(true);
  
  useEffect(()=>{
        const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", user.uid),
              limit(10)
        );
        const unsuscribe = onSnapshot(consult, (snapshot)=>{
              changeCurrentUserInfo(snapshot.docs.map((userData)=>{
                    /* console.log(userData.data()) */
                    return{...userData.data(), id:userData.id}
              }))
              changeLoadingUserData(false);
        })
        console.log(user)

        return unsuscribe;
  }, [])


  
  
      return ( 
       <MainPageContainer>
          <ColumnContainer>
            {!loadingUserData &&
            <Account currentUserInfo={currentUserInfo} />
            }
          </ColumnContainer>

          <ColumnContainer>
            {!loadingUserData &&
            <>
              <HeaderUser>
                <BackgroundImage>
                  <img alt="userbackground" src={Starboy}/>
                </BackgroundImage>
                <UserCard>
                  <NamesContainer>
                    <NameContainer>{currentUserInfo[0].name}</NameContainer>
                    <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
                    <Bio>This is a placeholder</Bio>
                  </NamesContainer>
                </UserCard>
                
              </HeaderUser>
              <LinksContainer>
                <RedirectLink to =""> Tweets</RedirectLink>
                <RedirectLink to ={`/user/${currentUserInfo[0].alias}/likes`}> Likes</RedirectLink>
              </LinksContainer>
              <UserProfileRoutes currentUserInfo={currentUserInfo}/>
            </>
            }
          </ColumnContainer>
          <Alert type={alert.type}
                  message={alert.message}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
       </MainPageContainer> 
      );
}
 
export default UserProfile;
