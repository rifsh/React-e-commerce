import { useContext, useEffect, useState } from "react";
import { UserInterface } from "../../model/interfaces/user-interface";
import { userService } from "../../services/user-service";
import { NavBarContext } from "../../components/user/NavBarContext";

const userFetch = (userId: string): {
    userData: UserInterface | null,
    loading: boolean,
    error: string
    refetchUserData: () => void
} => {
    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(null);
    const context = useContext(NavBarContext);

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
    }, [userId]);

    const refetchUserData = () => {
        fetchUserById();
        context.setData('updated');
    };

    return { userData, loading, error, refetchUserData }
};

export default userFetch;