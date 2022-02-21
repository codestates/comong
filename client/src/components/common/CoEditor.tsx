import React, { Component, useRef, useEffect } from "react";
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";

const CoEditor = () => {
    const editorRef = useRef<any>()

    //R2 업로드 URL 요청
    const getImageUploadUrl = async () => {
      const res = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_URL,
        url: '/items/imageuploadurl'
      })
      console.log(res.data.uploadURL)
      const results = res.data.uploadURL
      return results
    }

    const handleClick = () => {
      console.log(editorRef.current.getInstance().getMarkdown());
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

              const imageUrl = filename.data.result.variants[1];

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
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={true}
      ref={editorRef}
    />
    </>;
    <Btn1 onClick={handleClick}/>
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