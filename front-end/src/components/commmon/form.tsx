import React, { SetStateAction } from "react"
import { FormControllsInterface } from "../../model/interfaces/form-interface"
import { BeatLoader } from "react-spinners";

interface CommonFormProps<T> {
    formControls?: FormControllsInterface[],
    onSubmit?: any,
    formData?: T,
    setFormData?: React.Dispatch<SetStateAction<T>>
    buttonValue?: string
    imageStr?: (message: string) => void;
    loading?: boolean,
}

const CommonForm = <T extends Record<string, any>>({ formControls, formData, setFormData, onSubmit, buttonValue, imageStr, loading }: CommonFormProps<T>) => {

    const imageHandler = (e) => {
        const file = e.target.files[0];
        imageStr(file);
    }

    const renderInputsByComponentTypes = (controlItem: FormControllsInterface): JSX.Element => {

        let element: JSX.Element | null = null;
        const value = formData[controlItem.name];
        switch (controlItem.componentType) {
            case 'input':
                element = <input
                    className="w-full ps-2 pe-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    id={controlItem.name}
                    value={controlItem.type === 'file' ? '' : value}
                    onChange={(e) => {
                        setFormData({ ...formData, [controlItem.name]: e.target.value })
                        controlItem.type === 'file' ? imageHandler(e) : undefined
                    }}
                    accept="image/*"
                />
                break;
            case 'selection':
                element = <input
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    id={controlItem.name}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
                />
                break;

            default:
                break;
        }
        return (
            element
        )
    }
    return (
        <form onSubmit={onSubmit} className="w-full">
            {formControls && <div>
                {formControls.map((x) => {
                    return (
                        <div key={x.name} className="flex flex-col">
                            <label className="mt-2"> {x.label} </label>
                            {
                                renderInputsByComponentTypes(x)
                            }
                        </div>
                    )
                })}
                <button className="bg-gray-800 text-white w-full py-2 px-3 h-[40px] rounded-md mt-2 flex items-center justify-center ">
                    {!loading && <p>{buttonValue || 'Submit'}</p>}
                    {loading && <BeatLoader
                        size={10}
                        color="white" />}
                </button>
            </div>}
        </form>
    )
}

export default CommonForm