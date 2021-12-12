import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


export const loadNotes = async ( uid ) => {

    const dataRef = await getDocs(collection(db, `${uid}/journal/notes`));
    const notes = [];

    dataRef.forEach( snapHijo => {
        // console.log(snapHijo);
        // console.log(snapHijo.data());
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    })

    // console.log(notes);
    return notes;
};