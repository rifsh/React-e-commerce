import React from "react"
import { ViewProfileInterface } from "../../model/interfaces/props-interface";

const ProfileView: React.FC<ViewProfileInterface> = ({ user }) => {

    return (
        <div className="w-full max-w-md px-4 py-6 bg-white rounded-lg shadow-lg h-[330px] flex flex-col items-center justify-between">
            {user ? (
                <>
                    <div className="w-full max-w-md">
                        <label htmlFor="inputField" className="block text-lg text-gray-700 font-bold">Name</label>
                        <p className="w-full text-gray-500 rounded-md font-medium text-xl">{user.name}</p>
                    </div>
                    <div className="w-full max-w-md">
                        <label htmlFor="inputField" className="block text-lg text-gray-700 font-bold">Username</label>
                        <p className="w-full text-gray-500 rounded-md font-medium text-xl">{user.userName}</p>
                    </div>
                    <div className="w-full max-w-md">
                        <label htmlFor="inputField" className="block text-lg text-gray-700 font-bold">Email</label>
                        <p className="w-full text-gray-500 rounded-md font-medium text-xl">{user.email}</p>
                    </div>
                    <div className="w-full max-w-md">
                        <label htmlFor="inputField" className="block text-lg text-gray-700 font-bold">Address</label>
                        {user.address.length > 0 && < p className="w-full text-gray-500 rounded-md font-medium text-xl">ssss</p>}
                        {!user.address.length && <p className="w-full text-gray-500 rounded-md font-medium text-xl">No address</p>}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )
            }
        </div >
    )
}

export default ProfileView