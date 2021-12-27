import { disableNetwork, doc , deleteDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'fake_uid_testing_purpose'
    }
});


describe('Pruebas sobre notes-actions', () => {

    afterAll(()=>{
        disableNetwork(db);
    });

    test('Debe de crear una nueva nota startNewNote ', async() => {
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
    

});
