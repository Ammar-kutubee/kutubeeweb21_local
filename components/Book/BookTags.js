import React, { useEffect, useState } from 'react'
import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function BookTags({ onPress, language, tags }) {


    const { t, i18n } = useTranslation([], { useSuspense: false });
    console.log("tags", tags)
    return (
        <div className="container" style={{ paddingTop: '0px' }}>
            <div className="sectionTitle" >{t('bookScreen.tags', { lng: language })}</div>
            <div className="bookTags">
                {tags.map((tag, index) => {
                    return <Link href={`/tagbooks/${tag.value}?tagname=${tag.label}`}>

                        <div key={tag.value} onPress={() => {
                            onPress && onPress(tag)
                        }} className="tag">
                            <div className="tagText">{tag.label}</div>
                        </div>
                    </Link>
                })}
            </div>


        </div>
    )
}
