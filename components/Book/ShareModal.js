import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'

import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton

} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    InstapaperIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
export default function ShareModal({ bookId }) {
    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row',
            gap: '0.5vw',
            marginTop: '-5px'
        }}>
            <>
                <EmailShareButton url={`https://read.kutubee.com:2222/book/${bookId}`}>   <EmailIcon size={35} round={true} /></EmailShareButton>
                <FacebookShareButton url={`https://read.kutubee.com:2222/book/${bookId}`} ><FacebookIcon size={35} round={true} /> </FacebookShareButton>
                <TwitterShareButton url={`https://read.kutubee.com:2222/book/${bookId}`} ><TwitterIcon size={35} round={true} /> </TwitterShareButton>
                <LinkedinShareButton url={`https://read.kutubee.com:2222/book/${bookId}`} ><LinkedinIcon size={35} round={true} /> </LinkedinShareButton>
                <WhatsappShareButton url={`https://read.kutubee.com:2222/book/${bookId}`} ><WhatsappIcon size={35} round={true} /> </WhatsappShareButton>
            </>
        </div >

    )

}
