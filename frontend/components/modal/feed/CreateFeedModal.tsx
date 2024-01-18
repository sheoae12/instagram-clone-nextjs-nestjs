'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './CreateFeedModal.module.css'

export default function CreateFeedModal({ file, onFirstModalClose, onSecondModalClose }: { 
    file: File,
    onFirstModalClose: () => void,
    onSecondModalClose: () => void 
}): React.ReactNode {
    const [imageSrc, setImageSrc] = useState('')
    const default_img = '/sample-images/sample_img01.jpeg'

    const feedEditWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        encodeFileToBase64(file)
        updateFeedEditWrapperHeight()
    }, [file])
         
    const encodeFileToBase64 = (file: File) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImageSrc(reader.result as string)
        }
    };

    // 배경 클릭시 모달 닫기
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()    // 클릭 이벤트가 모달 내부로 전파되지 않도록       
        if (e.target === e.currentTarget) {
            onFirstModalClose()
            onSecondModalClose()
        }
    }

    // 동적으로 가변 높이 구하기
    const updateFeedEditWrapperHeight = () => {
        if (feedEditWrapperRef.current) {
            const modalHeaderHeight = getModalHeaderHeight()
            const modalWrapperHeight = getModalWrapperHeight()
            const feedEditWrapperHeight = modalWrapperHeight - modalHeaderHeight
            feedEditWrapperRef.current.style.height = `${feedEditWrapperHeight}px`
        }
    }

    const getModalHeaderHeight = () => {
        const modalHeader = document.querySelector(`.${styles.modal_header}`)
        return modalHeader ? modalHeader.clientHeight : 0
    };

    const getModalWrapperHeight = () => {
        const modalWrapper = document.querySelector(`.${styles.modal_wrapper}`)
        return modalWrapper ? modalWrapper.clientHeight : 0
    };

    console.log('file', file)

    return (
        <div className={styles.modal_background} onClick={handleBackgroundClick}>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_header}>새 게시물 만들기</div>
                <div className={styles.feed_edit_wrapper} ref={feedEditWrapperRef}>
                    <img className={styles.feed_edit_img} src={imageSrc ?? default_img} />
                </div>
            </div>
        </div>
    )
}