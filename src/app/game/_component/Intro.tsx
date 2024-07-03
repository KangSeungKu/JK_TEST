import Image from "next/image";
import gameTitle from "@/../public/game_title.png";

export default function Intro() {
  return (
    <main className="flex min-h-screen flex-col items-end justify-between p-[5vw] bg-[url('/JK_TEST/start_intro_bg.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="mt-[5vh]">
        <Image src={gameTitle} alt=""/>
      </div>
      <div className="flex flex-col gap-4 p-12">
      </div>
    </main>
  );
}
