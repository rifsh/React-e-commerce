import React from "react"
import { ViewProfileInterface } from "../../model/interfaces/props-interface"

const EditProfile: React.FC<ViewProfileInterface> = ({ user }) => {
    return (
        <form action="" className='w-full max-w-md px-4 py-6 bg-white rounded-lg shadow-lg'>
            <div className="w-full max-w-md">
                <label htmlFor="inputField" className="block text-lg font-semibold text-gray-500 mb-2">Name</label>
                <input type="text" id="inputField" name="inputField" className="w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" placeholder={user.name}/>
            </div>
            <div className="w-full max-w-md">
                <label htmlFor="inputField" className="block text-lg font-semibold text-gray-500 mb-2">Email</label>
                <input type="text" id="inputField" name="inputField" className="w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" placeholder={user.email}/>
            </div>
            <div className="w-full max-w-md">
                <label htmlFor="inputField" className="block text-lg font-semibold text-gray-500 mb-2">Username</label>
                <input type="text" id="inputField" name="inputField" className="w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" placeholder={user.userName}/>
            </div>

            <div className="w-full flex items-center justify-center mt-6">
                <button
                    className="bg-[#828BB2] hover:bg-[#606992] transition-all py-2 px-3 rounded-lg text-white font-semibold">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default EditProfile