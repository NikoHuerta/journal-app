import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Title"
                    className="notes__title-input"
                />

                <textarea
                    placeholder="Description"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__image">
                    <img
                        src="https://cdn.pixabay.com/photo/2018/01/27/00/38/reptile-3110174_960_720.jpg"
                        alt="imagen"
                    />

                </div>

            </div>
        </div>
    )
}
