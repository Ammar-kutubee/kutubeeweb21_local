import React from 'react'

export default function BookButton({ text, finished, grey, onPress, buttonStyle, hideCheck,language }) {
    return (
        <div
            onClick={onPress}
            className={`bookButton  ${!finished ? 'greyButton' : ''} `} >
            <div style={{ position: 'relative' }}>
                <div className={`bookButtonText  ${!finished ? 'greyButtonText' : ''}`}>
                    {text}
                </div>
                {finished && !hideCheck ?
                    <svg
                        style={
                            
                            language === "en" || language === "fr"?
                            {
                            
                            position: 'absolute',
                            bottom: 0,
                            left: -8
                        }:{
                            position: 'absolute',
                            bottom: 0,
                            right: -8
                        }
                        }
                        width={16}
                        height={12}
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.695 7.82l7.088-6.816a1.506 1.506 0 012.088 2.171l-7.79 7.492a2 2 0 01-2.772 0L1.13 7.608a1.506 1.506 0 012.088-2.171L5.695 7.82z"
                            fill={'#fff'}
                            stroke={'#6ac3db'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    :
                    null
                }
            </div>
        </div>
    )
}
