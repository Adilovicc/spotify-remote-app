import react, {useEffect, useState, useCallback} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {currentTrackState, isPlayingState} from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import {debounce} from 'lodash'
import {useSession} from 'next-auth/react'
import useSongInfo from '../hooks/useSongInfo'
import { SpeakerphoneIcon, SwitchHorizontalIcon} from '@heroicons/react/outline'
import { VolumeDownIcon } from '@heroicons/react/outline'
import { RewindIcon, PlayIcon, PauseIcon, ReplyIcon, FastForwardIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { range } from 'lodash'


function Player(){
   const {data:session, status} = useSession();
   const spotifyApi = useSpotify();
   const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
   const [crtTrackState, setCurrentTrackState] = useRecoilState(currentTrackState);
   const [volume, setVolume] = useState(50);
   const songInfo = useSongInfo();
 
   const fetchCurrentSong = () => {
       if(!songInfo){
          spotifyApi.getMyCurrentPlayingTrack((data)=>{
             setCurrentTrackState(data.body?.item);
          });
          spotifyApi.getMyCurrentPlaybackState((data)=>{
             setIsPlaying(data.body?.is_playing);
          });

       }
   }

   const handlePlayPause = () => {
            if(isPlaying){
                setIsPlaying(false);
            }
            else{
                setIsPlaying(true);
            }
   }

   const soundDown = () =>{
      (volume<=10) ? (setVolume(0)) : setVolume(volume-10);
   }

   const soundUp = () =>{
      (volume>=90) ? (setVolume(100)) : setVolume(volume+10);
   }


   useEffect(()=>{
    if (spotifyApi.getAccessToken && !crtTrackState){
        fetchCurrentSong();
        setVolume(50);
    }
   },[currentTrackState, spotifyApi, session]);
   
   useEffect(()=>{
      debouncedAdjustVolume();
   },[volume]);
   
   const debouncedAdjustVolume = useCallback(
       debounce((volume) => { spotifyApi.setVolume(volume).catch(err=>{console.log(err)}); }, 1000), []
   );

   return(
    <>
    {<div className='bg-gradient-to-b from-slate-900 to-slate-800 h-24 w-full text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        
        <div className="flex items-center space-x-4 pl-2">
            <img className="hidden md:inline h-20 w-20" src={songInfo?.album?.images?.[0]?.url} alt="" />
            <div className="space-y-2">
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists[0].name}</p>
            </div>
        </div>

        <div className="flex items-center justify-around">
            <SwitchHorizontalIcon className='button'/>
            <RewindIcon className='button'/>
            
            {isPlaying ? (<PauseIcon className="button w-10 h-10" onClick={()=>handlePlayPause()}/>) : (<PlayIcon className="button w-10 h-10" onClick={()=>handlePlayPause()}/>)}
            <FastForwardIcon className="button"/>
            <ReplyIcon className="button"/>
        </div>

        <div className="flex items-center space-x-4 justify-end">
            <SpeakerphoneIcon onClick={()=>soundDown()} className='button'/>
            <input className="w-24 md:w-32" type="range" value={volume} onChange={(e)=>setVolume(Number(e.target.value))} min={0} max={100}/>
            <VolumeUpIcon onClick={()=>soundUp()} className='button'/>
            <div className="text-white">{volume}</div>
        </div>
    </div> }
    </>
   )
}

export default Player;