import { useState } from "react";
import CommonForm from "../../components/commmon/form";
import { registrationFormControls } from "../../config/form";
import { UserRegisrationInterface } from "../../model/interfaces/user-interface";
import { Link } from "react-router-dom";
import { authService } from "../../services/auth-service";

const inetialState: UserRegisrationInterface = {
    name: '',
    userName: '',
    email: '',
    image: '',
    password: '',
    confirmPassword: ''
}

export default function AuthRegister() {

    const [regFormData, setRegFormData] = useState<UserRegisrationInterface>(inetialState);
    const [image, setImage] = useState(null)

    const imageGetting = (message) => {
        if (message) {
            setRegFormData((prev) => ({
                ...prev,
                image: message
            }))
            const reader: FileReader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            }
            reader.readAsDataURL(message);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        const response = await authService.userRegistration(regFormData);
    }

    return (
        <div className="flex flex-col items-center px-3 py-3 min-w-[430px] border border-black rounded-lg shadow-md shadow-gray-400">
            <div className="text-center">
                <h1 className="font-extrabold text-3xl mb-2">Create new account</h1>
                <p className="text-sm font-light">Create new account?<span className="ms-1 font-bold text-blue-400">
                    <Link to={'/auth/login'}>Login</Link></span></p>
            </div>
            <div className="w-full mt-3 flex flex-col items-center">
                <div className="bg-gray-400 w-32 h-32 rounded-full overflow-hidden">
                    <img src={image} id="profile-img" className="object-cover w-32 h-32" alt="" />
                </div>
                <CommonForm
                    imageStr={imageGetting}
                    formControls={registrationFormControls}
                    buttonValue="Sign up"
                    formData={regFormData}
                    setFormData={setRegFormData}
                    onSubmit={submit} />
            </div>
        </div>
    )
}
