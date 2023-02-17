const FormError = ({ error }) => {
    console.log(error);
    if (!error) return null

    return (
        <div className='FormError text-red-600 font-bold text-[14px]'>
            <p>{error?.message}</p>

            {!!error &&
                !!error.errors &&
                Object.keys(error.errors).map((key, i) => (
                    <ul key={i}>
                        <p>{error.errors?.[key]?.[0]}</p>
                    </ul>
                ))}
        </div>
    )
}

export default FormError