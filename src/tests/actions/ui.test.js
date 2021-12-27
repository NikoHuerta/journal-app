import { setError, removeError, startLoading, finishLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas en ui-actions', () => {
    

    test('Todas las acciones deben de funcionar sin problemas ', () => {
       
        const action = setError('Error generico #1');
        
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Error generico #1',
        });
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });

    });
    
});
