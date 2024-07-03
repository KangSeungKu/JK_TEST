"use client";

import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";

import ingTitle2 from "@/../public/game_ing_title_02.png";
import gameEnd2 from "@/../public/game_end_02.png";
import starOn from "@/../public/star_on.png";
import starOff from "@/../public/star_off.png";
import playNowBtn from "@/../public/play_now_button.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { pop } from "@/utils";
import { ContType, GameMode } from "@/types";
import { GAME_DATA } from "@/constants";

type Props = {
    mode: GameMode,
}

export default function GameProgression({ mode }: Props) {
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const failAudioRef = useRef<HTMLAudioElement | null>(null);

  const [contents, setContents] = useState<ContType[]>(GAME_DATA[mode]);
  const [pickNumber, setPickNumber] = useState<number | null>(null);
  const [contentNumber, setContentNumber] = useState<number>(0);
  const [answerNumber, setAnswerNumber] = useState<number>(~~(Math.random() * 4));

  const clickImgHandle = (imgPickNumber: number, e: MouseEvent) => {
    if (answerNumber === imgPickNumber) {
        successAudioRef.current?.play();
    } else {
        failAudioRef.current?.play();
    }
    setContents((prev) => prev.map((cont, idx) => contentNumber !== idx ? cont : ({...cont, ingState: true, answer: answerNumber === imgPickNumber})));
    setPickNumber(imgPickNumber);
    pop(e);

    // 딜레이 생성
    setTimeout(() => {
      setPickNumber(null);
      setContentNumber((prev) => prev + 1);
      setAnswerNumber(~~(Math.random() * 4));
    }, 1000);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-1 bg-[#fff6c4] bg-cover bg-no-repeat bg-center">
      {contentNumber === contents.length ? (
        <>
          <div className="flex flex-col h-screen justify-center items-center gap-2">
            <Image src={gameEnd2} alt=""/>
            <div className="flex gap-1 mb-[14vh]">
              {contents.map((cont, idx) => 
                <Image className="w-[12vw] h-[12vw]" key={idx} src={cont.answer ? starOn : starOff} alt=""/>
              )}
            </div>
            <div className="absolute bottom-0 p-[2vw]">
              <Image src={playNowBtn} alt=""/>
            </div>
          </div>
          {/* {contents.map((cont, idx) => 
            <p key={idx}>{`${++idx}. ${cont.answer ? "O" : "X"}`}</p>
          )} */}
        </>
      ) : (
        <>
          <div className="flex flex-col h-screen">
            <div>
              <Image src={ingTitle2} alt=""/>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 flex-grow gap-2">
              {Array.from({length: 4}).map((_, idx) => 
                <div 
                  className={`relative bg-cover bg-center border-solid rounded-lg overflow-hidden shadow-md${pickNumber === idx ? pickNumber === answerNumber ? ' border-4 border-[#38b700]' : ' border-4 border-[#ff0000]' : ' border-2 border-[#1f2f83]'}`} 
                  style={{ backgroundImage: `url(${idx === answerNumber ? contents.at(contentNumber)!.answerImg : contents.at(contentNumber)!.examImg})` }}
                  key={idx} 
                  onClick={(e) => clickImgHandle(idx, e)}
                >
                    {pickNumber === idx && 
                        <div className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl ${pickNumber === answerNumber ? 'text-[#38b700]' : 'text-[#ff0000]'}`}>
                            {pickNumber === answerNumber ? (
                                <FontAwesomeIcon icon={faCircleCheck} size="4x" color="#38b700"/>
                            ) : (
                                <FontAwesomeIcon icon={faCircleXmark} size="4x" color="red"/>
                            )}
                        </div>
                    }
                </div>
              )}
            </div>
          </div>
          <audio ref={successAudioRef} src="/JK_TEST/audio/Success_sound_effect.wav" />
          <audio ref={failAudioRef} src="/JK_TEST/audio/Failed_sound_effect.wav" />
        </>
      )}

    </main>
  );
}