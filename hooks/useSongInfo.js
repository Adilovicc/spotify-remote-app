import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'
import {useRecoilState} from 'recoil'
import {currentTrackState} from '../atoms/songAtom'

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentIdTrack,setCurrentIdTrack] = useRecoilState(currentTrackState);
    const [songInfo,setSongInfo]= useState(null);

    useEffect(()=>{
     const fetchSongInfo = async () =>{
        if(currentIdTrack){
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentIdTrack.id}`,
                 {
                   headers: {
                       Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                   }
                 }
            ).then(res=>res.json());
            setSongInfo(trackInfo);
            console.log("BRZZZRZRZRZRZRRZRZRZRRRRR");
            console.log(trackInfo);
            console.log("BRZZZRZRZRZRZRRZRZRZRRRRR");
        }
     }
     fetchSongInfo();
    },[currentIdTrack, spotifyApi])
    
    return songInfo;
}

export default useSongInfo