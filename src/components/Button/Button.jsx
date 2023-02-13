import { ClipLoader } from 'react-spinners';
import styles from './Button.module.scss'

const Button = ({ children, variant, active, loading, spinColor, ...props }) => {
    const reverseVariant = variant === 'reverse' ? styles.reverse : '';
    const newsVariant = variant === 'news' ? styles.news : '';
    const cartVariant = variant === "cart" ? styles.cart : '';
    let isActive = active;

    if (!isActive) {
        isActive = false;
    }

    return (
        <button
            className={`${styles.button} ${reverseVariant} ${newsVariant} ${cartVariant}`}
            disabled={isActive}
            {...props}
        >
            {
                loading ? (
                    <div className='flex flex-col items-center justify-center py-[1px]'>
                        <ClipLoader
                            color={spinColor ? spinColor : "#FFFFFF"}
                            loading={loading}
                            size={16}
                        />
                    </div>
                ) : (
                    <div>
                        {children}
                    </div>
                )
            }
        </button>
    )
}


export default Button;