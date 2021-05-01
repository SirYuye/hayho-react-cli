import React, { useRef, useState } from 'react';
import { Toast } from 'antd-mobile';

const doc: any = document;
function Edit() {
    const selection = window.getSelection ? window.getSelection() : doc.selection;
    const width = document.documentElement.clientWidth;
    const refContent = useRef<any>(null);




    const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let selection: any = window.getSelection();
    }


    const blur = () => {
        let selection: any = window.getSelection();
        console.log(selection.getRangeAt)
    }

    const getHtml = () => {
        return refContent.current.innerHTML;
    }

    const setBold = () => {
        console.log(document.execCommand)
        document.execCommand('insertHorizontalRule', false)
    }




    return (
        <div>
            <div ref={refContent}
               style={{height: '200px', border: '1px solid #ccc'}} suppressContentEditableWarning contentEditable={true}
                onClick={(e) => click(e)}
                onBlur={() => blur()}
                placeholder="请输入文章正文内容">
            </div>

            <div>
                <span className='font20' onClick={() => setBold()}>加粗</span>
                <span className='font20' onClick={() => console.log(getHtml())}>生成HTML</span>
            </div>
        </div>
    )
}

export default Edit;
