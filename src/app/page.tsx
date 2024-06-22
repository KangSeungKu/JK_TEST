"use client"

import Image from "next/image";

import startButton from "@/../public/start_button.png";
import gameTitle from "@/../public/game_title.png";
import easyButton from "@/../public/easy_button.png";
import hardButton from "@/../public/hard_button.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartBtn = (mode: string) => {
    router.replace(`/game?mode=${mode}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-end justify-between p-[5vw] bg-[url('/JK_TEST/start_intro_bg.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="mt-[5vh]">
        <Image src={gameTitle} alt=""/>
      </div>
      <div className="flex flex-col gap-4 p-12">
        <button onClick={() => handleStartBtn("easy")}>
          <Image src={easyButton} alt=""/>
        </button>
        <button onClick={() => handleStartBtn("hard")}>
          <Image src={hardButton} alt=""/>
        </button>
      </div>
    </main>
  );
}
