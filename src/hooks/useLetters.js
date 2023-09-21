import { atom, useAtom } from "jotai";

const defaultLetters = [
  { letter: "D", position: { x: -9, y: 4 } },
  { letter: "U", position: { x: 9, y: 2 } },
  { letter: "P", position: { x: 4, y: 3 } },
  { letter: "A", position: { x: -4, y: -4 } },
];

const lettersAtom = atom(defaultLetters);

const eatenLettersAtom = atom([]);

export function useLetters() {
  const [letters, setLetters] = useAtom(lettersAtom);
  const [eatenLetters, setEatenLetters] = useAtom(eatenLettersAtom);

  const eatLetter = (letter) => {
    setEatenLetters((prev) => [...prev, letter]);
    setLetters((prev) => prev.filter((l) => l.letter !== letter));
  };

  const resetLetters = () => {
    setLetters(defaultLetters);
    setEatenLetters([]);
  };

  return {
    letters,
    eatLetter,
    eatenLetters,
    resetLetters,
  };
}
