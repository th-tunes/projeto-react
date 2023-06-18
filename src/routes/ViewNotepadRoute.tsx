import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosApi } from "../axiosApi";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Helmet } from "react-helmet";
import { Title } from "../components/Title";
import { ContentCard } from "../components/ContentCard";

const initialNotepads = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

export function ViewNotepadRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [notepad, setNotepad] = useState(initialNotepads);

  async function loadNotepads() {
    const response = await axiosApi.get(`/notepads/${params.id}`);
    const nextNotepad = response.data;
    setNotepad(nextNotepad);
  }

  async function deleteNotepad() {
    const response = await axiosApi.delete(`/notepads/${params.id}`);
    if (response.data.success === true) {
      toast(`notepad #${notepad.id} foi deletado com sucesso!`);
      navigate("/");
    } else {
      toast("Houve um erro ao deletar o notepad");
    }
  }

  useEffect(() => {
    loadNotepads();
  }, [params.id]);

  return (
    <Card className="bg-white">
      <Helmet>
        <title>{notepad.title}</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/notepads/1", label: "Lista de Notepads" },
          {
            href: `/visualizar-notepad/${params.id}`,
            label: ` Notepad #${params.id}`,
          },
        ]}
      />
      <div className="flex  flex-row-reverse justify-center gap-2  ">
        <Button className="bg-red-500 hover:bg-red-700" onClick={deleteNotepad}>
          Deletar
        </Button>
        <LinkButton to={`/editar-notepad/${params.id}`}>Editar</LinkButton>
      </div>
      <ContentCard>
        <div className="text-red-600 mb-2">#{notepad.id}</div>
        <Title>{notepad.title}</Title>
        <p className="my-3 font-normal">{notepad.subtitle}</p>
        <p className="font-normal">{notepad.content}</p>
        <div className="text-sm font-normal mt-2">
          {new Date(notepad.created_at).toLocaleDateString()}
        </div>
      </ContentCard>
    </Card>
  );
}
