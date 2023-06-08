import { BsPencilSquare as FigureIcon } from "react-icons/bs";

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
    <a href="/" className="flex flex-row items-center gap-2">
      <FigureIcon className="text-slate-950 text-4xl" />
      <h1 className="text-xl uppercase font-bold">Notepads</h1>
    </a>
  );
}

function LinkAppBar() {
  return (
    <nav className="flex flex-row gap-4">
      <a
        href=""
        className="bg-slate-950 text-yellow-500 text-sm uppercase py-2 px-3 font-bold rounded-md hidden md:block"
      >
        pagina inicial
      </a>
      <a
        href=""
        className="bg-slate-950 text-yellow-500 text-sm uppercase py-2 px-3 font-bold rounded-md "
      >
        Criar Notepad
      </a>
    </nav>
  );
}
