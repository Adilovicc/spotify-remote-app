import React, {useEffect, useState} from 'react'
import useSpotify from '../hooks/useSpotify'
import {playlistState} from '../atoms/playlistAtom'
import {useRecoilState} from 'recoil'
import { currentTrackState, isPlayingState } from '../atoms/songAtom'
import { truncate } from 'lodash';

function Songs() {
  const spotifyApi = useSpotify();
  const [selectedPlaylist, nesto] = useRecoilState(playlistState);
  const [songs,setSongs] = useState([]);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () =>{
     setIsPlaying(true);
     spotifyApi.play({
        uris: [currentSongId?.uri]
     })
     console.log(currentSongId?.uri);
  }

  useEffect(() => {
    setSongs(selectedPlaylist?.tracks.items);
    console.log(selectedPlaylist);
    console.log(songs);
  },[selectedPlaylist]);

  return (
    <div className="space-y-2 flex flex-col pt-4">
    {
      songs && songs.map((item, i)=>(
        <div key={item.track.id} onClick={()=>{setCurrentSongId(item.track); playSong();}} className="text-white hover:bg-gray-900 py-4 px-8 rounded-md grid cursor-pointer grid-cols-2 transform transition duration-500 ease-out">
            {/* PRVI DIO - LIJEVO - broj, slika, ime pjesme i izvodjaca */}
            <div className="flex space-x-2 items-center">
               <div className="text-sm pr-5 text-gray-400">{i+1}</div>
               <img src={item.track.album.images[0].url} className="w-10 h-10"/>
               <div>
                 <div className="text-sm md:text-[15px] font-semibold w-32 lg:w-64 truncate">{item.track.name}</div>
                 <div className="text-xs md:text-sm font-thin text-gray-400">{item.track.artists.map((it, i)=>( (i>0) ?" x "+ it.name : it.name))}</div>
               </div>
            </div> 
            {/* DRUGI DIO - SREDINA/KRAJ - ime albuma / trajanje */}
            <div className="flex items-center text-sm font-light justify-end md:justify-between">
                <p className="hidden md:inline w-28 lg:w-36 truncate text-gray-400">{item.track.album.name}</p>
                <p className="text-gray-400">
                   {Math.floor(item.track.duration_ms/60000)+":"+ 
                   (Math.floor(Math.floor(item.track.duration_ms-Math.floor(item.track.duration_ms/60000)*60000)/1000)>9 ? 
                   Math.floor(Math.floor(item.track.duration_ms-Math.floor(item.track.duration_ms/60000)*60000)/1000) :
                   "0"+Math.floor(Math.floor(item.track.duration_ms-Math.floor(item.track.duration_ms/60000)*60000)/1000))}
                </p>
            </div>
        </div>
      ))

    }
    </div>
  )
}

export default Songs