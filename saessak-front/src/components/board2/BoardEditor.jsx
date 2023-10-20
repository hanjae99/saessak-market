import React from 'react'

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import '@toast-ui/editor/dist/i18n/ko-kr';

const BoardEditor = ({contents}) => {
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
      />
    </div>
  )
}

export default BoardEditor