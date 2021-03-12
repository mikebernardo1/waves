import React from 'react';
import LibrarySong from '../LibrarySong/LibrarySong'

import './Library.scss'

const Library = ({songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-song'></div>
            {songs.map(song=>(
                <LibrarySong 
                songs={songs}
                setCurrentSong={setCurrentSong}
                song={song}
                key={song.id}
                id={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                />
            ))}
        </div>
    )
}

export default Library;