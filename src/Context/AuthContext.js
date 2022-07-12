import React,{useContext, useState, useEffect} from 'react';
import {auth } from '../firebase/FirebaseConfig';
import {onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext();

//context Hook
const useAuth = () =>{
      return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

      const [user, changeUser] =useState();
      const [loading, changeLoading] =useState(true);
      const [showPopUp, changeShowPopUp] =useState(false)


      //onetime check
      useEffect(()=>{
            const cancelSuscription = onAuthStateChanged(auth, (user) =>{
                  changeUser(user);
                  changeLoading(false);
            })
            return cancelSuscription;
      }, []);
      

      return ( 
            <AuthContext.Provider value={{user:user, changeShowPopUp:changeShowPopUp, showPopUp:showPopUp}}>
                  {!loading && children}
            </AuthContext.Provider>
       );
}
 
export  {AuthProvider, AuthContext, useAuth};