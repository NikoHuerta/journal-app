import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
   
    test('Debe de retornar el estado por defecto', () => {
        const initialState = authReducer({
            uid: 'asdaf213221312sdsd',
            name: 'Nicolas Huerta'
            }, {});
        expect(initialState).toEqual({
            uid: 'asdaf213221312sdsd',
            name: 'Nicolas Huerta'
            });
    });

    test('Debe de autenticar correctamente', () => {
        const initialState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'asdaf213221312sdsd',
                displayName: 'Nicolas Huerta'
            }
        }
        const resp = authReducer(initialState, action);

        expect(resp).toEqual({
            uid: 'asdaf213221312sdsd',
            name: 'Nicolas Huerta'
        });
    });

    test('Debe de cerrar sesion correctamente', () => {
        const initialState = {};
        const actionLogin = {
            type: types.login,
            payload: {
                uid: 'asdaf213221312sdsd',
                displayName: 'Nicolas Huerta'
            }
        }
        const respLogin = authReducer(initialState, actionLogin);
        // console.log(respLogin);

        const actionLogout = {
            type: types.logout
        }

        const respLogout = authReducer(respLogin, actionLogout);
        // console.log(respLogout);
        expect(respLogout).toEqual({});




    });
    
    
    
});
