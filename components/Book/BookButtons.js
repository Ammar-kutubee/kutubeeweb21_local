import React, { useEffect, useState } from 'react'
import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useRouter } from 'next/router'
import BookButton from './BookButton'

export default function BookButtons({ onButtonPressed, bookStatus, progress, language, bookProgress,userType }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    return (
        <div className="buttonsWrapper">
            <>

            {bookProgress.audioExist &&
                    <BookButton 
                    language={language}

                    text={t('book.listen', { lng: language })} finished={bookProgress.bookProgress.readmode} onPress={() => {
                        onButtonPressed('listen')
                    }} />


                }
                
            <BookButton text={t('book.read', { lng: language })}

language={language}

                    finished={bookProgress.bookProgress.stdmode}
                    onPress={() => {
                        // console.log('wwwww')
                        onButtonPressed('read')
                    }} />
                

                {bookProgress.quizExist &&
                    <BookButton
                    language={language}
                        finished={bookProgress.bookProgress.quiz}
                        text={t('book.quiz', { lng: language })}
                        grey
                        onPress={() => {
                            if(userType === "teacher") {
                                onButtonPressed('quiz-teacher')
                              //  onButtonPressed('quiz')

                            }
                            else if (bookProgress.bookProgress.stdmode || bookProgress.bookProgress.readmode) {
                                onButtonPressed('quiz')
                            } else {
                                onButtonPressed('quiz-closed')
                            }

                        }} />
                }
            </>

        </div>
    )
}
