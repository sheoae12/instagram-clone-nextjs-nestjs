export function getCurrentTime(): Date {
    const curr = new Date();

    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);

    // 한국기준으로 시간대 가져옴
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;   
    const kr_curr = new Date(utc + (KR_TIME_DIFF));

    return kr_curr;
}

export function getTimeAgo(targetDate: Date): string {
    const timeDifference = (getCurrentTime().getTime() - targetDate.getTime()) / 1000; // 차이를 초 단위로 계산
  
    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)}초 전`;
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)}분 전`;
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)}시간 전`;
    } else {
      const daysAgo = Math.floor(timeDifference / 86400);
      return `${daysAgo}일 전`;
    }
}