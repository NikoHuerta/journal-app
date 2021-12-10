import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
// import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';



export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );
    

    const [formValues, handleInputChange] = useForm({ 
        name: 'Nicolas Test',
        email: 'nicolas@huerta.cl',
        password: '123456',
        password2: '123456' 
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            // console.log('Formulario Correcto');
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }
    };

    // const handleError = (msg) => {
    //     Swal.fire('Error',  msg , 'warning');
    // };

    const isFormValid = () => {

        if(name.trim().length === 0){
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 6){
            dispatch(setError('Password shoud be at least 6 characters and match each other'));
            return false;
        }
        
        dispatch(removeError());
        return true;
    }

    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister } >

                {
                    msgError && //handleError(msgError)
                    (<div className="auth__alert-error">
                        { msgError }
                    </div>)
                    
                }


                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"

                    onChange={ handleInputChange }
                    value= { name }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"

                    onChange={ handleInputChange }
                    value= { email }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"

                    onChange={ handleInputChange }
                    value= { password }
                />
                

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"

                    onChange={ handleInputChange }
                    value= { password2 }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    // disabled= { true }
                >Register
                </button>
                
                <Link to="/auth/login" className="link">
                    Already Registered?
                </Link>
            </form>
        </>
    )
}
