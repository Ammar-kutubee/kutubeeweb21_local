import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getQuizData } from '../../../src/utils/apis'

const Quiz2 = ({ userId }) => {

  

    const router = useRouter()
    const { bookId } = router.query
    const [quizData,setQuizData] = useState([]);
    const [currentLanguage,setCurrentLanguage] = useState("ar");



    useEffect(async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setCurrentLanguage(urlParams.get('currentLanguage'));

        const quizDataAll = await getQuizData(bookId);


        if(quizDataAll.quizData !== undefined) {
            setQuizData(quizDataAll.quizData);
        }
    },[])
  
    return(<div>
        <div id="quizteacher-back" style={currentLanguage === "ar"?{textAlign:"right"}:{textAlign:"left"}}
        onClick={(e) => {
            router.push('/book/' + bookId);
        }}
        >
        {currentLanguage === "ar" && <svg style={{transform:"rotate(180deg)"}} width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 10L1 5.5L5.5 0.999999" stroke="#6AC3DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}

{currentLanguage !== "ar" && <svg style={{transform:"rotate(0deg)"}} width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 10L1 5.5L5.5 0.999999" stroke="#6AC3DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}
</div>

        <div className={"quizteacher-layout la-" + currentLanguage}>
            {quizData.map((item) => 
            <div style={{paddingBottom:30,paddingTop:10}}>
                <div className='quizteacher-name'>{item.name}</div>
                <div className='quizteacher-answers'>{item.answers.map((answerItem) => <div className={answerItem.correct === true?"correct-w item-w":"item-w"} style={answerItem.correct === true?{color:"#86CF0E"}:{}}>
                    {item.answerType === "image"?<img src={answerItem.name} />:answerItem.name}</div>)}</div>
            </div>
            
            )}
        </div>
    </div>)
}

Quiz2.layout = "In";

export default Quiz2;