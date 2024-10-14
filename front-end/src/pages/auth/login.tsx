import { Link } from "react-router-dom";
import CommonForm from "../../components/commmon/form";
import { loginFormControlls } from "../../config/form";
import { useState } from "react";
import { UserLoginInterface } from "../../model/interfaces/user-interface";
import { authService } from "../../services/auth-service";

const inetialState: UserLoginInterface = {
    userName: '',
    password: '',
}
export default function AuthLogin() {
    const [loginFormData, setLoginFormData] = useState<UserLoginInterface>(inetialState);

    const submit = async (e) => {
        e.preventDefault();
        const response = await authService.userLogin(loginFormData)
        console.log(response);

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
                    onSubmit={submit} />
            </div>
        </div>
    )
}
