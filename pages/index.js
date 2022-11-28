import Head from 'next/head'
import Sidebar from "../components/Sidebar"
import Center from "../components/Center"
import Player from "../components/Player"
import {getSession} from "next-auth/react"
import {currentTrackState, isPlayingState} from "../atoms/songAtom"
import {useRecoilState} from "recoil"
import { useEffect, useState } from 'react'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

export default function Home() {
  const [plyState, setPlyState] = useRecoilState(isPlayingState);
  const [crtTrackState, setCrtState] = useRecoilState(currentTrackState);
  const isPpl = () =>{
    plyState ? 
        setPlyState(false)
    
    : setPlyState(true);
  }
  return (
    <div className="bg-orange-400 h-screen overflow-hidden">
      <main className="flex" onClick={()=>isPpl()}>
        <Sidebar/>
        <Center/>  
      </main>
      <div className={`sticky bottom-0 ${crtTrackState ? 'inline': 'hidden' }`}>
        <Player/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session=await getSession(context);

  return{
    props: {
      session
    }
  }
}