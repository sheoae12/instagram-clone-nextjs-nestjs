'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './CreateFeedModal.module.css'
import { CommentStatus } from '@/constants/status'
import ToggleSwitch from '@/common/switch/ToggleSwitch'
import { UserSessionInfo } from '@/common/types/user.type'

const MAX_CAPTION_LENGTH = 2200

export default function CreateFeedModal({ user, file, onFirstModalClose, onSecondModalClose }: { 
    user: UserSessionInfo,
    file: File,
    onFirstModalClose: () => void,
    onSecondModalClose: () => void 
}) {
    const [imageSrc, setImageSrc] = useState('')
    const [caption, setCaption] = useState('')
    const [captionLength, setCaptionLength] = useState(0)
    const [notShowLikeView, setNotShowLikeView] = useState<boolean>(false)
    const [disableComment, setDisableComment] = useState<boolean>(false)
    const profileImg = user.profileImg ?? '/icons/default_profile.svg'

    const feedEditWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        encodeFileToBase64(file)
        updateFeedEditWrapperHeight()
    }, [file])

    const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value.length <= MAX_CAPTION_LENGTH) {
            setCaption(e.target.value)
            setCaptionLength(e.target.value.length)
        }   
    }
         
    const encodeFileToBase64 = (file: File) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImageSrc(reader.result as string)
        }
    }

    const handleGoBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onSecondModalClose()
    }

    // 배경 클릭시 모달 닫기
    const handleBackgroundClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
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
    }

    const getModalWrapperHeight = () => {
        const modalWrapper = document.querySelector(`.${styles.modal_wrapper}`)
        return modalWrapper ? modalWrapper.clientHeight : 0
    }

    const publishFeed = (e: React.MouseEvent) => {
        // e.preventDefault()

        const formData = new FormData()
        formData.append('file', file)
        formData.append('uid', user.uid)
        formData.append('caption', caption)

        fetch(`/api/feed`, {
            method: 'POST',
            body: formData
        }).then((res) => {
            console.log('feed status', res.status)
            onFirstModalClose()
            onSecondModalClose()
        }).catch((err) => {
            console.log('feed error', err)
            console.error(err)
        })
    }

    return (
        <div className={styles.modal_background} onClick={handleBackgroundClick}>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_header}>
                    <div className={styles.back_button} onClick={handleGoBack}>←</div>
                    <div>새 게시물 만들기</div>
                    <div className={styles.share_button} onClick={publishFeed}>공유하기</div>
                </div>
                <div className={styles.feed_edit_wrapper} ref={feedEditWrapperRef}>
                    <img className={styles.feed_edit_img} src={imageSrc} />
                    <div className={styles.feed_right}>
                        <div className={styles.feed_profile}>
                            <img src={profileImg}/>
                            <div>{user.nickname}</div>
                        </div>
                        <div className={styles.feed_input_container}>
                            <textarea
                                className={styles.feed_input}
                                placeholder='문구를 입력하세요...'
                                value={caption}
                                onChange={handleCaptionChange}
                            ></textarea>
                        </div>
                        <div className={styles.feed_length}>{captionLength}/{MAX_CAPTION_LENGTH}</div>
                        <div className={styles.feed_etc}>
                            <div>이 게시물의 좋아요 수 및 조회수 숨기기</div>
                            <div className={styles.feed_etc_desc}>이 게시물의 총 좋아요 및 조회수는 회원님만 볼 수 있습니다. 나중에 게시물 상단에 있는 ··· 메뉴에서 이 설정을 변경할 수 있습니다. 다른 사람의 게시물에서 좋아요 수를 숨기려면 계정 설정으로 이동하세요. 더 알아보기</div>
                            <div>댓글 기능 해제</div>
                            <div className={styles.feed_etc_desc}>나중에 게시물 상단의 메뉴(···)에서 이 설정을 변경할 수 있습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}