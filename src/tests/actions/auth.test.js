// /**  * @jest-environment node  */ 
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { login, logout, startGoogleLogin, startLoginEmailPassword, startLogout, startRegisterWithEmailPasswordName } from "../../actions/auth";
import { types } from "../../types/types";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);


describe('Pruebas con auth-actions', () => {
   
    beforeEach(()=>{
        store = mockStore(initState);
    });

    test('login y logout deben de crear la accion respectiva', () => {
        
        const userData = {
            uid : "MO6rRepVuZR07y28YN4gid86THh1",
            name : "Nicolas Test"
        }
        const loginAction = login(userData.uid, userData.name);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid: userData.uid,
                displayName: userData.name
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('Debe de realizar el startLoginEmailPassword correctamente', async() => {

        await store.dispatch(startLoginEmailPassword('nicolas@huerta.cl','123456'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        });
        expect(actions[2]).toEqual({
            type: types.uiFinishLoading
        });
    });

    test('Debe de realizar el startLogout correctamente ', async() => {

        await store.dispatch(startLogout());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('Debe de realizar startRegisterWithEmailPasswordName correctamente ', async() => {
       
        const resp = await store.dispatch(startRegisterWithEmailPasswordName('nicolas@huerta.cl','123456','Nicolas Huerta'));
        const actions = store.getActions();

        expect(resp).toBe('The email address is already in use by another account.');

    });

    test('Debe de realizar startGoogleLogin correctamente', async() => {
       
        const resp = await store.dispatch(startGoogleLogin());
        const actions = store.getActions();
    
        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });
        expect(actions[1]).toEqual({
            type: types.uiFinishLoading
        });
        expect(resp).toBe('auth/operation-not-supported-in-this-environment');

    });
    


    

});
