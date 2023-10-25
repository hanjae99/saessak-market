import React, { useRef } from 'react'

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import '@toast-ui/editor/dist/i18n/ko-kr';

const BoardEditor = (props) => {
  const {images, setImages, contents, setContents} = props;
  console.log(props);
  const editorRef = useRef();

  const onChange = () => {
    setContents(editorRef.current.getInstance().getHTML());
  };

  const onUploadImage = async (blob, callback) => {
    const url = window.URL.createObjectURL(blob)
    let i1 = [];
    let i2 = i1.concat(images);
    let i3 = i2.concat([{file:blob, url:url}])
    console.log("i1 : " , i1);
    console.log("i2 : " , i2);
    console.log("i3 : " , i3);
    setImages(i3);
    console.log("i4 : ",images);
    callback(url, '');
    return false;
  };

  return (
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
  )
}

export default BoardEditor