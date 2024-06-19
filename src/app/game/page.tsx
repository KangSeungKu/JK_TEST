"use client";

import Image, { StaticImageData } from "next/image";
import {useRouter} from "next/navigation";
import { useState } from "react";

import ingTitle2 from "@/../public/game_ing_title_02.png";
import gameEnd2 from "@/../public/game_end_02.png";
import starOn from "@/../public/star_on.png";
import starOff from "@/../public/star_off.png";
import playNowBtn from "@/../public/play_now_button.png"

type contType = {
    examImg: string | StaticImageData;
    answerImg: string | StaticImageData;
    ingState: boolean;
    answer: boolean;
  }

export default function Login() {
    const imgWidth: number = 100;
  const imgHeight: number = 100;
  const imgSource = [
    // {
    //   examImg: content1,
    //   answerImg: answer1,
    //   ingState: false,
    //   answer: false,
    // },
    // {
    //   examImg: "/JK_TEST/content/content.png",
    //   answerImg: "/JK_TEST/content/answer.png",
    //   ingState: false,
    //   answer: false,
    // },
    {
      examImg: "/JK_TEST/content/content_01.png",
      answerImg: "/JK_TEST/content/answer_01.png",
      ingState: false,
      answer: false,
    },
    {
      examImg: "/JK_TEST/content/content_02.png",
      answerImg: "/JK_TEST/content/answer_02.png",
      ingState: false,
      answer: false,
    },
    {
      examImg: "/JK_TEST/content/content_03.png",
      answerImg: "/JK_TEST/content/answer_03.png",
      ingState: false,
      answer: false,
    },
    {
      examImg: "/JK_TEST/content/content_04.png",
      answerImg: "/JK_TEST/content/answer_04.png",
      ingState: false,
      answer: false,
    },
    {
      examImg: "/JK_TEST/content/content_05.png",
      answerImg: "/JK_TEST/content/answer_05.png",
      ingState: false,
      answer: false,
    },
  ];

  const [contents, setContents] = useState<contType[]>(imgSource);
  const [contentNumber, setContentNumber] = useState<number>(0);
  const [answerNumber, setAnswerNumber] = useState<number>(~~(Math.random() * 4));

  // useEffect(() => {
  //   setContents(imgSource);
  
  // }, [])
  

  const clickImgHandle = (pickNumber: number) => {
    setContents((prev) => prev.map((cont, idx) => contentNumber !== idx ? cont : ({...cont, ingState: true, answer: answerNumber === pickNumber})));
    setContentNumber((prev) => prev + 1);
    setAnswerNumber(~~(Math.random() * 4));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-1 bg-[#fff6c4] bg-cover bg-no-repeat bg-center">
      {contentNumber === imgSource.length ? (
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
                className="bg-cover bg-center border-solid border-2 border-[#1f2f83] rounded-lg overflow-hidden shadow-md" 
                style={{ backgroundImage: `url(${idx === answerNumber ? contents.at(contentNumber)!.answerImg : contents.at(contentNumber)!.examImg})` }}
                key={idx} 
                onClick={() => clickImgHandle(idx)}
              >
              </div>
            )}
          </div>
        </div>
          {/* <div className="flex flex-col justify-between h-screen py-[10vh]">
            <div>
              <Image src={ingTitle} alt=""/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {Array.from({length: 4}).map((_, idx) => 
                <div className="border-solid border-2 border-[#1f2f83] rounded-lg overflow-hidden shadow-md" key={idx} onClick={() => clickImgHandle(idx)}>
                  <Image className="w-full" src={idx === answerNumber ? contents.at(contentNumber)!.answerImg : contents.at(contentNumber)!.examImg} alt=""/>
                </div>
              )}
            </div>
          </div> */}
        </>
      )}

    </main>
  );
}