import { useContext, useEffect, useState } from "react";
import { UserInterface } from "../../model/interfaces/user-interface";
import { userService } from "../../services/user-service";
import { NavBarContext } from "../../components/user/NavBarContext";

const userFetch = (userId: string, v?:boolean): {
    userData: UserInterface | null,
    loading: boolean,
    error: string
    refetchUserData: () => void
} => {
    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(null);
    const {setData} = useContext(NavBarContext);

    const fetchUserById = async () => {
        setLoading(true);
        try {
            const user = await userService.fetchUserById(userId);
            setUserData(user.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserById();
        
    }, [userId, v]);

    const refetchUserData = () => {
        setData(Math.random().toString());
        fetchUserById();    
    };

    return { userData, loading, error, refetchUserData }
};

export default userFetch;