import { useAtom } from "jotai";
import { collectiblesAtom } from "../context/game";

export function useLetters() {
  const [collectibles] = useAtom(collectiblesAtom);

  return {
    collectibles
  };
}
