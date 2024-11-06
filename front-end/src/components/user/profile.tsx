import { useContext, useEffect, useState } from "react";
import { UserRegisrationInterface } from "../../model/interfaces/user-interface";
import ProfileView from "./profileView"
import { NavBarContext } from "./NavBarContext";
import { userService } from "../../services/user-service";
import EditProfile from "./editProfile";

const Profile = () => {
    const [user, setUser] = useState<UserRegisrationInterface | null>(null);
    const [pageCondition, setPageCondition] = useState<boolean>(false);
    const { userId } = useContext(NavBarContext);

    const fetchUser = async () => {
        try {
            const user = await userService.fetchUserById(userId);
            setUser(user.data.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUser()
    }, [userId]);

    const handlePage = () => {
        setPageCondition(true);
    }

    return (
        <div className='mt-5 flex items-start'>
            {/* Image */}
            <div className='min-w-[300px] max-w-[100px]'>
                <div className='w-[200px] h-[200px] bg-gray-400 rounded-full overflow-hidden'>
                    <img src={user?.image} className="object-cover" alt="" />
                </div>
            </div>

            {/* Profile */}
            <div className='w-4/12 h-screen flex flex-col items-center'>
                {!pageCondition && <ProfileView user={user} />}
                {pageCondition && <EditProfile user={user}/>}
                {!pageCondition && <div className="w-full flex items-center justify-center mt-6">
                    <button
                        onClick={handlePage}
                        className="bg-[#828BB2] hover:bg-[#606992] transition-all py-2 px-3 rounded-lg text-white font-semibold">
                        Edit Profile
                    </button>
                </div>}
            </div>

        </div>
    )
}

export default Profile