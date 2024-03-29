import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddMessage = ({message, uidUser, name, alias, date}) => {
      return addDoc(collection(db, "userTimeline"), {
            type:"message",
            message:message,
            uidUser:uidUser,
            name: name,
            alias: alias,
            date: date,
            comments:[],
            likes: [],
            retweets: []
      })
}
 
export default AddMessage;