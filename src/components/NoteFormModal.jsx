"use client"
import {Loader2, X} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import useNotes from "@/hooks/useNotes";

const NoteSchema = z.object({
    title: z.string().min(6, "Le titre doit contenir au moins 6 caractères").nonempty("Le titre est requis"),
    content: z.string().min(6, "Le contentu doit contenir au moins 6 caractères").nonempty("Le contenu est requis"),
    visibility: z.enum(["public", "private"]),
})



export default function NoteFormModal({onClose, onSave, note}) {

    const {create, update} = useNotes()
    const [formError, setFormError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(NoteSchema),
    });


    useEffect(() => {
        if (note) {
            setValue("title", note.title);
            setValue("content", note.content);
            setValue("visibility", note.visibility);
        }
    }, [note])

    const onSubmit = async (data) => {
        setIsLoading(true);
        let response = null
        if (note) {
             response = await update(note.id, data);
        } else {
             response = await create(data.title, data.content, data.visibility);
        }
        if (response) {
            onClose();
            onSave()
        }
        setIsLoading(false);
    }


    return (
        <div className="absolute inset-0 bg-indigo-900/30 backdrop-blur-[3px] grid place-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="border border-slate-400 bg-indigo-50 rounded-lg w-lg">
                <div className="py-2 px-4 border-b border-b-slate-400 flex justify-between items-center">
                    <h2 className="font-semibold text-xl">{note? "Modifier la note": "Ajouter une note"}</h2>
                    <button onClick={onClose} className="p-2 "><X strokeWidth={1.5}/></button>
                </div>

                <div className="px-4 py-2">
                    {/*<p className="">rubishh</p>*/}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                        <input
                            {...register("title")}
                            id="title"
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu</label>
                        <textarea
                            {...register("content")}
                            id="content"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                    </div>
                </div>

                <div className="py-2 px-4 border-t border-t-slate-400 flex justify-end items-center">
                    <button type="submit" disabled={isLoading} className="py-2 w-34 grid place-content-center cursor-pointer px-4 bg-indigo-600 disabled:bg-gray-500 rounded-lg text-indigo-50">
                        {isLoading ? <> <Loader2 size={20} className="animate-spin"/></>: (note ? "Sauvegarder": "Ajouter")}
                    </button>
                </div>
            </form>
        </div>
    )
}