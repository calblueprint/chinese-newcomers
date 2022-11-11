import { firebaseApp, db } from '../firebaseApp';
import { User } from '../../types/types';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
