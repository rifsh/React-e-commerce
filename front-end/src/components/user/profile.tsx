import { useContext, useRef, useState } from "react";
import ProfileView from "./profileView";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { NavBarContext } from "./NavBarContext";
import EditProfile from "./editProfile";
import { Avatar, Box, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { userService } from "../../services/user-service";
import userFetch from "../../hooks/user/user";

const Profile = () => {
    const [pageCondition, setPageCondition] = useState<boolean>(false);
    const context = useContext(NavBarContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { userData, refetchUserData } = userFetch(context.userId);

    const handlePage = () => {
        setPageCondition(true);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleIconClick = () => {

        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("profileImg", file);
                const response = await userService.updateUser(context.userId, formData);
                if (response.data.message === 'Success') {
                    refetchUserData();
                    setLoading(false);
                }
                setLoading(false);

            } catch (error) {
                console.error("Error updating profile image:", error);
                setLoading(false);
            }
        }
    };

    return (
        <div className="mt-5 flex items-start">
            {/* Image */}
            <div className="min-w-[300px] max-w-[100px]">
                <div className="h-[330px] flex items-center justify-center relative">
                    {loading && <Box sx={{ display: 'flex', position: 'absolute', zIndex: '1' }}>
                        <CircularProgress />
                    </Box>}
                    {userData?.image ? (
                        <Avatar
                            alt="User Image"
                            src={userData?.image}
                            sx={{ width: 200, height: 200, ...(loading ? { opacity: '0.4' } : { opacity: '1' }) }}
                        />

                    ) : (
                        <Avatar
                            sx={{ bgcolor: deepPurple[500], fontWeight: 'bold', fontSize: '100px', width: 200, height: 200 }}
                        >
                            {userData?.name?.[0]?.toUpperCase()}
                        </Avatar>
                    )}
                    {pageCondition && <div className="cursor-pointer rounded-full w-14 h-14 bg-white absolute bottom-[70px] right-[70px] z-10 flex items-center justify-center">
                        <CameraAltIcon
                            onClick={handleIconClick}
                            fontSize="large"
                            style={{ color: '#1976d2', fontSize: '40px' }}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>}
                </div>
            </div>

            {/* Profile Section */}
            <div className="w-4/12 h-screen flex flex-col items-center">
                {!pageCondition ? (
                    <ProfileView user={userData} />
                ) : (
                    <EditProfile user={userData} />
                )}
                {!pageCondition && (
                    <div className="w-full flex items-center justify-center mt-6">
                        <button
                            onClick={handlePage}
                            className="bg-[#828BB2] hover:bg-[#606992] transition-all py-2 px-3 rounded-lg text-white font-semibold"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
