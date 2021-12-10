import React, { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';


export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      // console.log(user);
      if(user?.uid){ //si existe, esta autenticado...
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }

      setChecking(false);

    });
    
  }, [dispatch, setChecking]);

    if(checking){
      return (
          <h1>Espere ...</h1>
      )
    }

    return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/auth/*" element={ <AuthRouter /> }/>
            <Route path="/" element={ <JournalScreen /> }/>
            
            <Route path="*" element={ <AuthRouter /> }/>
        </Routes>
      </div>
    </BrowserRouter>
    )
}
