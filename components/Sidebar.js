import React, { useEffect, useState } from 'react'
import {
    HomeIcon, 
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LogoutIcon
} from "@heroicons/react/outline";
import {signOut, useSession} from "next-auth/react"
import useSpotify from '../hooks/useSpotify'
import {useRecoilState} from 'recoil'
import {playlistIdState} from "../atoms/playlistAtom"

function Sidebar() {
    const spotifyApi = useSpotify();
    const {data: session,status} = useSession();
    console.log(session);

    const [playlist, setPlaylist] = useState(null);
    const [selectedPlaylist, selectPlaylist] = useRecoilState(playlistIdState);
    console.log(selectedPlaylist);
    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            console.log("sadada")
            spotifyApi.getUserPlaylists().then((data)=>{
                console.log("-------");
                console.log(data.body.items);
                console.log("-------");
                setPlaylist(data.body.items);
            });
        }
    }, [session, spotifyApi])

  return (
    <div className="hidden text-gray-500 w-[24rem] text-xs sm:max-w-[10rem] md:max-w-[13rem] lg:text-sm lg:max-w-[15rem] p-5 pb-28 border-r border-gray-900 bg-black h-screen overflow-y-scroll scrollbar-hide md:inline-flex">
        <div >
            <button onClick={()=>{signOut()}} className="flex items-center pb-2 space-x-4 hover:text-white">
                <LogoutIcon className="h-5 w-5"/>
                <p>Log out</p>
            </button>

            <button className="flex items-center pb-2 space-x-4 hover:text-white">
                <HomeIcon className="h-5 w-5"/>
                <p>Home</p>
            </button>

            <button className="flex items-center pb-2 space-x-4 hover:text-white">
                <SearchIcon className="h-5 w-5"/>
                <p>Search</p>
            </button>

            <button className="flex items-center pb-7 space-x-4 hover:text-white">
                <LibraryIcon className="h-5 w-5"/>
                <p>Your Library</p>
            </button>
            {/*<hr className="border-t-[0.1] pb-3  border-gray-900" />*/}
            {/*-------------------------------*/}
            <button className="flex items-center pb-2 space-x-4 hover:text-white">
                <PlusCircleIcon className="h-5 w-5"/>
                <p>Create Playlist</p>
            </button>
              
            <button className="flex items-center pb-2  space-x-4 hover:text-white">
                <HeartIcon className="h-5 w-5"/>
                <p>Liked Songs</p>
            </button>

            <button className="flex items-center pb-7 space-x-4 hover:text-white">
                <RssIcon className="h-5 w-5"/>
                <p>Your Episodes</p>
            </button>
            
            {playlist && playlist.map((item)=>(
                <p key={item.id} onClick={()=>selectPlaylist(item.id)} className="cursor-pointer pb-2 hover:text-white">{item.name}</p>
            ))}
           
           
        </div>
    </div>
  )
}

export default Sidebar
