import { db, storage } from "./FirebaseConfig";
import { doc, updateDoc, deleteField, collection, onSnapshot, orderBy, query, where, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes} from "firebase/storage"
import { updateProfile } from "firebase/auth";


const UpdateProfileNoImage = async({id,newName,newBio}) => {
     /*  console.log(id,newName,newBio) */
      const document = doc(db, "userInfo" , id); 
      return await updateDoc(document, {
            name:newName,
            bio:newBio
      }); 
}

const UpdateProfileImage = async({file, user ,changeLoading, id, newName, newBio}) => {
      const fileRef= ref(storage, user.uid)
      
      changeLoading(true);
      const snapshot = await uploadBytes(fileRef, file);

      const newPhotoURL = await getDownloadURL(fileRef); 

      updateProfile(user, {photoURL: newPhotoURL})

      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            name:newName,
            bio:newBio,
            photoURL:newPhotoURL}); 

            changeLoading(false);
      console.log("upload done")
}

const UpdateProfileImageBackground = async({file, user ,changeLoading, id, newName, newBio}) => {
      const fileRefBackground= ref(storage, user.uid+"_Background")
      
      changeLoading(true);
      const snapshotBackground = await uploadBytes(fileRefBackground, file);

      const newPhotoBackgroundURL = await getDownloadURL(fileRefBackground); 

      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            name:newName,
            bio:newBio,
            backgroundURL:newPhotoBackgroundURL}); 

            changeLoading(false);
      console.log("upload done")
}

const UpdateProfileDeleteBackground = async({file, user ,changeLoading, id, newName, newBio}) => {
      const fileRef= ref(storage, user.uid)
      
      changeLoading(true);
      const snapshot = await uploadBytes(fileRef, file);

      const newPhotoURL = await getDownloadURL(fileRef); 

      updateProfile(user, {photoURL: newPhotoURL})

      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            name:newName,
            bio:newBio,
            photoURL:newPhotoURL, 
            backgroundURL:deleteField()
      }); 

            changeLoading(false);
      console.log("upload done")
}

/* const UpdateProfileImages = async({file, fileBackground, user ,changeLoading, id, newName, newBio}) => {

      const fileRef= ref(storage, user.uid)
      const fileRefBackground= ref(storage, user.uid+"_Background")
      
      changeLoading(true);
      const snapshot = await uploadBytes(fileRef, file);
      const snapshotBackground = await uploadBytes(fileRefBackground, fileBackground);

      const newPhotoURL = await getDownloadURL(fileRef);
      const newPhotoBackgroundURL = await getDownloadURL(fileRefBackground);  

      updateProfile(user, {photoURL: newPhotoURL})
      
      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            name:newName,
            bio:newBio,
            photoURL:newPhotoURL,
            backgroundURL:newPhotoBackgroundURL}); 

            changeLoading(false);
      console.log("upload done")
} */

const UpdateProfileImageOnlyBackground = async({file,user ,changeLoading, id, newName, newBio}) => {
      const fileRefBackground= ref(storage, user.uid+"_Background")
      
      changeLoading(true);
      const snapshotBackground = await uploadBytes(fileRefBackground, file);

      const newPhotoBackgroundURL = await getDownloadURL(fileRefBackground);  

      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            backgroundURL:newPhotoBackgroundURL}); 

            changeLoading(false);
      console.log("upload done")
}


const UpdateProfilePinnedMessage = async({changeStateAlert,changeAlert,id,userId, messageId,changeShowPopUp,showPopUp}) => {
      
      await changeShowPopUp(!showPopUp);
            try{
                  const document = doc(db, "userInfo" , userId); 
                  await updateDoc(document, {pinnedMessage: id});
                        changeStateAlert(true);
                        changeAlert({
                              type:'success',
                              message: 'The message was pinned to your Profile'
                        })
            }catch{
                  console.log("show error")
            }

}
const UpdateProfileRemovePinned = async({changeStateAlert,changeAlert,id,userId, messageId,changeShowPopUp,showPopUp}) => {
      
      await changeShowPopUp(!showPopUp);
            try{
                  const document = doc(db, "userInfo" , userId); 
                  await updateDoc(document, {pinnedMessage: ""});
                        changeStateAlert(true);
                        changeAlert({
                              type:'success',
                              message: 'The message was removed from your Profile'
                        })
            }catch{
                  console.log("show error")
            }

}
const AddBookmarkToUser = async({changeStateAlert,changeAlert,id,userId, messageId,changeShowPopUp,showPopUp, bookmarks}) => {
      
      await changeShowPopUp(!showPopUp);
            try{
                  const document = doc(db, "userInfo" , userId); 
                  await updateDoc(document, {bookmarks: [...bookmarks, id]});
                        changeStateAlert(true);
                        changeAlert({
                              type:'success',
                              message: 'The message was added to your bookmark list'
                        })
            }catch{
                  console.log("show error")
            }

}
const RemoveFromBookMark = async({id,userId, messageId,changeShowPopUp,showPopUp, bookmarks, update, changeUpdate}) => {
      
      const removedBookmark = bookmarks.filter(function(item){
            return item !== id
      })
      const document = doc(db, "userInfo" , userId); 
      await updateDoc(document, {
            bookmarks: removedBookmark
      });
      changeUpdate(update-1)    
            console.log(update+" removing bookmark from user") 

}

const RemoveTweetFromPinned = async({changeStateAlert,changeAlert, id, userId, changeShowPopUp, showPopUp}) => {
      await changeShowPopUp(!showPopUp);
            try{
                  const document = doc(db, "userInfo" , userId);
                  await updateDoc(document, {pinnedMessage:""});
                        try{
                              await deleteDoc(doc(db, "userTimeline", id));
                                    changeStateAlert(true);
                                    changeAlert({
                                    type:'success',
                                    message: 'The message was deleted from your timeline'
                                    })

                        } catch{
                              console.log("error deleting tweet")
                        }
            }catch{
                  console.log("error updating pinned message")
            }

}



/* const UpdateTimeline = async({user,newName})=>{

      const consult = query(
            collection(db, 'userTimeline'),
            where('uidUser', "==", user.uid),
            orderBy('date', 'desc')
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
     
} */

const UpdateTimelineNoPicture = async({user,newName})=>{

      const consult = query(
            collection(db, 'userTimeline'),
            where('uidUser', "==", user.uid),
            orderBy('date', 'desc')
            /* limit(30) */
      );

      onSnapshot(consult, (snapshot)=>{
            snapshot.docs.map((messageUser)=>{
                  const documentref =doc(db, "userTimeline", messageUser.id);
                  return updateDoc(documentref, {
                        name:newName
                  })
            })
      })
     
}

export  {UpdateProfileImage,UpdateProfileImageBackground, UpdateProfileNoImage, UpdateProfileImageOnlyBackground,UpdateTimelineNoPicture, UpdateProfileDeleteBackground, UpdateProfilePinnedMessage, UpdateProfileRemovePinned, AddBookmarkToUser, RemoveTweetFromPinned, RemoveFromBookMark};