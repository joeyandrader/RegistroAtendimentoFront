interface SpinnerProps {
    spinnerType?: 'border' | 'grow'
    colorStyle?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    customStyle?: React.CSSProperties;
    sizeSpinner?: 'small' | 'medium' | 'large';
}

const SpinnerLoading = (
    {
        spinnerType = 'border',
        colorStyle = 'primary',
        customStyle,
        sizeSpinner = 'medium'
    }: SpinnerProps) => {

    return (
        <>
            <div className={`spinner-${spinnerType} text-${colorStyle} ${sizeSpinner === 'small' ? `spinner-${spinnerType}-sm` : ''}`}
                style={
                    {
                        ...customStyle,
                        width: sizeSpinner === 'large' ? '3rem' : '',
                        height: sizeSpinner === 'large' ? '3rem' : ''
                    }
                }
                role="status">
                <span className={`visually-hidden`}>Loading...</span>
            </div >
        </>
    )
}

export default SpinnerLoading