/*
    {
        notes: [],
        active: null,
        active: {
            id: 'asdsa23213dasdsa2e21esda',
            title: ''
            body: ''
            imageUrl: '',
            date: 1231231231234123412353412613212
        }
    }

*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
};


export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case types.notesAddNewNote:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }
        
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(
                    note => note.id !== action.payload
                )
            }
        
        case types.notesLogoutCleaning:
            return { 
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}