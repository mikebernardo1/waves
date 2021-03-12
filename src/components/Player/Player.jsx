import React, {useEffect} from 'react';
import './Player.scss';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player = ({songInfo, setSongInfo, audioRef, currentSong, isPlaying, setIsPlaying, songs, setCurrentSong}) => {

    const playSongHandler = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
      };

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };

    const skipTrackHandler = async direction => {
		let currentIndex = songs.findIndex(song => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			await setCurrentSong(songs[currentIndex + 1] || songs[0]);
		} else if (direction === 'skip-back') {
			await setCurrentSong(songs[currentIndex - 1] || songs[songs.length -1]);
		}
	};

    useEffect(() => {
        if (isPlaying) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.then((audio) => {
              audioRef.current.play();
            });
          }
        }
      }, [currentSong, audioRef, isPlaying]);

    const trackAnim ={
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{
                    background:`linear-gradient(to right, 
                    ${currentSong.color[0]}, 
                    ${currentSong.color[1]})`}} 
                    className="track">
                    <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    onChange={dragHandler}
                    type='range'/>
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon 
                className='back' 
                size='2x' 
                icon={faAngleLeft}
                onClick={()=> skipTrackHandler('skip-back')}
                />

                <FontAwesomeIcon 
                onClick={playSongHandler} 
                className='play' 
                size='2x' 
                icon={isPlaying? faPause : faPlay}
                />

                <FontAwesomeIcon 
                className='forward' 
                size='2x' 
                icon={faAngleRight}
                onClick={()=> skipTrackHandler('skip-forward')}
                />
            </div>
        </div>
    )
}

export default Player;