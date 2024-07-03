import { StaticImageData } from "next/image";

export type GameMode = 'easy' | 'hard';

export type MODES = {
    [key in GameMode]: ContType[];
};
  
export type ContType = {
    examImg: string | StaticImageData;
    answerImg: string | StaticImageData;
    ingState: boolean;
    answer: boolean;
}