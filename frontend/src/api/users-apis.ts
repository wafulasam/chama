// users service
import { axiosConfig } from "./axios-config";

export class UsersService {
    public getAllUsers = async ({ setUsers, setLoading, setError }:any) => {
        setLoading(true)
        await axiosConfig
            .get<any>(`/users`)
            .then((response)=> (response.status === 200) && setUsers(response.data))
            .catch((error)=> setError(error))
            .finally(()=> setLoading(false))
    }
}