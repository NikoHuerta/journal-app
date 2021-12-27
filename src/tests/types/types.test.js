import { types } from '../../types/types';

describe('Pruebas en types', () => {
   
    test('Debe de corresponder al objeto por defecto', () => {
       
        expect(types).toEqual(
            {
                login: '[Auth] Login',
                logout: '[Auth] Logout',
            
                uiSetError: '[UI] Set Error',
                uiRemoveError: '[UI] Remove Error',
            
                uiStartLoading: '[UI] Start Loading',
                uiFinishLoading: '[UI] Finish Loading',
            
                notesAddNewNote: '[Notes] New note',
                notesActive: '[Notes] Set active note',
                notesLoad: '[Notes] Load notes',
                notesUpdated: '[Notes] Updated note',
                notesFileUrl: '[Notes] Updated image url',
                notesDelete: '[Notes] Delete note',
                notesLogoutCleaning: '[Notes] Logout Cleaning',
            
            }
        );

    });
    

});



