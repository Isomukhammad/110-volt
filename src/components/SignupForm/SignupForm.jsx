import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './Signup.module.scss'

const SignupForm = () => {
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

    const onSubmit = (data) => console.log(data);
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("Full name", { required: true, maxLength: 80 })}
                    id="outlined-basic"
                    label="Имя и фамилия"
                    variant="outlined"
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
                    {...register("Phone number", { required: true, maxLength: 80 })}
                    id="outlined-basic"
                    label="Номер телефона"
                    variant="outlined"
                    type="number"
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
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
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
                    id="outlined-basic"
                    label="Пароль"
                    variant="outlined"
                    type="password"
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
                    id="outlined-basic"
                    label="Подтвердите пароль"
                    variant="outlined"
                    type="password"
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

export default SignupForm;