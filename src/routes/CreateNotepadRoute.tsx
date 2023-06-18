import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { axiosApi } from "../axiosApi";
import { NotepadSchema } from "../notepadSchema";
import { useZorm } from "react-zorm";
import toast from "react-simple-toasts";
import { ErrorMessage } from "../components/ErrorMessage";
import { Title } from "../components/Title";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Card } from "../components/Card";
import { Helmet } from "react-helmet";

export function CreateNotepadRoute() {
  const navigate = useNavigate();
  const zo = useZorm("create-notepad", NotepadSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await axiosApi.post("/notepads", event.data);
      if (response.data.success) {
        toast("Seu notepad foi enviado com sucesso!");
        navigate("/");
      } else {
        toast("Houve um erro ao criar o seu notepad.");
      }
    },
  });

  return (
    <Card className="bg-amber-200">
      <Helmet>
        <title>Criar Notepad</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/notepads/1", label: "Lista de Notepads" },
          {
            href: "/Criar-notepad",
            label: "Criar Notepad ",
          },
        ]}
      />
      <form
        ref={zo.ref}
        className=" flex flex-col gap-2 m-2 md:max-w-screen-md md:mx-auto"
      >
        <Title className="text-center uppercase p-2">criar notepad</Title>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite o título"
            className={`rounded-lg px-2 py-1 border focus:border-yellow-400 outline-none w-full ${zo.errors.title(
              "border-red-500 focus:border-red-600"
            )}`}
            name={zo.fields.title()}
          />
          {zo.errors.title((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite o subtítulo"
            className={`rounded-lg px-2 py-1 border focus:border-yellow-400 outline-none w-full ${zo.errors.subtitle(
              "border-red-500 focus:border-red-600"
            )}`}
            name={zo.fields.subtitle()}
          />
          {zo.errors.subtitle((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div className="flex flex-col">
          <textarea
            placeholder="Digite o conteúdo"
            className={`rounded-lg px-2 py-1 border focus:border-yellow-400 outline-none resize-none w-full ${zo.errors.content(
              "border-red-500 focus:border-red-600"
            )}`}
            rows={3}
            name={zo.fields.content()}
          />
          {zo.errors.content((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </Card>
  );
}
