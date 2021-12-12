import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);
    
    const [formValues, handleInputChange, reset] = useForm( note );
    const { title, body } = formValues;
    
    const activeId = useRef(note.id);

    useEffect(() => {
        
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
        
    }, [note, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, {
            ...formValues
        }));
        
    }, [formValues, dispatch]);

    const handleDelete = () => {
        //console.log('Delete Clicked');
        dispatch(startDeleting(note.id));
    }


    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Title"
                    className="notes__title-input"
                    autoComplete='off'
                    name='title'
                    
                    onChange={ handleInputChange }
                    value={ title }
                />

                <textarea
                    placeholder="Description"
                    className="notes__textarea"
                    autoComplete='off'
                    name='body'
                    
                    onChange={ handleInputChange }
                    value={ body }
                ></textarea>

                {
                    (note.url)&&
                    (<div className="notes__image">
                        <img
                            src={ note.url }
                            // onChange={ handleInputChange }
                            alt="imagen"
                            name='url'
                        />

                    </div>)
                }
            </div>
            
            <button 
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
