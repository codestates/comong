import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';

interface ViewerProps {
}

const Preview = () => {
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
        <Label1>미리보기</Label1>
        <Viewer
        initialValue={editorState.contents}
      	ref={ViewerRef}
	    />
        </>
    )
}

const Label1 = styled.span.attrs(props => ({

}))`
    font-weight: 500;
    font-size: 26px;

`

export default Preview