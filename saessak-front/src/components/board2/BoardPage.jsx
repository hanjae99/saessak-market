import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Header from "../main/Header";
import NoticeBoardList from "./NoticeBoardList";
import { call } from "../../ApiService";
import BoardListViewer from "./BoardListViewer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BoardPage = () => {
  const { boardName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewData, setVeiwData] = useState([]);
  const [viewList, setViewList] = useState({
    boardNumber: "글번호",
    title: "제목",
    writer: "작성자",
    regTime: "작성시간",
    recommend: "조회수",
  });
  const [pageSize, setPageSize] = useState(15);
  const [totalPageSize, setTotalPageSize] = useState(1);
  const [userRole, setUserRole] = useState("any");
  const bn = boardName !== undefined ? boardName : "main";
  const navigate = useNavigate();

  useEffect(() => {
    const url =
      "/board/" +
      bn +
      (searchParams.get("page") > 0 ? "/" + searchParams.get("page") : "/1");
    // console.log("url :", url);
    call(url, "GET").then((response) => {
      // console.log("response",response);
      if (response && response.list !== undefined) {
        setVeiwData(response.list.map(p=>({...p, regTime:new Date().getDate() === new Date(p.regTime).getDate()
          ? new Date(p.regTime).toLocaleTimeString()
          : new Date(p.regTime).toLocaleDateString()})));
        setPageSize(response.pageSize);
        setTotalPageSize(response.totalPageSize);
        setUserRole(response.viewerRole);
      }
    });
  }, [boardName, window.location.search]);

  const onViewListClick = (e, p) => {
    navigate("/board/detail/" + bn + "/" + p.id);
  };

  if (viewData.length < pageSize) {
    const dumy = pageSize - viewData.length;
    for (let i = 0; i < dumy; i++) {
      viewData.push({ id: "nodata" });
    }
  }

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <BoardListViewer
            dataAry={viewData}
            viewList={viewList}
            onClick={onViewListClick}
          />
          <div className="board-footer">
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link">
                  <FaArrowLeft />
                </button>
              </li>
              <li className="page-item">
                <button className="page-link">
                  <FaArrowRight />
                </button>
              </li>
            </ul>
            {(() => {
              switch (userRole) {
                case "USER":
                  return bn !== "ntc" ? (
                    <Link to={"/board/write/" + bn}>
                      <button className="new-text">작성</button>
                    </Link>
                  ) : (
                    ""
                  );
                case "ADMIN":
                  return bn === "ntc" ? (
                    <Link to={"/board/write/" + bn}>
                      <button className="new-text">작성</button>
                    </Link>
                  ) : (
                    ""
                  );
                default:
                  return "";
              }
            })()}
          </div>
        </div>

        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardPage;
