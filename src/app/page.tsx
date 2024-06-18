"use client"

import Image from "next/image";

import startButton from "@/../public/start_button.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartBtn = () => {
    router.replace('/game');
  }

  return (
    <main className="flex min-h-screen flex-col items-end justify-end p-1 bg-[url('/JK_TEST/start_intro_bg.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="p-[5vw] mb-[2vh]">
        <button onClick={handleStartBtn}>
          <Image src={startButton} alt=""/>
        </button>
      </div>
    </main>
  );
}
