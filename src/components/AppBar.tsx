import { BsPencilSquare as FigureIcon } from "react-icons/bs";
import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";

export function AppBar() {
  return (
    <header className=" flex flex-row justify-around gap-6 items-center bg-amber-200 p-3 shadow-md">
      <Icon />
      <LinkAppBar />
    </header>
  );
}

function Icon() {
  return (
    <Link to="/" className="flex flex-row items-center gap-2">
      <FigureIcon className="text-slate-950 text-4xl" />
      <h1 className="text-xl uppercase font-bold">Notepads</h1>
    </Link>
  );
}

function LinkAppBar() {
  return (
    <nav className="flex flex-row gap-4">
      <LinkButton
        to="/notepads/1"
        className="bg-slate-950 text-yellow-500 text-sm uppercase py-2 px-3 font-bold rounded-md hidden md:block"
      >
        Lista de notepads
      </LinkButton>
      <LinkButton
        to="/criar-notepad"
        className="bg-slate-950 text-yellow-500 text-sm uppercase py-2 px-3 font-bold rounded-md "
      >
        Criar Notepad
      </LinkButton>
    </nav>
  );
}
