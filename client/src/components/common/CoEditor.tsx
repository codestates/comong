import React, { Component, useRef } from "react";
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";

const CoEditor = () => {
    const editorRef = useRef<Editor>()

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
          .addHook("addImageBlobHook", (blob, callback) => {
            (async () => {
              let formData = new FormData();
              formData.append("file", blob);
  
              console.log("이미지가 업로드 됐습니다.");
  
              const { data: filename } = await axios.post(
                "/file/upload",
                formData,
                {
                  header: { "content-type": "multipart/formdata" },
                }
              );
              // .then((response) => {
              //   console.log(response);
              // });
  
              const imageUrl = "http://localhost:8080/file/upload/" + filename;
  
              // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
              callback(imageUrl, "iamge");
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
      </div>
    )
}

const Label1 = styled.span.attrs(props => ({

}))`
    font-weight: 500;
    font-size: 26px;

`

export default CoEditor