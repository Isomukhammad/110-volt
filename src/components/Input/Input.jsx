import { useLang } from "../../hooks/useLang";

const Input = ({
    name,
    type,
    register,
    placeholder,
    required,
    min,
    minMsg,
    max,
    maxMsg,
    errors,
    value
}) => {
    // if (!name || !register || !type || !placeholder) {
    //     return null;
    // }
    const lang = useLang();

    return (
        <div className="relative">
            <input
                {...register(`${name}`, {
                    required: {
                        value: required ? required : false,
                        message: lang?.['Поле обязательно для заполнения']
                    },
                    minLength: {
                        value: min ? min : null,
                        message: minMsg ? minMsg : null
                    },
                    maxLength: {
                        value: max ? max : null,
                        message: maxMsg ? maxMsg : null
                    }
                })}
                type={type}
                id={name}
                className={`block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 ${errors?.[name] ? 'border-red-500' : 'border-gray5'}  appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer`}
                placeholder=" "
            />
            <label
                htmlFor={name}
                className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">
                {placeholder}
            </label>
        </div>
    )
}

export default Input;
