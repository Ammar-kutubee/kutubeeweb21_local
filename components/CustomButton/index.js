
export default function CustomButton({ onPress, text, buttonStyle, textStyle, disabled, animated, noBorderRadius, loading }) {
    return (

        <div
            className={`buttonWrapper  ${disabled ? 'buttonWrapperDisabled' : ''} ${buttonStyle} ${noBorderRadius ? 'btn-noborderradius' : ''}`}
            onClick={onPress}
            disabled={disabled}
        >
            {loading ?
                <div class="ui active inverted small inline loader"></div>
                :
                <div className="btn-textStyle">
                    {text}
                </div>
            }

        </div>

    )
}
