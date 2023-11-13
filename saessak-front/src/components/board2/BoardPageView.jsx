import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import NoticeBoardList from "./NoticeBoardList";
import { call } from "../../ApiService";
import BoardListViewer from "./BoardListViewer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BoardPageView = () => {
  const { boardName, page } = useParams();
  const [viewData, setVeiwData] = useState([]);
  const [viewList] = useState({
    boardNumber: "글번호",
    title: "제목",
    writer: "작성자",
    regTime: "작성시간",
    clickCount: "조회수",
  });
  const [pageSize, setPageSize] = useState(10);
  const [totalPageSize, setTotalPageSize] = useState(1);
  const [userRole, setUserRole] = useState("any");
  const bn = boardName !== undefined ? boardName : "main";
  const navigate = useNavigate();

  useEffect(() => {
    const url = "/board/" + bn + (page > 0 ? "/" + page : "/1");
    // console.log("url :", url);
    call(url, "GET").then((response) => {
      console.log("response", response);
      if (response && response.list !== undefined) {
        setVeiwData(response.list.map(p => ({
          ...p, regTime: new Date().getDate() === new Date(p.regTime).getDate()
            ? new Date(p.regTime).toLocaleTimeString()
            : new Date(p.regTime).toLocaleDateString()
        })));
        setPageSize(response.pageSize);
        setTotalPageSize(response.totalPageSize>0?response.totalPageSize:1);
        setUserRole(response.viewerRole);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardName, page]);

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
                <button className="page-link" disabled={Math.floor((page > 0 ? page : 1) / 10) * 10 + 1 === 1} onClick={() => {
                  navigate("/board/list/" + bn + "/" + ((Math.floor((page > 0 ? page : 1) / 10)+1) * 10));
                }}>
                  <FaArrowLeft />
                </button>
              </li>
              {
                (() => {
                  let thisPage = (page > 0 ? page : 1);
                  let startPage = Math.floor((thisPage-1) / 10) * 10 + 1;
                  let endPage = Math.ceil(thisPage / 10) * 10 > totalPageSize ? totalPageSize : Math.ceil(thisPage / 10) * 10;
                  let result = [];
                  let style = {
                    height: '41px',
                    lineHeight: '40px',
                    cursor: 'pointer',
                    // color: 'blue',
                  };
                  // console.log(startPage,endPage,endPage - startPage + 1);
                  for (let i = 0; i < 10; i++) {
                    if (i+startPage>endPage) {
                      break;
                    }
                    result.push(<li className="page-item" key={i} style={i+startPage+""===thisPage+""?{...style, fontWeight:'bold'}:style} onClick={() => {
                      navigate("/board/list/" + bn + "/" + (i+startPage));
                    }}>{i+startPage}</li>)
                  }
                  // console.log(result);
                  return result;
                })()
              }
              <li className="page-item">
                <button className="page-link" disabled={Math.ceil((page > 0 ? page : 1) / 10) * 10 > totalPageSize} onClick={() => {
                  navigate("/board/list/" + bn + "/" + (Math.ceil((page > 0 ? page : 1) / 10) * 10 + 1));
                }}>
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

export default BoardPageView;
