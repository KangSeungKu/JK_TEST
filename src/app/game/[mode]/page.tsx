import { notFound } from "next/navigation";
import IntroAndGames from "../_component/IntroAndGame";

interface Props {
    params: {
      mode: gameMode;
    };
}

type gameMode = 'easy' | 'hard';

export default function Page({ params }: Props) {
    const { mode } = params;

  if (!['easy', 'hard'].includes(mode)) {
    notFound();
  }

  return (
    <IntroAndGames    
        mode={mode}
    />
  );
}

export async function generateStaticParams() {
    // 정적으로 생성할 모든 경로를 정의합니다.
    return [
      { mode: 'easy' },
      { mode: 'hard' },
      // 필요한 경우 더 많은 경로 추가
    ];
  }