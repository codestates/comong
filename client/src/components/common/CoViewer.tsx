import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';
import { EditorState } from '../../redux/modules/editorSlice';

interface CoViewerProps {
    editorState: any;
}

function CoViewer({ editorState }: CoViewerProps) {
  const viewerRef = useRef<any>()

  useEffect(() => {
    setContent()
  }, [editorState])
  
    const setContent = async () => {
      const viewerInstance = await viewerRef.current.getInstance()
      viewerInstance.setMarkdown(editorState)
    }

  return (
    <>
    <
    Viewer
    initialValue={editorState}
    ref={viewerRef}
    />
    </>
  );
}

export default CoViewer;
