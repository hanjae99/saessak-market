import React from 'react'
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';


const BoardViewer = ({contents}) => {
  return <Viewer initialValue={String(contents)} />;
}

export default BoardViewer