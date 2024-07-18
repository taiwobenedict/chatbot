// src/services/conversationService.js

import { collection, query, getDocs, orderBy, addDoc,  doc, collectionGroup } from 'firebase/firestore';
import { db } from '../firebase';

// Function to create a new conversation
const addMessageToConversation = async (userId) => {
    const conversationRef = collection(db, "conversation")
    await addDoc(collection(conversationRef, userId , chatId), {
        name: 'Golden Gate Bridge',
        type: 'bridge'
    })

    collectionGroup()

};



export { addMessageToConversation };






// Function to get messages from a conversation
const getChatHistories = async (historyId) => {
    const chatHistory = query(collectionGroup(db, historyId))
    
};

export { getMessagesFromConversation };
