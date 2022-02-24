import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';

interface CoViewerProps {
    editorState: any;
}

function CoViewer({ editorState }: CoViewerProps) {
  const viewerRef = useRef<any>()

  useEffect(() => {
    console.log(editorState)
    setContent()
    return () => {
    }
  }, [])
  
    const setContent = async () => {
      const viewerInstance = await viewerRef.current.getInstance()
      viewerInstance.setMarkdown(editorState)
      console.log(viewerInstance.setMarkdown)
    }

    const show = () => {
      console.log(editorState)
      const viewerInstance = viewerRef.current.getInstance()
      viewerInstance.setMarkdown(editorState)
    }

  return (
    <>
    <
    Viewer
    initialValue={editorState}
    ref={viewerRef}
    />
    <button style={{width: '200px', height: '200px'}} onClick={show} />
    </>
  );
}

export default CoViewer;
