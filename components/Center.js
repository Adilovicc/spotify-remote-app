import React, { useEffect, useState } from 'react'
import {useSession} from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';
const colors=[
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
];
 //-------BG PALETTE-------
 //---koristeno za isprobavanje svijetlog/tamnog režima (V1)
 const BrightPalett={
    baseClr:"white",
    secoClr:"black"
}
const DarkPalett={
    baseClr:"black",
    secoClr:"white"
}
//-----------------------
function Center() {
    const {data:session}=useSession();
    const [color, setColor]=useState(null); 
    const [bgMode, setBgMode]=useState(DarkPalett); // V1
    const [selectedPlaylistId, selectPlaylistId] = useRecoilState(playlistIdState);
    const [playlist, selectPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();
    useEffect(()=>{
       setColor(shuffle(colors).pop());
       },[selectedPlaylistId]
    );
    
    useEffect(()=>{
       spotifyApi.getPlaylist(selectedPlaylistId).then((item)=>{
         selectPlaylist(item.body);
       }).catch((err)=>console.log("Stg went wrong"));
       console.log("----pl-----");
       console.log(playlist);
       console.log("----pl-----");
    },[selectedPlaylistId,spotifyApi]);
    
    function settingBackgroundPalette(){ // V1
         if(bgMode == BrightPalett){
            setBgMode(DarkPalett);
         }
         else setBgMode(BrightPalett);
         console.log(bgMode.baseClr);
    }
    
  return (
    <div className={`justify-end bg-${bgMode && bgMode.baseClr} pb-28 h-screen flex-grow text-black overflow-y-scroll scrollbar-hide`}>
       <header className="absolute top-5 right-8">
           <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80
           cursor-pointer rounded-full w-60 text-white h-12 pl-1 shadow-md shadow-black/50
           ">
              <img className='rounded-full w-10 h-10 bg-black' src={session?.user.image} />
              <h2>
                {session?.user.name}
              </h2>
              <ChevronDownIcon className="h-5 w-5" />
           </div>
       </header>
       {/*  (---V1---)
          <div className="absolute top-8 ml-8">                 
            <button className="w-20 h-6 bg-white" onClick={()=>settingBackgroundPalette()}>Klik</button>
          </div>*/}
       <section className={`flex items-end bg-gradient-to-b to-black ${color} h-80 top-10`}>
           <div className="ml-8 flex">
             <img className="h-44 w-44 rounded " src={playlist?.images[0].url || session?.user.image}></img>
             <div className="flex items-end text-white pl-5">
               <div>
                <p>PLAYLIST</p>
                <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
               </div>
             </div>
           </div>
        </section>
        <div>
           <Songs/>
        </div>
    </div>
  )
}

export default Center