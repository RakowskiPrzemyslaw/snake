import { useAtom } from "jotai";
import { roundAtom } from "./context/game";
import { Logo } from "./Logo";

export function HtmlInterface() {
  const [{ round, score }] = useAtom(roundAtom);

  return (
    <>
      <div className="fixed z-10 text-white w-full p-2">
        <Logo />
      </div>

      <div className="fixed z-10 flex justify-between w-full bottom-0 text-white p-2">
        <h2 className="text-3xl">{`Score: ${score}`}</h2>

        <h2 className="text-3xl">{`Round: ${round}`}</h2>
      </div>
    </>
  );
}
