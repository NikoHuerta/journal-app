import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom';

import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";
import { MemoryRouter } from "react-router-dom";

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', ()=>({
    startNewNote: jest.fn()
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
        active: null
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Pruebas en <Sidebar />', () => {
   
    const wrapper = mount(<Provider store={ store }>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>);

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar la accion de startLogout', () => {
        wrapper.find('.btn').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('Debe de llamar la accion de startNewNote', () => {
        wrapper.find('.journal__new-entry').simulate('click', {
        });
        expect(startNewNote).toHaveBeenCalled();
    });
    
    
    

});
