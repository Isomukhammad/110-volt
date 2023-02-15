import { PatternFormat } from 'react-number-format';
import ImageDrop from '../ImageDrop/ImageDrop';
import styles from './CheckoutInstallment.module.scss';

const CheckoutInstallment = ({ register, errors }) => {
    return (
        <div className={styles.container}>
            <div className={styles.instalment}>
                <h4>Оформление рассрочки</h4>
                <div className={styles.cardInfo}>
                    <div className="relative">
                        <PatternFormat  {...register("phone_number", { required: true, maxLength: 255 })} format="+998 (##) ### ## ##" allowEmptyFormatting mask="_" id="cart-number" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                        <label htmlFor="cart-number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер карты</label>
                    </div>
                    <div className="relative">
                        <PatternFormat  {...register("cart", { required: true, maxLength: 16 })} format="#### #### #### ####" allowEmptyFormatting mask="_" id="cart-number" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                        <label htmlFor="cart-number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер карты</label>
                    </div>
                    {/* <div className='relative'>
                    <PatternFormat  {...register("name", { required: true, maxLength: 80 })} format="+998 (##) ### ## ##" allowEmptyFormatting mask="_" id="name" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                    <label htmlFor="name" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                </div> */}
                    <div className="relative">
                        <PatternFormat  {...register("cart-date", { required: true, maxLength: 16 })} format="##/##" allowEmptyFormatting mask="_" id="cart-number" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                        <label htmlFor="cart-number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Срок действия карты</label>
                    </div>
                </div>
            </div>
            <div className={`${styles.instalment} ${styles.file}`}>
                <h4>Фото пасспорта</h4>
                <ImageDrop image="/images/Passport.png" />
            </div>
            <div className={`${styles.instalment} ${styles.file}`}>
                <h4>Селфи с пасспортом</h4>
                <ImageDrop image="/images/selfie with passport 1.png" />
            </div>
            <div className={`${styles.instalment} ${styles.file}`}>
                <h4>Страница прописки</h4>
                <ImageDrop image="/images/Propiska.png" />
            </div>
            <div className={`${styles.instalment} ${styles.wishes}`}>
                <h4>Ваши пожелание</h4>
                <textarea
                    name="" id=""
                    cols="30"
                    rows="10"
                    placeholder='Сообщение'
                ></textarea>
            </div>
        </div>
    )
}

export default CheckoutInstallment;