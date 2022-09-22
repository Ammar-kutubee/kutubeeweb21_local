import { getDynamicBookHeight } from '../../src/utils/apis'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function BookInsideActivity({ roleType, bookData, highlightsNumber, recordingsNumber, notesNumber, goToAdditions, vocabulariesNumber,language }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const loggedInUser = useSelector((state) => state.mainReducer.loggedInUser);

    return (
        <div className="insideActivity container " style={loggedInUser.userData.type !== "teacher"?{}:{alignItems:"flex-start"}}>
            <div className="  iconsactivity bordersgrey">
                {/* <div className="iconWrapper">
                    <div className="iconBox">
                        <svg
                            width='22px'
                            height='20px'
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M11.884.393h0a.412.412 0 01.438-.05c.144.07.235.215.235.374 0 0 0 0 0 0v18.57a.413.413 0 01-.234.373h0a.414.414 0 01-.441-.05l-6.946-5.556-.082-.066H1.428A1.13 1.13 0 01.3 12.859V7.145c0-.621.507-1.128 1.129-1.128h3.425l.082-.066L11.884.393z"
                                    fill="#49ABC6"
                                    stroke="#38395B"
                                    strokeWidth={0.6}
                                />
                                <path
                                    d="M16.472 4.949a.716.716 0 00-1.004 1.017A5.621 5.621 0 0117.142 10a5.621 5.621 0 01-1.674 4.034.714.714 0 101.004 1.015 7.027 7.027 0 002.099-5.05 7.035 7.035 0 00-2.099-5.05z"
                                    fill="#38395B"
                                />
                                <path
                                    d="M18.488 2.936A.715.715 0 0017.48 3.95 8.455 8.455 0 0119.999 10a8.453 8.453 0 01-2.518 6.048.718.718 0 00-.005 1.012.717.717 0 001.012.003A9.866 9.866 0 0021.428 10a9.87 9.87 0 00-2.94-7.064z"
                                    fill="#38395B"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="bookActivityWrapper">
                        <div className="bookActivityNumber">0</div>
                        <div className={`bookActivityTitle ${bookData.language == 'ar' ? 'arabicText' : null}`}>{t('bookScreen.record', { lng: bookData.language })}</div>
                    </div>
                </div> */}


{roleType === "teacher" && <div id="book-resources">
    <h2>{i18n.t("filter.resources",{lng: language})}</h2>
    <div id="book-resources-list">
        {bookData.listenPlanFile !== undefined && <div><a href={"https://school.kutubee.com:4000/" + bookData.listenPlanFile}>{i18n.t("filter.listenPlan",{lng:language})}</a></div>}
        {bookData.activitySheetFile !== undefined && <div><a  href={"https://school.kutubee.com:4000/" + bookData.activitySheetFile}>{i18n.t("filter.activitySheet",{lng:language})}</a></div>}
        {bookData.assessmentSheetFile !== undefined && <div><a  href={"https://school.kutubee.com:4000/" + bookData.assessmentSheetFile}>{i18n.t("filter.assessmentSheet",{lng:language})}</a></div>}


    </div>
</div>}




                {loggedInUser.userData.type !== "teacher" && <>
                <div className="iconWrapper" onClick={() => {
                    goToAdditions(1)
                }}>
                    <div className="iconBox">
                        <svg
                            width='22px'
                            height='20px'
                            viewBox="0 0 20 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity={0.53}
                                d="M2.857 22.143h15.714l-1.428 4.285H.714l2.143-4.285z"
                                fill="#FFCC5C"
                            />
                            <g>
                                <path
                                    d="M4.4 20.746h0l2.01 1.218h.001l.461.277-1.454 2.44s0 0 0 0a.136.136 0 01-.116.069h0-3.485a.137.137 0 01-.118-.072.189.189 0 010-.169l2.248-4.038.453.275zM1.818 25H5.3l-3.823-.203c.07.126.2.203.34.203zM18.052 5.609h0L12.367 17.31h0a.145.145 0 01-.083.076.214.214 0 01-.041.006.125.125 0 01-.061-.019l-.002-.001-6.706-4.058h0l-.004-.002a.143.143 0 01-.065-.093h0v-.003a.165.165 0 01.019-.124h0L12.169 2.21c.76-1.225 2.302-1.606 3.504-.88 0 0 0 0 0 0l1.414.857s0 0 0 0c1.135.69 1.564 2.19.965 3.422z"
                                    fill="#FFCC5C"
                                    stroke="#38395B"
                                    strokeWidth={0.5}
                                />
                                <path
                                    d="M5.192 12.99l-1.154 2.094a.414.414 0 00.145.552c.635.385.627 2.114-.406 3.976a.413.413 0 00.082.503c.018.02.04.036.063.049l.608.369 2.01 1.217.675.406.058.037a.389.389 0 00.296.044.392.392 0 00.238-.19c.682-1.234 1.636-2.175 2.431-2.394a.805.805 0 01.647.04c.09.055.196.071.296.045a.392.392 0 00.238-.19l1.156-2.097-7.383-4.46z"
                                    fill="#38395B"
                                />
                                <path
                                    d="M7.92 12.28a.38.38 0 00.537-.128l5.174-8.581a.416.416 0 00-.129-.549.38.38 0 00-.53.118l-5.176 8.58c-.114.19-.06.441.123.56z"
                                    fill="#F7931E"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="bookActivityWrapper">
                        <div className="bookActivityNumber">{highlightsNumber}</div>
                        <div className={`bookActivityTitle ${bookData.language == 'ar' ? 'arabicText' : null}`}>{t('bookScreen.highlight', { lng: bookData.language })}</div>
                    </div>
                </div>
                <div className="iconWrapper" onClick={() => {
                    goToAdditions(0)
                }}>
                    <div className="iconBox">
                        <svg
                            width='22px'
                            height='20px'
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M14.092 25.122l3.666 2.118 1.224-2.118 6.14-10.643 2.119-3.666-2.118-1.224-5.947-3.431-1.278-.736v2.09a1.806 1.806 0 11-3.612 0 1.806 1.806 0 013.612 0v-2.09l-3.612-2.086-3.473-2.005-2.786 4.827-1.869 3.237-4.827 8.363 4.827 2.786 7.934 4.578zM15.64 5.706v.903-.903zm2.617 9.047l-7.039-4.063 7.039 4.063zm-1.355 2.467l-7.038-4.063 7.038 4.063zm-1.354 2.468l-7.039-4.064 7.039 4.063z"
                                    fill="#FFDA44"
                                />
                                <path
                                    d="M6.158 6.158v3.238l1.87-3.238h-1.87zM6.158 25.122h7.934l-7.934-4.578v4.578zM25.123 6.158h-5.947l5.947 3.432V6.158zM25.123 25.122V14.479l-6.141 10.643h6.14z"
                                    fill="#96C9EF"
                                />
                                <path
                                    d="M25.574 14.601l2.283-3.955-2.283-1.316V5.706h-6.276l-.949-.546V2.997a2.258 2.258 0 00-4.473-.42L10.649.715 7.766 5.706h-2.06v3.567l-4.992 8.65 4.993 2.882v4.768h8.263l3.955 2.284 1.317-2.284h6.332V14.601zm-.902-7.992v2.198l-3.81-2.198h3.81zm-9.934-3.612a1.355 1.355 0 012.709 0v1.641l-2.71-1.563v-.078zM6.61 6.61h.635L6.61 7.71v-1.1zm0 18.061v-3.345l5.793 3.345H6.61zm10.983 1.953l-15.645-9.03 9.03-15.645 6.469 3.733v1.832a1.355 1.355 0 01-2.71 0v-2.71h-.902v2.71a2.258 2.258 0 004.515 0v-1.31l8.275 4.775-9.032 15.645zm2.17-1.953l2.425-4.2 2.483-4.303v8.504h-4.908z"
                                    fill="#38395B"
                                />
                                <path
                                    d="M16.544 7.964h.452V7.06h-.452a.452.452 0 01-.452-.452v-.903h-.902v.903c-.001.748.605 1.355 1.354 1.355zM11.444 10.298l-.452.782 7.04 4.063.451-.782-7.04-4.063zM10.091 12.767l-.451.782 7.038 4.063.451-.781-7.038-4.064zM8.735 15.23l-.452.783 7.038 4.063.452-.782-7.038-4.063z"
                                    fill="#38395B"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="bookActivityWrapper">
                        <div className="bookActivityNumber">{notesNumber}</div>
                        <div className={`bookActivityTitle ${bookData.language == 'ar' ? 'arabicText' : null}`}>{t('bookScreen.note', { lng: bookData.language })}</div>
                    </div>
                </div>
                <div className="iconWrapper" onClick={() => {
                    goToAdditions(2)
                }}>
                    <div className="iconBox">
                        <svg
                            width={23}
                            height={24}
                            viewBox="0 0 23 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x={0.784}
                                y={0.274}
                                width={21.548}
                                height={22.926}
                                rx={2.75}
                                fill="#FFCC5C"
                                stroke="#38395B"
                                strokeWidth={0.5}
                            />
                            <path
                                d="M4.667 14.089a.43.43 0 01.016-.085l1.432-4.731a.5.5 0 01.281-.3A1.16 1.16 0 016.9 8.87c.19 0 .359.035.505.105.146.07.24.17.28.299l1.44 4.73c.011.042.016.07.016.086 0 .134-.083.25-.25.349a1.01 1.01 0 01-.52.147c-.221 0-.352-.075-.393-.225l-.262-.97H6.092l-.262.97c-.04.15-.172.225-.393.225-.18 0-.353-.049-.52-.147-.166-.098-.25-.215-.25-.35zM6.34 12.46h1.124l-.562-2.078-.562 2.078zM10.128 14.222V9.289c0-.119.051-.21.154-.275a.68.68 0 01.37-.097h1.579c1.027 0 1.54.46 1.54 1.38 0 .621-.218 1.027-.654 1.218.262.098.46.24.592.423.134.183.2.456.2.818v.163c0 .58-.14 1.002-.42 1.268-.28.266-.655.4-1.128.4h-1.71a.61.61 0 01-.38-.11c-.095-.072-.143-.157-.143-.255zm1.194-3.172h.808a.377.377 0 00.324-.16.623.623 0 00.115-.375.642.642 0 00-.115-.38.374.374 0 00-.324-.163h-.808v1.078zm0 2.481h.77c.41 0 .617-.237.617-.713v-.124c0-.475-.206-.713-.617-.713h-.77v1.55zM15.01 12.801v-2.055c0-.631.171-1.094.513-1.389.341-.294.786-.442 1.336-.442.565 0 1.028.137 1.39.411.362.274.543.651.543 1.133 0 .222-.046.373-.138.453-.093.08-.247.12-.462.12-.386 0-.585-.12-.6-.364-.016-.465-.244-.698-.686-.698-.462 0-.693.259-.693.776V12.8c0 .517.233.776.7.776a.813.813 0 00.359-.07.412.412 0 00.204-.213 1.27 1.27 0 00.08-.236c.013-.062.025-.148.035-.256.02-.243.219-.364.593-.364.221 0 .378.04.47.12.092.08.138.232.138.454 0 .501-.18.897-.543 1.186-.361.29-.825.434-1.39.434-.55 0-.995-.147-1.336-.442-.341-.295-.512-.758-.512-1.389z"
                                fill="#38395B"
                            />
                        </svg>
                    </div>
                    <div className="bookActivityWrapper">
                        <div className="bookActivityNumber">{vocabulariesNumber}</div>
                        <div className={`bookActivityTitle ${bookData.language == 'ar' ? 'arabicText' : null}`}>{t('bookComponent.vocabulary', { lng: bookData.language })}</div>
                    </div>
                </div>
                </>}
                
            </div>
        </div>
    )
}
