
export default function MenuButton({ icon, onClick, selected,landscape,currentTheme, buttonStyle }) {
    return (
        <div
            hitSlop={{
                top: 10,
                left: 10,
                bottom: 10,
                right: 10
            }}
            onClick={onClick}
            className={`menuButtonLandscape bordergrey ${selected ? 'selected' : ''}`}
        >
            {icon}
        </div>
    )
}
