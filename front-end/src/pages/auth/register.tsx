import { useState } from "react";
import CommonForm from "../../components/commmon/form";
import { registrationFormControls } from "../../config/form";
import { UserRegistrationInterface } from "../../model/interfaces/user-interface";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { authService } from "../../services/auth-service";
import { Bounce, toast } from "react-toastify";

const inetialState: UserRegistrationInterface = {
    name: '',
    userName: '',
    email: '',
    image: '',
    password: '',
    confirmPassword: '',
}

export default function AuthRegister() {

    const [regFormData, setRegFormData] = useState<UserRegistrationInterface>(inetialState);
    const navigate: NavigateFunction = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(regFormData);
        
        const response = await authService.userRegistration(regFormData);
        if (response?.data.status === 'Success') {
            toast.success('Account created', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setLoading(false);
            navigate('../login')
        } else {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center px-3 py-3 md:min-w-[460px] border border-black rounded-lg shadow-md shadow-gray-400">
            <div className="text-center">
                <h1 className="font-extrabold text-3xl mb-2">Create new account</h1>
                <p className="text-sm font-light">Create new account?<span className="ms-1 font-bold text-blue-400">
                    <Link to={'/auth/login'}>Login</Link></span></p>
            </div>
            <div className="w-full mt-3 flex flex-col items-center">
                <CommonForm
                    formControls={registrationFormControls}
                    buttonValue="Sign up"
                    formData={regFormData}
                    setFormData={setRegFormData}
                    onSubmit={submit}
                    loading={loading} />
            </div>

        </div>
    )
}
