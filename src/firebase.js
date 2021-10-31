import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { ref, onUnmounted } from "@vue/composition-api";

const firebaseConfig = {
  apiKey: "AIzaSyDCs3clfk0kyeR_7_nOjQSxCpX7CkDGRE4",
  authDomain: "github-messanger.firebaseapp.com",
  projectId: "github-messanger",
  storageBucket: "github-messanger.appspot.com",
  messagingSenderId: "447842621045",
  appId: "1:447842621045:web:8a4a82ae2fb698a5580a3c",
  measurementId: "G-DH3C9D092P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

export const chatsCollection = db.collection('chats')
const chatsQuery = chatsCollection.orderBy('createdAt', 'asc')

export const addChat = chat => {
  return chatsCollection.add(chat)
}

export const useLoadUserChats = (userID) => {
  // console.log(`userID:${userID}`)
  const chats = ref([])
  const close =  chatsQuery
    .where('membersIDS', 'array-contains', userID)
    .onSnapshot(snapshot => {
      chats.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
    })
    // console.log(chats.value)
  onUnmounted(close)
  // console.log(chats.value)
  return chats;
}

export const messagesCollection = db.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)

export const usersCollection = db.collection('users')
const usersQuery = usersCollection.orderBy('addedAt', 'asc').limit(100)

export const addUser = user => {
  return usersCollection.add(user)
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersQuery.onSnapshot(snapshot => {
    users.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(close)
  return users
}

export const addMessage = message => {
  return messagesCollection.add(message)
}

export const useLoadMessages = () => {
  // console.log(id)
  const messages = ref([])
  const close = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(close)
  return messages
}