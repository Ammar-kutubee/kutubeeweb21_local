import React, { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook';
// import { saveBookProgress } from '../../../utils/apis';

const Timer = ({ bookEnd, bookLoaded, currentMode, originalReadingTimer, studentReadingTimer, bookId, bookPagesFlipped, bookPagesFlippedOriginal, studentModeFinished, originalModeFinished, loggedInUser, bookData, bookProgressSaved, onBookEnd }) => {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset
    } = useStopwatch({ autoStart: false });
    useEffect(() => {
        // start()
        if (bookLoaded) {
            console.log('-----------------------------------')
            console.log('bookLoadeddddddddddddd', studentReadingTimer)
            let prevSeconds = 0;
            if (currentMode == 'original') {
                prevSeconds = originalReadingTimer
            } else {
                prevSeconds = studentReadingTimer
            }
            let stopwatchOffset = new Date();
            stopwatchOffset = stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + prevSeconds);
            console.log('-----------------------------------')
            reset(stopwatchOffset)
        }
        return () => {

        }
    }, [bookLoaded])
    const calculateTimeSpent = () => {
        let minSeconds, hourSeconds, daySeconds;
        daySeconds = days * 86400;
        hourSeconds = hours * 3600
        minSeconds = minutes * 60

        return daySeconds + hourSeconds + minSeconds + seconds
    }
    useEffect(() => {
        if (bookEnd) {
            // alert('bookEnd + ' + calculateTimeSpent())
            onBookEnd(calculateTimeSpent(), currentMode)
            pause()
        }
        return () => {

        }
    }, [bookEnd])
    useEffect(() => {

        return async () => {
            // console.log('exiiiiiiiiiiiiiiiiit timer',bookProgressSaved)
            // if (!bookProgressSaved) {
            //     let originalTime = originalReadingTimer
            //     let studentTime = studentReadingTimer

            //     if (currentMode == 'original') {
            //         originalTime = calculateTimeSpent()
            //     } else {
            //         studentTime = calculateTimeSpent()
            //     }
            //     console.log('originalTime',originalTime,'studentTime',studentTime)
            //     let bookProgress = {
            //         bookId: bookId,
            //         studentModeTime: studentTime,
            //         originalModeTime: originalTime,
            //         pagesFlipped: bookPagesFlipped,
            //         pagesFlippedOriginal: bookPagesFlippedOriginal,
            //         studentModeFinished: studentModeFinished,
            //         originalModeFinished: originalModeFinished,
            //         minTimeSpent: bookData.minTimeSpent,
            //     }
            //     console.log('************************');
            //     console.log('bookPagesFlippedOriginal', bookProgress, 'originalReadingTimer',originalReadingTimer,'studentTime',studentTime)
            //     console.log('************************');

            //     // clearInterval(this.timer);
            //     // clearTimeout(this.inactivityTimer);

            //     bookProgress.currentMode = currentMode
            //     let pushData = await saveBookProgress(loggedInUser, bookId, bookProgress)
            //     console.log('0000000000000000000000000000000000000')
            //     console.log(pushData)
            //     console.log('0000000000000000000000000000000000000')
            // }
        }
    }, [])
    useEffect(() => {
        console.log('seconds', seconds)
        return () => {

        }
    }, [seconds])
    return (
        <div style={{
            display: 'none'
        }}>

        </div>
    )
}

export default Timer