import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom';

import { NoteScreen } from "../../../components/notes/NoteScreen";
import { MemoryRouter } from "react-router-dom";
import { activeNote } from "../../../actions/notes";

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: '955fp6FcxWfqIKnsJj1EKpXeT1T2',
        name: 'Nicolas Testing'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes:{ 
        notes: [],
        active: {
            id: 1234,
            title: 'hola',
            body: 'mundo',
            date: 0
        }
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(<Provider store={ store }>
                        <NoteScreen />
                    </Provider>);

describe('Pruebas sobre <NoteScreen />', () => {
   
    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar la accion activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola titulo actualizado'
            }
        });
        expect(activeNote).toHaveBeenLastCalledWith(
            initState.notes.active.id,
            {
                id: initState.notes.active.id,
                title: 'Hola titulo actualizado',
                body: initState.notes.active.body,
                date: initState.notes.active.date
            }
        );

    });


    
    
});
