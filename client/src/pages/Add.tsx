import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

// TOAST UI Editor Plugins
// import 'tui-chart/dist/tui-chart.css';
// import chart from '@toast-ui/editor-plugin-chart';
// import 'highlight.js/styles/github.css';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
// import uml from '@toast-ui/editor-plugin-uml';

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 80%;
`;

const Add = () => {
  const editorRef = useRef<any>();
  const handleContents = () => {
    const data = editorRef.current;
    console.log(data);
  };
  handleContents();

  const editor = new Editor({
    // el: document.querySelector('#editor'),
    height: '600px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
  });

  return (
    <AddContainer>
      <Editor
        initialValue="내용을 입력해 주세요"
        usageStatistics={false}
        // plugins={[
        //   chart,
        //   codeSyntaxHighlight,
        //   colorSyntax,
        //   tableMergedCell,
        //   uml,
        // ]}
        ref={editorRef}
      />

      <button onClick={() => handleContents}>등록</button>
    </AddContainer>
  );
};

export default Add;
