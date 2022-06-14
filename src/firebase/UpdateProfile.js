import { db, storage } from "./FirebaseConfig";
import { doc, updateDoc, collection, onSnapshot, orderBy, limit, query, where } from "firebase/firestore";
import { getDownloadURL, ref} from "firebase/storage"


const UpdateProfile = async({id,newName,newBio}) => {
      console.log(id,newName,newBio)
      const document = doc(db, "userInfo" , id); 
      return await updateDoc(document, {
            name:newName,
            bio:newBio
      }); 
}

const UpdateTimeline = async({user,newName})=>{

      const consult = query(
            collection(db, 'userTimeline'),
            where('uidUser', "==", user.uid),
            orderBy('date', 'desc')
            /* limit(30) */
      );
      const fileRef= ref(storage, user.uid)
      const newPhotoURL = await getDownloadURL(fileRef);

      onSnapshot(consult, (snapshot)=>{
            snapshot.docs.map((messageUser)=>{
                  const documentref =doc(db, "userTimeline", messageUser.id);
                  return updateDoc(documentref, {
                        name:newName,
                        photoURL:newPhotoURL
                  })
            })
      })
     
}
export  {UpdateProfile, UpdateTimeline};