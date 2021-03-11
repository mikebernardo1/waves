import React, {useState} from 'react';
import './styles/App.scss';

import Player from './components/Player/Player';
import Song from './components/Song/Song';
import Library from './components/Library/Library'

import data from './data'

const App = () => {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className='App'>
      <Song currentSong={currentSong}/>
      <Player 
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}/>
      <Library/>
    </div>
  )
}

export default App;