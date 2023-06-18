import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useZorm } from "react-zorm";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { NotepadSchema } from "../notepadSchema";
import { Title } from "../components/Title";
import { axiosApi } from "../axiosApi";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Helmet } from "react-helmet";

const texts = {
  title: "Editar notepad",
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o conteudo",
  submit: "Enviar",
  submitSuccess: "Seu notepad foi editado com sucesso!",
  submitFailure: "Houve um erro ao editar o seu notepad.",
};

const initialNotepads = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

export function EditNotepadRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [initialFormState, setInicialFormState] = useState(initialNotepads);
  const zo = useZorm("edit-notepad", NotepadSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await axiosApi.patch(
        `/notepads/${params.id}`,
        event.data
      );
      if (response.data.success) {
        toast(texts.submitSuccess);
        navigate(`/visualizar-notepad/${params.id}`);
      } else {
        toast(texts.submitFailure);
      }
    },
  });

  async function loadNotepads() {
    const response = await axiosApi.get(`/notepads/${params.id}`);
    setInicialFormState(response.data);
  }

  useEffect(() => {
    loadNotepads();
  }, [params.id]);

  return (
    <Card className="bg-amber-200">
      <Helmet>
        <title>Editar Notepad</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/notepads/1", label: "Lista de notepads" },

          {
            href: `/Editar-notepad/${params.id}`,
            label: `Editar Notepad #${params.id}`,
          },
        ]}
      />
      <Title className="text-center uppercase p-2">
        {texts.title} #{params.id}
      </Title>

      <form
        ref={zo.ref}
        className="flex flex-col gap-2 m-2 md:max-w-screen-md md:mx-auto"
      >
        <div>
          <input
            type="text"
            placeholder={texts.titlePlaceholder}
            className="rounded-lg px-2 py-1 border focus:border-yellow-400 outline-none w-full"
            name={zo.fields.title()}
            defaultValue={initialFormState.title}
          />
          {zo.errors.title((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder={texts.subtitlePlaceholder}
            className="rounded-lg px-2 py-1 border focus:border-yellow-400 outline-none w-full"
            name={zo.fields.subtitle()}
            defaultValue={initialFormState.subtitle}
          />
          {zo.errors.subtitle((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div>
          <textarea
            placeholder={texts.contentPlaceholder}
            className="rounded-lg px-2 py-1 border focus:border-yellow-400 outline-none resize-none w-full"
            name={zo.fields.content()}
            defaultValue={initialFormState.content}
          />
          {zo.errors.content((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <Button type="submit">{texts.submit}</Button>
      </form>
    </Card>
  );
}
