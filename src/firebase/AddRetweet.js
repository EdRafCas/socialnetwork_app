import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";

const AddRetweet = async({id, uidUser, name, alias, date, likes, retweets, photoURL}) => {
      console.log(id,uidUser,likes)
      const document = doc(db, "userTimeline" , id); 

      try{
            await updateDoc(document, {
                  retweets: [...retweets, uidUser]})
                  try{
                        await addDoc(collection(db, "userTimeline"), {
                              Retweet: true,
                              RetweetId: id,
                              uidUser:uidUser,
                              name: name,
                              alias: alias,
                              date: date,
                              likes: likes,
                              retweets: retweets,
                              photoURL: photoURL
                        })
                  } catch(error){
                        console.log("Error adding new tweet")
                  }
      } catch(error){
            console.log("Error updating tweet")
      }

}

const addRetweetToTimeline = ({changeAlert, changeStateAlert, id, user, currentUserInfo, date}) =>{
      if(currentUserInfo){
       AddRetweet({
        id: id,
        uidUser: currentUserInfo[0].uidUser,
        name:currentUserInfo[0].name,
        alias:currentUserInfo[0].alias,
        date: date,
        likes: [],
        retweets: [],
        photoURL: user.photoURL
      })
      .then(()=>{
        changeStateAlert(true);
        changeAlert({
              type:'success',
              messageAlert: 'Your message was sent successfully'
        })
      })
      .catch((error)=>{
        changeStateAlert(true);
        changeAlert({
              type:'error',
              messageAlert: 'An error ocurred while sending your message'
        })
      }) 
      }
      
    };



 
export {AddRetweet, addRetweetToTimeline};