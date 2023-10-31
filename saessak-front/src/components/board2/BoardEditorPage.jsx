import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../main/Header";
import NoticeBoardList from "./NoticeBoardList";
import { call, uploadProduct } from "../../ApiService";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import "@toast-ui/editor/dist/i18n/ko-kr";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../ApiConfig";

let imageList = [];
const BoardEditorPage = () => {
  const [contents, setContents] = useState();
  const [contents, setContents] = useState();
  const navigate = useNavigate();
  const { boardName, boardId } = useParams();
  const editorRef = useRef();
  const boardData = useSelector((state) => state.boardData.bData);

  useEffect(() => {
    imageList = [];
    if (boardId) {
      console.log(boardName, boardId, boardData);
      setContents(
        boardData.list[0].content &&
          boardData.list[0].content
            .split('"')
            .join("'")
            .split("$back$")
            .join(API_BASE_URL)
      );
    }
  }, []);

  const onChange = () => {
    setContents(editorRef.current.getInstance().getHTML());
  };

  const onUploadImage = (blob, callback) => {
    const url = window.URL.createObjectURL(blob);
    const myNewFile = new File([blob], url + "?" + blob.name, {
      type: blob.type,
    });
    imageList.push(myNewFile);
    callback(url, "");
    return false;
  };

  // console.log("contests : ",contents);
  // console.log("imageList : ",imageList);

  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.titleData.value;
    let imgs = imageList.filter((p) => contents.includes(p.name.split("?")[0]));

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", contents.split(API_BASE_URL).join("$back$"));
    if (imgs.length > 0) {
      imgs.forEach((p) => {
        formData.append("imgs", p);
      });
    }

    if (boardId) {
      console.log(contents);
      console.log(imgs);
      uploadProduct(
        "/board/update/" + boardName + "/" + boardId,
        "POST",
        formData
      ).then((response) => {
        console.log("res", response);
        if (response && response.msg === "ok") {
          navigate("/board/detail/" + boardName + "/" + boardId);
        }
      });
    } else {
      uploadProduct("/board/create/" + boardName, "POST", formData).then(
        (response) => {
          navigate("/board/list/" + boardName);
        }
      );
    }
  };

  if (boardId && contents === undefined) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <form action="" className="createNotice" onSubmit={onSubmit}>
            <div className="cartegory-top">
              <div className="cartegory-top-left">
                <select name="category" className="categoryList">
                  <optgroup label="소통">
                    <option value="car1">자유게시판</option>
                  </optgroup>
                  <optgroup label="고객센터">
                    <option value="car2">고객의 소리</option>
                  </optgroup>
                </select>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="notice-title"
                  name="titleData"
                  defaultValue={boardId ? boardData.list[0].title : ""}
                />
              </div>
              <div className="cartegory-top-right">
                <button className="createBtn" onClick={() => {}}>
                  취소
                </button>
                <button type="submit" className="createBtn">
                  저장
                </button>
              </div>
            </div>
            <div className="edit_wrap">
              <Editor
                initialValue={contents || ""}
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                plugins={[colorSyntax]}
                language="ko-KR"
                toolbarItems={[
                  ["heading", "bold", "italic", "strike"],
                  ["image", "link"],
                  ["codeblock"],
                ]}
                ref={editorRef}
                onChange={onChange}
                hooks={{
                  addImageBlobHook: onUploadImage,
                }}
              />
            </div>
          </form>
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardEditorPage;
