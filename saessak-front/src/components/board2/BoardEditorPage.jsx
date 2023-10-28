import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../main/Header';
import NoticeBoardList from './NoticeBoardList';
import { call, uploadProduct } from '../../ApiService';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import '@toast-ui/editor/dist/i18n/ko-kr';

let imageList = [];
const BoardEditorPage = () => {
  let titleData;
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const {boardName} = useParams();
  const editorRef = useRef();

  useEffect(()=>{
    imageList = [];
  },[])

  const onChange = () => {
    setContents(editorRef.current.getInstance().getHTML());
  };

  const onUploadImage = (blob, callback) => {
    const url = window.URL.createObjectURL(blob)
    const myNewFile = new File([blob], url+'?'+blob.name, {type: blob.type});
    imageList.push(myNewFile);
    callback(url, '');
    return false;
  };

  // console.log("contests : ",contents);
  // console.log("imageList : ",imageList);

  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.titleData.value;
    let imgs = imageList.filter(p=>contents.includes(p.name.split('?')[0]));
    
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", contents);
    imgs.forEach(p=>{
      formData.append("imgs", p);
    })
    uploadProduct("/board/create/"+boardName, "POST", formData).then((response) => {
      navigate('/board/list/'+boardName);
      // console.log(response)
      // if (result === "success") {
      //   alert(result);
      //   navigate("/search");
      // } else {
      //   alert(result);
      // }
    });






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
                  defaultValue={titleData!==undefined?titleData:""}
                />
              </div>
              <div className="cartegory-top-right">
                <button className="createBtn" onClick={()=>{}}>
                  취소
                </button>
                <button type="submit" className="createBtn">
                  저장
                </button>
              </div>
            </div>
            <div className="edit_wrap">
      <Editor
        initialValue={contents || ''}
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        plugins={[colorSyntax]}
        language="ko-KR"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['image', 'link'],
          ['codeblock'],
        ]}       
        ref={editorRef}
        onChange={onChange} 
        hooks={{
          addImageBlobHook: onUploadImage
        }}
      />
    </div>
          </form>
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  )
}

export default BoardEditorPage