import moment from 'moment';
// import 'moment/locale/es';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    
    // moment.locale('es');
    const noteDate = moment(active.date);
    

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureClick = () => {
        // console.log('picture clicked');
        document.querySelector("#fileSelector").click();
    }

    const handleFileChange = (e) => {
        //console.log(e);
        const file = e.target.files[0];
        //console.log(file);
        if (file){
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('LLLL') }</span>

            <input
                type="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
                id="fileSelector"
            >
            </input>

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>

            </div>
        </div>
    )
}
