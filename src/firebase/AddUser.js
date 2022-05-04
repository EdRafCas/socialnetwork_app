import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddUser = ({nameHolder, lastnameHolder, aliasHolder, emailHolder, birthMonth, birthDay, birthYear, uidUser}) => {
      return addDoc(collection(db, "userInfo"), {
            name:nameHolder,
            lastname:lastnameHolder,
            alias:aliasHolder,
            email:emailHolder,
            birthMonth: birthMonth,
            birthDay:birthDay,
            birthYear:birthYear,
            uidUser:uidUser
      })
}
 
export default AddUser;