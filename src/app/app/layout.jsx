"use client"
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AppLayout({children}) {

    const router = useRouter();
    const {user} = useAuth()
    const notUser = !user
    useEffect(() => {
        if (user ===null) {
            router.push("/login");
        }
    }, [user])

    return (

        <>
            {notUser && (<Loader/>)}
            {!notUser && (<div>
                <header className="bg-indigo-600 h-25 px-6 flex items-center">
                    <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
                        <span
                            className="font-extrabold text-3xl bg-indigo-50 px-2 rounded-lg text-indigo-600">CollabNotes</span>
                        <ul className="flex gap-4 items-center text-indigo-50 font-bold text-xl">
                            <li><Link href="/app">Mes notes</Link></li>
                            <li><Link href="/app/shared">Partagés</Link></li>
                        </ul>
                        <div className="flex gap-2 items-center">
                            <p className="text-indigo-50 text-xl">{user.email}</p>
                            <div
                                className="grid place-content-center size-10 rounded-full bg-indigo-300 uppercase font-extrabold text-indigo-900">{user.email.slice(0, 2)}</div>
                        </div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto px-4 mt-8_">
                    {children}
                </div>
            </div>)}
        </>

    )
}

function Loader() {
    return <div className="h-screen bg-indigo-50 grid place-content-center">
        <div className="flex items-center gap-2">
            <span className="size-10 border-2 border-indigo-600 rounded-full border-t-transparent animate-spin"></span>
            <span className="">Chargement...</span>
        </div>
    </div>;
}