import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://live.staticflickr.com/65535/48329213772_3819880e7f_z.jpg)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Aute reprehenderit minim ea minim nisi eu ullamco est tempor in qui commodo.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Tuesday</span>
                <h4>07</h4>
            </div>

        </div>
    )
}
