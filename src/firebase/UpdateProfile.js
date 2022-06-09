import { db } from "./FirebaseConfig";
import { doc, updateDoc, collection, onSnapshot, orderBy, limit, query, where } from "firebase/firestore";


const UpdateProfile = async({id,newName,newBio}) => {
      console.log(id,newName,newBio)
      const document = doc(db, "userInfo" , id); 
      return await updateDoc(document, {
            name:newName,
            bio:newBio
      }); 
}

const UpdateTimeline = async({newName,newBio})=>{

      const consult = query(
            collection(db, 'userTimeline'),
            where('uidUser', "==", user.uid),
            orderBy('date', 'desc')
            /* limit(30) */
      );
      console.log(consult)
      console.log(user)

      /* onSnapshot(consult, (snapshot)=>{
            snapshot.docs.map((messageUser)=>{
                  const documentref =doc(db, "userTimeline", messageUser.id)
                  updateDoc(documentref,{
                        name:newName,
                        bio:newBio
                  })
            })
      }) */


}
export  {UpdateProfile, UpdateTimeline};