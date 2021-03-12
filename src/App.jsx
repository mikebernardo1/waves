import React, {useState, useRef} from 'react';
import './styles/App.scss';

import Player from './components/Player/Player';
import Song from './components/Song/Song';
import Library from './components/Library/Library';
import Nav from './components/Nav/Nav'

import data from './data'

const App = () => {

  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  const roundedCurrent= Math.round(current);
  const roundedDuration= Math.round(duration);
  const animation= Math.round((roundedCurrent/roundedDuration)*100)

  setSongInfo({
    ...songInfo, 
    currentTime:current, 
    duration, 
    animationPercentage: animation})
};

const songEndHandler = async () => {
  let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    setCurrentSong(songs[currentIndex + 1] || songs[0]);
    if(isPlaying) audioRef.current.play();
}

  return (
    <div className={`App ${libraryStatus? 'library-active': ''}`}>
      <Nav
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong}/>
      <Player
      audioRef={audioRef} 
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      />
      <Library
      audioRef={audioRef}
      songs={songs}
      setSongs={setSongs}
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying}
      libraryStatus={libraryStatus}
      currentSong={currentSong}
      />
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}>
      </audio>
    </div>
  )
}

export default App;