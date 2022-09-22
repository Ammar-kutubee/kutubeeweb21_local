import React, { useEffect, useRef } from 'react'


export default function NumberOfQuestions({ questions, activeQuestion, currentLanguage }) {
    useEffect(() => {
        // scrollViewRef.current.scrollTo({ x: activeQuestion * mScale(64), y: 0, animated: true })
        return () => {

        }
    }, [activeQuestion])
    console.log('currentLanguage', currentLanguage)
    return (
        <>
            <div class="qnwrapper">
                <div className={'line-wrapper'}>
                    <div className="numberOfQuestionsLine" />
                    <div style={{ display: 'flex', position: 'relative', zIndex: 2, gap: '2vw' }}>
                        {
                            questions.map((question, index) => {
                                return (

                                    <div className={`questionNumberBox  ${activeQuestion == index ? "border-blue" : ""}  ${activeQuestion > index ? 'backgblue border-blue' : ''}`}>
                                        <div className={`questionNumberBoxText  ${activeQuestion == index ? "color-blue" : "color-grey"}  ${activeQuestion > index ? "color-white" : ''}`}>
                                            {index + 1}</div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
