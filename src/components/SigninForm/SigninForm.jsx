import { styled, TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import styles from './SigninForm.module.scss'

const SigninForm = () => {
    const FormInput = styled(TextField)({
        ".MuiOutlinedInput-notchedOutline": {
            border: "1px solid #E0E0E0",
            borderRadius: "16px"
        },

        "label": {
            color: "#C0C0C0",
            "&.Mui-focused": {
                color: '#C0C0C0'
            }
        },
        ".MuiFormControl-root.MuiFormLabel-root": {
            color: "#C0C0C0"
        },
        ".MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
                border: "1px solid#C0C0C0"
            }
        },
        ".MuiOutlinedInput-root:hover": {
            "& > fieldset": {
                borderColor: "#C0C0C0"
            }
        }
    })

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => alert(JSON.stringify(data));

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("Phone number", { required: true, maxLength: 80 })}
                    label="Номер телефона"
                    sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #E0E0E0",
                            borderRadius: "16px"
                        },
                        "label": {
                            color: "#C0C0C0",
                            "&.Mui-focused": {
                                color: '#C0C0C0'
                            }
                        },
                        ".MuiFormControl-root.MuiFormLabel-root": {
                            color: "#C0C0C0"
                        },
                        ".MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                border: "1px solid#C0C0C0"
                            }
                        },
                        ".MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                                borderColor: "#C0C0C0"
                            }
                        }
                    }}
                />
                <TextField
                    {...register("Password", { required: true, maxLength: 80 })}

                    label="Пароль"
                    type="text"
                    sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #E0E0E0",
                            borderRadius: "16px"
                        },
                        "label": {
                            color: "#C0C0C0",
                            "&.Mui-focused": {
                                color: '#C0C0C0'
                            }
                        },
                        ".MuiFormControl-root.MuiFormLabel-root": {
                            color: "#C0C0C0"
                        },
                        ".MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                border: "1px solid#C0C0C0"
                            }
                        },
                        ".MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                                borderColor: "#C0C0C0"
                            }
                        }
                    }}
                />
                <Button active={!isValid}>Войти</Button>
            </form>
        </div>
    )
}

export default SigninForm;