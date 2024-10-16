import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/commmon/form";
import { loginFormControlls } from "../../config/form";
import { useState } from "react";
import { UserLoginInterface } from "../../model/interfaces/user-interface";
import { authService } from "../../services/auth-service";
import { Bounce, toast } from "react-toastify";

const inetialState: UserLoginInterface = {
    userName: '',
    password: '',
}
export default function AuthLogin() {
    const [loginFormData, setLoginFormData] = useState<UserLoginInterface>(inetialState);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await authService.userLogin(loginFormData);
        if (response.data) {
            localStorage.setItem('userId', response.data.user._id);
            localStorage.setItem('token', response.data.token);
            toast.success('Logged successfully', {
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
            navigate('/')
        } else {
            toast.warning('Something went wrong', {
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
        }
    }

    return (
        <div className="flex flex-col items-center px-3 py-3 min-w-[430px] border border-black rounded-lg shadow-md shadow-gray-400">
            <div className="text-center">
                <h1 className="font-extrabold text-3xl mb-2">Sign in</h1>
                <p className="text-sm font-light">create new account<span className="ms-1 font-bold text-blue-400">
                    <Link to={'/auth/register'}>Sign up</Link>
                </span></p>
            </div>
            <div className="w-full mt-3">
                <CommonForm
                    formControls={loginFormControlls}
                    buttonValue="Sign in"
                    formData={loginFormData}
                    setFormData={setLoginFormData}
                    onSubmit={submit}
                    loading={loading} />
            </div>
        </div>
    )
}
