import React from 'react';
import { NoteScreen } from '../notes/NoteScreen';
// import { NoSelected } from './NoSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            
            <Sidebar />
            <main>

                {/* <NoSelected /> */}
                { <NoteScreen /> }

            </main>


        </div>
    )
}
