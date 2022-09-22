import React, { useState } from 'react'

export default function Badge({ badge, name, url, description, progress, onSelectBadge }) {

    return (

        <div className="badge-item" style={{width:"18%",margin:"1%",padding:"1%"}} onClick={() => {
            onSelectBadge(badge)
        }}>
            <div style={{ position: 'relative' }}>
                <img className={`${progress != "100%" ? 'greyfilter' : ''}`} img src={url} />
                {progress != "100%" &&
                    <svg className="locksvg"
                        width={18}
                        height={23}
                        viewBox="0 0 18 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity={0.4}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.092.453C5.84.453 3.17 3.123 3.17 6.376v2.539H.631v13.538h16.923V8.915h-2.538V6.376c0-3.252-2.671-5.923-5.924-5.923zm0 1.69c2.33 0 4.231 1.9 4.231 4.23V8.91H4.862V6.373c0-2.33 1.9-4.23 4.23-4.23zm-6.769 8.46h13.539v10.155H2.323V10.604z"
                            fill="#AEAEAE"
                        />
                    </svg>
                }
            </div>
            <div className="progressBarWrapper flex-wrapper-row" style={{ width: '100%', gap: '0.2vw' }} >
                <div className="progressBar">
                    <div className="progressBarGreen" style={{
                        width: progress
                    }} />

                </div>
                {progress}
            </div>
            <div className="badgeName">

{name}
</div>
            <div className="badgeDescription">

                {description}
            </div>
          
        </div>
    )
}
