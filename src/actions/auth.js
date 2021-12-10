import Swal from 'sweetalert2';

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types"
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        
        dispatch(startLoading());

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
                dispatch(finishLoading());
            })
            .catch(e => {
                dispatch(finishLoading());
                let msg_err;
                ((e.code ==='auth/user-not-found') || (e.code ==='auth/wrong-password')) ? msg_err= 'You have entered an invalid username or password, or your account does not exist' : msg_err = 'Service error';
                Swal.fire('Error', msg_err, 'error');

            });
    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({ user }) => {

                await updateProfile(user, { displayName: name });
                
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                let msg_err;
                (e.code ==='auth/email-already-in-use') ? msg_err= 'The email address is already in use by another account.' : msg_err = 'Service internal error.';
                Swal.fire('Error', msg_err, 'error');
            });

    }
}


export const startGoogleLogin = () => {

    return(dispatch) => {
        dispatch(startLoading());

        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then( ({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
                dispatch(finishLoading());
            })
            .catch(e => {
                Swal.fire('Error', 'The Google Login PopUp was closed.', 'error');
                dispatch(finishLoading());
            });
    }
}

export const startLogout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth)
            .then( ( ) => {
                dispatch(logout());
            })
            .catch( e => {
                console.log(e);
            });
    }
}


export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
});


export const logout = () => ({
    type: types.logout
});


