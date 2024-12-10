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
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Phone</th>
                        <th className="py-2 px-4 text-left">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user:any) => (
                        <tr key={user.id} className={users.indexOf(user) % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{user.phone}</td>
                        <td className="py-2 px-4">{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
        </div>
    )
}