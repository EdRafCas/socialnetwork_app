import styled from 'styled-components'
import theme from '../Theme'


const HeaderUser =styled.div`
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:0rem;
      width:100%;
      max-width:700px;
      min-width:300px;
      height:auto;
      border-right:solid ${theme.BorderColor} 1px;
      /* border:solid red 1px; */
`
const BackgroundImage =styled.div`
      /* border:solid red 1px; */
      overflow:hidden;
      max-height:380px;
      width:100%;
      cursor:pointer;
      display:flex;
      justify-content:center;
      img{
            max-width:55rem;
            width:100%;
            height:auto;
            overflow:hidden;
            }
`
const ProfilePicContainer=styled.div`
      display:flex;
      width:100%;
      height:6rem;    
      position: relative;
      /* border: solid red 1px; */
`
const ProfilePic =styled.div`
      /* border: solid red 1px; */
      position: absolute;
      top:-5rem;
      left:1rem;
      padding:0;
      border-radius:50%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      width:10rem;
      height:10rem;
      min-height:48px;
      flex-direction:column;
      overflow:hidden;
      background:#000;
      cursor:pointer;
      img{
            width:100%;
      }
      @media(max-width: 760px){ /* 950px */
           width:6rem;
           height:6rem;
           top:-2.5rem;
            left:1rem;
      }
`
const EmptyProfilePic =styled.div`
      /* border: solid red 1px; */
      position: absolute;
      top:-5rem;
      left:1rem;
      padding:0;
      border-radius:50%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      width:10rem;
      height:10rem;
      min-height:48px;
      flex-direction:column;
      overflow:hidden;
      background:#000;
      img{
            width:100%;
      }
      @media(max-width: 760px){ /* 950px */
           width:6rem;
           height:6rem;
           top:0rem;
      }
`
const UserCard =styled.div`
      padding:0rem 1rem;
      max-height:10rem;
      min-height:5rem;
      display:flex;
      flex-direction:column;
      /* border:solid red 1px; */

`
const NamesContainer=styled.div`
      display:flex;
      flex-direction:column;
      gap:5px;

`
const Bio=styled.div`
      padding:1rem 0rem;
      display:flex;
      width:100%;
      height:4rem;
      font-size:1rem;
      font-weight:800;
      color:white;
`
const EditButton=styled.button`
      position:absolute;
      top:1rem;
      right:1rem;
      display:flex;
      height:3rem;
      width:10rem;
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
            background:${theme.RedDark}};
            }
      :active{
            border:solid black 3px;
            p{
                  color:black;
            }
      }
      @media(max-width: 760px){ /* 950px */
            height:2rem;
            width:6rem;
            border:none;
            p{
                  font-size:0.9rem;
                  font-weight:1000;
                  color:white;
            }
      }
`
const BackgroundImageUser =styled.div`
     /*  border:solid red 1px; */
      width:100%;
      cursor:pointer;
      display:flex;
      justify-content:center;
      max-width:55rem;
      img{
            /* border:solid red 1px; */
            width:100%;
            overflow:hidden;
            }
`
const BackgroundImageUserContainer =styled.div`
      max-height:380px;
      width:100%;
      overflow:hidden;
`

const EmptyBackground =styled.div`
      /* border:solid red 1px; */
      width:100%;
      height:165px;
      cursor:pointer;
      display:flex;
      justify-content:center;
      max-width:55rem;
      /* img{
            max-width:55rem;
            width:100%;
            height:auto;
            overflow:hidden;
            } */
`

export{HeaderUser,BackgroundImage,ProfilePicContainer, ProfilePic,EmptyProfilePic, UserCard, NamesContainer, Bio, EditButton, BackgroundImageUser, BackgroundImageUserContainer, EmptyBackground};
