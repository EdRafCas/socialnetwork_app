import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";


const addRetweetToTimeline = ({changeAlert, changeStateAlert, id, user, currentUserInfo, date, retweets}) =>{
      if(currentUserInfo){
       AddRetweet({
        id: id,
        uidUser: currentUserInfo[0].uidUser,
        name:currentUserInfo[0].name,
        alias:currentUserInfo[0].alias,
        date: date,
        retweets:retweets
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

const AddRetweet = async({id, uidUser, name, alias, date, retweets}) => {
      console.log(id,uidUser)
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
                        })
                  } catch(error){
                        console.log("Error adding new tweet")
                  }
      } catch(error){
            console.log("Error updating tweet")
      }

}

 
export {AddRetweet, addRetweetToTimeline};