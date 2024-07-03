"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro";
import GameProgression from "./GameProgression";

interface Props {
    mode: gameMode;
}

type gameMode = 'easy' | 'hard';

export default function IntroAndGames({ mode }: Props) {
    const [introState, setIntroState] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIntroState(false);
        }, 5000);
    
    
        return () => clearInterval(interval);
      }, []);

    return introState ? <Intro/> : <GameProgression mode={mode}/>
}