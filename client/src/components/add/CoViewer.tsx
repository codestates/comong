import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';

interface ViewerProps {
}

const CoViewer = () => {
    const ViewerRef = useRef<any>()

    const dispatch = useAppDispatch();
    const editorState = useAppSelector((state) => state.editorSlice);
    //const ViewerInstance = ViewerRef.current.getInstance()

    useEffect(() => {
        console.log(editorState,'234')
        //ViewerInstance.setMarkdown(editorState.contents)
    }, [])
    

    return (
        <>
        <div>213123123123</div>
        <Viewer
        initialValue={editorState.contents}
      	ref={ViewerRef}
	    />
        </>
    )
}

export default CoViewer