import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosApi } from "../axiosApi";
import { Helmet } from "react-helmet";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import { Title } from "../components/Title";
import { ContentCard } from "../components/ContentCard";
import { LinkButton } from "../components/LinkButton";

const pageSize = 4;

const initialNotepadsList = {
  count: 0,
  notepads: [],
};

export function NotepadPageRoute() {
  const params = useParams();
  const offset = (parseInt(params.page) - 1) * pageSize;
  const [notepadsList, setNotepadsList] = useState(initialNotepadsList);
  const pageCount = Math.ceil(notepadsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  async function loadNotepads() {
    const response = await axiosApi.get(
      `/notepads?limit=${pageSize}&offset=${offset}`
    );
    const nextNotepads = response.data;
    setNotepadsList(nextNotepads);
  }

  useEffect(() => {
    loadNotepads();
  }, [params.page]);

  return (
    <Card>
      <Helmet>
        <title>Pagina {params.page}</title>
      </Helmet>
      <Title>
        Pagina {params.page} de {pageCount}
      </Title>
      {notepadsList.notepads.map((notepad: any) => {
        return (
          <ContentCard>
            <Link
              to={`/visualizar-notepad/${notepad.id}`}
              key={notepad.id}
              className=" border-black py-4  cursor-pointer block"
            >
              <div className="font-bold mb-1 text-red-600">#{notepad.id}</div>
              <Title>{notepad.title}</Title>
              <p className="font-normal">{notepad.subtitle}</p>
              <span className="text-xs font-normal">
                {new Date(notepad.created_at).toLocaleDateString()}
              </span>
            </Link>
          </ContentCard>
        );
      })}
      <div className="flex flex-row gap-2">
        {pages.map((page) => (
          <LinkButton
            key={page}
            to={`/notepads/${page}`}
            className={page === parseInt(params.page) ? "bg-red-700" : ""}
          >
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
