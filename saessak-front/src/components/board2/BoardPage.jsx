import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../main/Header";
import NoticeBoardList from "./NoticeBoardList";
import { call } from "../../ApiService";

const BoardPage = () => {
  const { boardName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const url =
      "/board/" +
      (boardName !== undefined ? boardName : "main") +
      (searchParams.get("page") ? "/" + searchParams.get("page") : "/1");
    console.log("url :", url);
    call(url, "GET").then((response) => {
      console.log(response);
    });
  }, [boardName, window.location.search]);

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">{boardName}</div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardPage;
