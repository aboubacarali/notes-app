"use client"
import {Pencil, Share2, Trash2, Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";


export default function Note({note, owner, onEdit, onDelete, onShare}) {
    const [show, setShow] = useState(false);

    const {user} = useAuth()

    return (
        <div className="border border-slate-400 bg-slate-100 rounded-lg">
            <div className="px-6 py-2 flex justify-between items-center">
                <div className="">
                <p className="text-lg text-slate-800 font-medium">{note.title}</p>
                    <p className="text-sm text-slate-500">Auteur: {owner.id === user.id ? "Vous": owner.email}</p>
                </div>
                <div className="flex items-center gap-3">
                    {owner.id === user.id && (<>
                        <button
                            className="size-8 rounded-full border bg-slate-200 hover:text-indigo-600 grid place-content-center">
                            <Share2 size={20} strokeWidth={1.5}/>
                        </button>
                        <button onClick={() => onEdit(note)} className="size-8 rounded-full border bg-slate-200 hover:text-indigo-600 grid place-content-center">
                            <Pencil size={20} strokeWidth={1.5} />
                        </button>
                        <button onClick={() => onDelete(note)} className="size-8 rounded-full border bg-slate-200 hover:text-indigo-600 grid place-content-center">
                            <Trash2 size={20} strokeWidth={1.5} />
                        </button>
                    </>)}

                    <button onClick={() => setShow(prev => !prev)} className="size-8 rounded-full border bg-slate-200 hover:text-indigo-600 grid place-content-center">
                        {!show && (<Eye size={20} strokeWidth={1.5}/>)}
                        {show && (<EyeOff size={20} strokeWidth={1.5}/>)}
                    </button>
                </div>
            </div>
            {show && (<div className="border-t border-t-slate-400 px-6 py-2">
                <p className="text-slate-800">{note.content}</p>
            </div>)}
        </div>
    )
}