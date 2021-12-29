/** 
 * @jest-environment node 
 */

import { disableNetwork, doc , deleteDoc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';
import * as fs from "fs";
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'fake_uid_testing_purpose'
    },
    notes: {
        active: {
            id: '5riVzpFRuwMF4nBpGmC3',
            title: 'Titulo updated',
            body: 'Body updated'
        }
    }
}
let store = mockStore(initState);

describe('Pruebas sobre notes-actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
        // enableNetwork(db);
    });

    afterAll(()=>{
        disableNetwork(db);
    });

    test('startNewNote debe de crear una nueva nota', async() => {
        await store.dispatch(startNewNote());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNewNote,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[1].payload.id;
        const noteRef = doc(db, `${ store.getState().auth.uid }/journal/notes/${ docId }`);
        await deleteDoc(noteRef);

    });

    test('startLoadingNotes debe cargar las notas', async() => {
        await store.dispatch(startLoadingNotes(store.getState().auth.uid));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });
        
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote debe de actualizar la nota', async() => {
        
        const note = {
            id: '5riVzpFRuwMF4nBpGmC3',
            title: 'Titulo updated',
            body: 'Body updated'
        }
        
        await store.dispatch(startSaveNote(note));
        
        const actions = store.getActions();
        //console.log(actions);
        expect(actions[0].type).toBe(types.notesUpdated);
        const {title, body} = (await getDoc(doc(db, `${ store.getState().auth.uid }/journal/notes/${ note.id }`))).data();
        //console.log(docSnap.data());

        expect(title).toBe(note.title);
        expect(body).toBe(note.body);
    });
    
    test('startUploading debe actualizar el url del entry', async() => { 

        fileUpload.mockReturnValue('https://hola-mundo.com/cosa.jpg');
        fs.writeFileSync('foto.jpg', '');

        const file = fs.readFileSync('foto.jpg');
        await store.dispatch(startUploading(file));

        const docRef = (await getDoc(doc(db,`${ store.getState().auth.uid }/journal/notes/${ store.getState().notes.active.id }`))).data();
        expect(docRef.url).toBe('https://hola-mundo.com/cosa.jpg');
        fs.rmSync('foto.jpg');

    });
    
    

});
