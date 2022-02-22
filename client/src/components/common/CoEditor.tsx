import React, { Component } from "react";
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";

class CoEditor extends Component {
    constructor(props: any) {
        super(props);
    }
    editorRef = React.createRef<Editor>()

    render() {

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
            ref={this.editorRef}
          />
          </>;
            </div>
          )
    }
}

const Label1 = styled.span.attrs(props => ({

}))`
    font-weight: 500;
    font-size: 26px;

`

export default CoEditor