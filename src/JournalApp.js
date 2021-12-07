import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store/store';
import { AppRouter } from '../src/routers/AppRouter';

export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
