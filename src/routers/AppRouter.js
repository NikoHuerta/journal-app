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
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user)=>{
      // console.log(user);
      if(user?.uid){ //si existe, esta autenticado...
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
  
        dispatch(startLoadingNotes(user.uid));
        
      }else{
        setIsLoggedIn(false);
      }

      setChecking(false);

    });
    
  }, [dispatch, setChecking]);

    if(checking){
      return (
          <h1>Wait ...</h1>
      )
    }

    return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/auth/*" element=
              {
                <PublicRoute logged={ isLoggedIn } >
                  <AuthRouter /> 
                </PublicRoute>
              }
            />
            <Route path="/" element=
              { 
                <PrivateRoute logged={ isLoggedIn } >
                  <JournalScreen />
                </PrivateRoute>  
              }
            />
            
            <Route path="*" element=
              {
                <PublicRoute logged={ isLoggedIn } > 
                  <AuthRouter />
                </PublicRoute> 
              }
            />
        </Routes>
      </div>
    </BrowserRouter>
    )
}
