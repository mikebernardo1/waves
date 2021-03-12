import React from 'react';
import LibrarySong from '../LibrarySong/LibrarySong'

import './Library.scss'

const Library = ({songs, setCurrentSong, audioRef, isPlaying}) => {
    return (
        <div className='library'>
            <h2>Library</h2>
            <div className='library-song'></div>
            {songs.map(song=>(
                <LibrarySong 
                song={song}
                setCurrentSong={setCurrentSong}
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                />
            ))}
        </div>
    )
}

export default Library;