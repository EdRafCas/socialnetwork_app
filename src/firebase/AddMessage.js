import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddMessage = ({message, uidUser, name, lastname, alias, date, likes, retweets}) => {
      return addDoc(collection(db, "userTimeline"), {
            message:message,
            uidUser:uidUser,
            name: name,
            lastname: lastname,
            alias: alias,
            date: date,
            likes: likes,
            retweets: retweets
      })
}
 
export default AddMessage;