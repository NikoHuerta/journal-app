import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startRegisterWithEmailPasswordName } from "../../../actions/auth";

import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

// jest.mock('../../../actions/auth', ()=>({
//     startRegisterWithEmailPasswordName: jest.fn()
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {  },
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
//store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {
   
    // beforeEach(()=>{
    //     store = mockStore(initState);
    //     jest.clearAllMocks();
    // });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar la accion de startRegisterWithEmailPasswordName', ()=>{

        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target:{
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        //console.log(actions);
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
    });

    test('Debe de mostrar la caja de alerta con el error', () => {
        const initState = {
            auth: {  },
            ui: {
                loading: false,
                msgError: 'Email is not valid'
            },
            notes:{ 
                notes: [],
                active: null
             }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);


    });
    

    
});
