import UsersTable from "../components/UsersTable";

export default function HomePage (){
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">
            Hello, Tailwind with Vite!
        </h1>
        <UsersTable/>
    </div>
    )
}