"use client";

import Image, { StaticImageData } from "next/image";
import {useRouter} from "next/navigation";
import { MouseEvent, useState } from "react";

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

function pop(e: MouseEvent) {
  for (let i = 0; i < 30; i++) {
    createParticle(e.clientX, e.clientY);
  }
}

function createParticle(x:number, y:number) {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);

  const size = Math.floor(Math.random() * 20 + 5);

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  particle.style.background = `hsl(${Math.random() * 90 + 270}, 100%, ${Math.random() * 25 + 50}%)`;
  particle.style.borderRadius = "50%";
  particle.style.border = "1px solid white";

  particle.animate(
    [
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
        opacity: 1,
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0,
      },
    ],
    {
      duration: 500 + Math.random() * 1000,
      easing: "cubic-bezier(0, .9, .57, 1)",
      delay: Math.random() * 200,
    }
  );
}

export default function Login() {
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
  const [pickNumber, setPickNumber] = useState<number | null>(null);
  const [contentNumber, setContentNumber] = useState<number>(0);
  const [answerNumber, setAnswerNumber] = useState<number>(~~(Math.random() * 4));

  const clickImgHandle = (imgPickNumber: number, e: MouseEvent) => {
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
                  className={`bg-cover bg-center border-solid rounded-lg overflow-hidden shadow-md${pickNumber === idx ? pickNumber === answerNumber ? ' border-4 border-[#38b700]' : ' border-4 border-[#ff0000]' : ' border-2 border-[#1f2f83]'}`} 
                  style={{ backgroundImage: `url(${idx === answerNumber ? contents.at(contentNumber)!.answerImg : contents.at(contentNumber)!.examImg})` }}
                  key={idx} 
                  onClick={(e) => clickImgHandle(idx, e)}
                >
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </main>
  );
}