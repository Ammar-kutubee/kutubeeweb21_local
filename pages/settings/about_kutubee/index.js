import i18next from 'i18next';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import BeeWithKutubee from '../../../components/Bees/BeeWithKutubee';

const AboutKutubee = () => {

    const { t, i18n } = useTranslation([], { useSuspense: false });

    return (
        <>
            <BeeWithKutubee height={133.09} width={125} />
            {i18next.language == "en" ?
                <>
                    <div style={{ marginTop: '30px' }} className="settingsNormalText rtlDir divBig">
                        منصة كتبي للقراءة التفاعلية تحتوي على أكثر من 1500 قصة أطفال مصورة باللغتين العربية والإنكليزية من 20 دار نشر مختارة مثل كولينز والحدائق وأصالة، والسلوى وغيرها. وتعتبر مصدر مساند للعملية التعلمية، يمكن استخدامه على الأجهزة المختلفة - من أجهزة حاسوب أو تابلت - في المدرسة والبيت أيضًا. يحتوي التطبيق على ميزة المؤثرات الصوتية، ومشاركة التسجيل الصوتي وحفظه، علاوة ميزات أخرى التي من شأنها تشجيع الطلاب على القراءة والاستمتاع بها.
                    </div>
                    <div className="settingsNormalText rtlDir divBig">
                        كما تتكون المنصة من بوابة المعلم أيضًا وهي عبارة عن لوحة تحكم خاصة بالمدرسة والمعلمات والمعلمين بالمساعدة على المهام المتعلقة بتحسين القراءة التفاعلية في الصفوف وتطويرها، حيث تمكنهم من تشكيل مجموعات صفية، وتعيين الواجبات المدرسيَّة المتعلقة بالقصص، ومتابعة تقدُّم الطلبة في القراءة بناء على معايير عربي ٢١.

                        تُصنَّف الكتب في كتبي بالعربية أو الإنكليزية بحسب:
                    </div>

                    <div className="settingsNormalText rtlDir divBig">

                        <ol>
                            <li>الموضوع</li>
                            <li>برنامج البكالوريا الدولية(PYP)</li>
                            <li>العمر</li>
                            <li>القراءة المتدرجة</li>
                        </ol>
                    </div>

                    < div className="settingsNormalText rtlDir divBig">
                        المنصة تخدم الفئات العمرية من الصف KG1 وحتى الصف السادس. والاشتراك سنوي يعطي امكانية الوصول الى كل محتويات المنصة من البيت أو المدرسة.
                    </ div>
                </>
                :
                <>
                    <div style={{ marginTop: '30px' }} className="settingsNormalText  divBig">
                        Kutubee is an Interactive Reading Platform that contains more than 1200 carefully selected Arabic and English kids stories from well-known publishers in an interactive way. It helps the teachers in assigning homework and tracking of students’ progress and performance.

                    </div>

                    < div className="settingsNormalText divBig">
                        The stories are categorized on the platform according:
                    </div>
                    < div className="settingsNormalText divBig">
                        <ol>
                            <li>Subjects</li>
                            <li>PYP Program</li>
                            <li>Levelled Reading</li>
                            <li>Age</li>
                        </ol>

                    </ div>
                    < div className="settingsNormalText divBig">
                        The student can download the stories and read them offline. Once the stories are downloaded they will have three tasks:
                    </ div>
                    < div className="settingsNormalText divBig">

                        <ol>
                            <li>&nbsp;Listening with word highlighting and zoom function.</li>
                            <li>&nbsp;Reading with the ability to record the voice, work with texts, work with pictures, and share it with the teacher. Also, the student will be able to write a new end or analyze the story which encourages students to think critically (Inquiry Base).</li>
                            <li>Comprehension Questions at the end of each story which were written by teachers.</li>
                        </ol>

                    </ div>
                    < div className="settingsNormalText divBig">

                        Gamification system to give badges that will encourage students to read more.
                        The platform comes with a backend system to get detailed reports on student progress, give assignments …etc.

                    </ div>
                </>


            }
        </>
    )
}

AboutKutubee.layout = "In";

export default AboutKutubee;