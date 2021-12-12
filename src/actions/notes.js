import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, updateDoc, doc , deleteDoc} from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => { //tarea async
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        try{
            const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
            dispatch(activeNote(doc.id, newNote));
            dispatch(addNewNote(doc.id, newNote));
        }catch(e){
            console.log(e);
        }
    }
}

export const startLoadingNotes = (uid) => { //tarea async
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const addNewNote = (id, note) => ({
    type: types.notesAddNewNote,
    payload: { 
            id,
            ...note
    }
});

export const activeNote = (id, note) => ({ //tarea sync
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const setNotes = (notes) => ({ //tarea sync (local)
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => { //tarea async (remota)
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        // //obtener el estado actual de las notas desde state redux
        // const { notes:notesReducer } = getState().notes;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc(db, `${ uid }/journal/notes/${ note.id }`);
        try {
                await updateDoc(noteRef, noteToFirestore);
                dispatch(refreshNote(note.id, noteToFirestore));

                // //añadir note nueva al state
                // notesReducer.push(note);
                // dispatch(setNotes(notesReducer));

                Swal.fire('Saved', note.title, 'success');
        }catch(e){
            Swal.fire('Error Saving', e, 'error');
        }
    }
};

export const refreshNote = (id, note) => ({ //tarea sync (local)
    type: types.notesUpdated,
    payload: { 
        id,
        note: {
            id,
            ...note
        }
    }   
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active:activeNote } = getState().notes;

        Swal.fire({
                title: 'Uploading...', 
                text: 'Please wait...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

        const fileUrl = await fileUpload(file);
        Swal.close();

        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote));
        // console.log(fileUrl);
    }
};

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const noteRef = doc(db, `${ uid }/journal/notes/${ id }`);

        try {
            await deleteDoc(noteRef);
            dispatch(deleteNote(id));

        } catch (error) {
            console.log(error);
        }
    }
};

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const logoutNote = () => ({
    type: types.notesLogoutCleaning
})