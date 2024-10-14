import { FormControllsInterface } from "../model/interfaces/form-interface";

export const registrationFormControls: FormControllsInterface[] = [
    {
        name: 'name',
        label: 'Name',
        placeholder: 'Name',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'User name',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email ID',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'image',
        label: 'Profile',
        placeholder: 'Profile image',
        componentType: 'input',
        type: 'file'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        componentType: 'input',
        type: 'password'
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        componentType: 'input',
        type: 'password'
    },

]

export const loginFormControlls: FormControllsInterface[] = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'User name',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        componentType: 'input',
        type: 'password'
    },
]