import React, { Component, useRef, useEffect, useCallback } from "react";
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { setEditorState, pushImage } from '../../redux/modules/editorSlice'

const CoEditor = () => {
    const editorRef = useRef<any>()
    const editorState = useAppSelector((state) => state.editorSlice);
    const dispatch = useAppDispatch();


    //R2 업로드 URL 요청
    const getImageUploadUrl = async () => {
      const res = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_URL,
        url: '/items/imageuploadurl'
      })
      //console.log(res.data.uploadURL)
      const results = res.data.uploadURL
      return results
    }



    const handleSave = async () => {
      const contents = await editorRef.current.getInstance().getMarkdown()
      //console.log(contents);
      await dispatch(setEditorState(contents)); 
    };

    
    useEffect(() => {
      if (editorRef.current) {
        // 기존에 Image 를 Import 하는 Hook 을 제거한다.
        editorRef.current.getInstance().removeHook("addImageBlobHook");
  
        // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
        editorRef.current
          .getInstance()
          .addHook("addImageBlobHook", (blob: any, callback: any) => {
            (async () => {
              let formData = new FormData();
              formData.append("file", blob);
  
              const filename: AxiosResponse<any, any> = await axios.post(
                await getImageUploadUrl(),
                formData,
                {
                  headers: { "content-type": "multipart/formdata" },
                }
              );

              console.log(filename)

              const imageUrl = filename.data.result.variants[1];
              const thumbnailUrl = filename.data.result.variants[0];
              dispatch(pushImage(thumbnailUrl))
              callback(imageUrl, "image");
            })();
  
            return false;
          });
      }
  
      return () => {};
    }, [editorRef]);

    return (
      <div>
        <>
    <Label1>상세설명</Label1>
    <Editor
      initialValue={editorState.contents}
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={true}
      onChange={handleSave}
      ref={editorRef}
    />
    </>;
    <Btn1 onClick={handleSave}/>
      </div>
    )
}

const Label1 = styled.span.attrs(props => ({

}))`
    font-weight: 500;
    font-size: 26px;

`

const Btn1 = styled.button`
  width: 100px;
  height: 100px;
`

export default CoEditor