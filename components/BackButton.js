import React from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function BackButton(props) {
    const { t, i18n } = useTranslation([], { useSuspense: false });

    return(
    <svg style={props.language === "en" || props.language === "fr"?{transform:"rotate(0deg)"}:{transform:"rotate(180deg)"}} width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 10L1 5.5L5.5 0.999999" stroke="#6AC3DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>)
}