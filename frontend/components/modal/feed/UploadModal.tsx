'use client'

import React, { ChangeEvent, useState } from 'react'
import styles from './UploadModal.module.css'
import { createPortal } from 'react-dom'
import CreateFeedModal from './CreateFeedModal'

export default function UploadModal({ onClose }: { 
    onClose: () => void 
}): React.ReactNode {
    const fileInput = React.useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState({});
    const [showSecondModal, setShowSecondModal] = useState(false);
  
    const handleFileOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        fileInput.current?.click();
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setFile(files[0])
            setShowSecondModal(true)
        }
    }

    // 배경 클릭시 모달 닫기
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();    // 클릭 이벤트가 모달 내부로 전파되지 않도록       
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const closeSecondModal = () => {
        setShowSecondModal(false);
    }

    return (
        <>
            <div className={styles.modal_background} onClick={handleBackgroundClick}>
                <div className={styles.modal_wrapper}>
                    <div className={styles.modal_header}>새 게시물 만들기</div>
                    <div className={styles.feed_upload}>
                        <img className={styles.upload_image} src='/icons/icon-create-feed.svg' />
                        <div className={styles.upload_text}>사진과 동영상을 여기에 끌어다 놓으세요</div>
                        <div className={styles.upload_button} onClick={handleFileOpen}>
                            컴퓨터에서 선택
                            <input 
                                type="file" 
                                ref={fileInput} 
                                onChange={onFileChange}
                                style={{ display: "none" }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showSecondModal && createPortal(
                <CreateFeedModal 
                    file={file as File} 
                    onFirstModalClose={onClose}
                    onSecondModalClose={closeSecondModal} 
                />,
                document.getElementById('portal') as Element
            )}
        </>
    )
}