import { useState, useEffect } from "react";
import { UsersService } from "../api/users-apis";

export default function UsersTable (){
    const [ users, setUsers ] = useState<any>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<any>(null)
    const fetAllUsers = async () => await new UsersService().getAllUsers({ setUsers, setLoading, setError })
    
    useEffect(()=> {
        fetAllUsers()
    },[])
    return (
        <div>
            {loading && 'loading...'}
            {error && 'error!'}
            {JSON.stringify(users)}
        </div>
    )
}