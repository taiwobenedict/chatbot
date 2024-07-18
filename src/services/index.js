import { doc, setDoc, getDocs, collection, collectionGroup, query } from "firebase/firestore";
import { db } from "../firestore";


export const storeChatHistory = async (userId, chat) => {
    const historyRef = doc(db, `conversations/${userId}/`);
    // Create Chat History
    const conversationId = await setDoc(historyRef, {
        id: chat?.id,
        title: chat?.title,
        body: chat?.body,
        datetime: chat?.datetime
    })


}

export const storeMessage = async (userId, historyId, message) => {
    const messageRef = doc(db, 'conversations', userId); // Reference to the userId city document
    const historyRef = collection(messageRef, historyId);
    try {
        await addDoc(historyRef, {
            role: message?.role,
            content: message?.content,
            time: message?.time,
        })

        console.log("created")
        
    } catch (error) {
        console.log(error.message)
        
    }
}

export const fetchAllMessages = async (userId, historyId) => {

    // Query a reference to a subcollection
    const querySnapshot = await getDocs(collection(db, `conversations/${userId}/chats-${historyId}/`));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}

export const fetchHistories = async () => {
    const querySnapshot = await getDocs(collection(db, "conversations"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}
