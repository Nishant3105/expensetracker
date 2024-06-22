import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s",
    authDomain: "expensetracker-57345.firebaseapp.com",
    databaseURL: "https://expensetracker-57345-default-rtdb.firebaseio.com",
    projectId: "expensetracker-57345",
    storageBucket: "expensetracker-57345.appspot.com",
    messagingSenderId: "267990005343",
    appId: "1:267990005343:web:90e44ea1daf5b2bd9f4dea"
};


initializeApp(firebaseConfig);

export const db = getFirestore();

