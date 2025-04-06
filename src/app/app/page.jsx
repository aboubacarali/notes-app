"use client"
import useNotes from "@/hooks/useNotes";
import {useEffect, useState} from "react";
import Note from "@/components/Note";
import {X} from "lucide-react";
import NoteFormModal from "@/components/NoteFormModal";

export default function Page() {
    const {get, destroy} = useNotes()
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [error, setError] = useState("");
    const [showNoteForm, setShowNoteForm] = useState(false);

    useEffect( () => {

        fetchNotes();

    }, [])


    const handleDelete = async (note) => {
        await destroy(note.id)
        fetchNotes();
    }


    const handleEdit = (note) => {
        setCurrentNote(note);
        setShowNoteForm(true);
    }
    const handleShare = () => {}


    const handleSave = () => {
        fetchNotes();
    }

    async function fetchNotes() {
        const notesData = await get();
        console.log({notes: notesData});
        if (notesData?.length) {
            setNotes(notesData);
        }
        else {
            console.log(notesData);
        }
    }


    return (
        <div>
            {showNoteForm && <NoteFormModal note={currentNote} onSave={handleSave} onClose={() => {
                setCurrentNote(null)
                setShowNoteForm(false)
            }}/>}
            <div className="flex justify-between items-center border-b border-b-slate-200 mb-8 h-14">
                <h1 className="font-semibold text-xl">Mes notes</h1>
                <button onClick={() => {
                    setCurrentNote(null)
                    setShowNoteForm(true)
                }} className="px-4 py-2 bg-indigo-600 rounded-lg text-indigo-50">Ajouter </button>
            </div>
            {/*<h1>Welcome</h1>*/}
            {error && (
                <p className="text-red-600 flex justify-between items-center p-3">
                    <span>{error}</span>
                    <button onClick={() => {setError("")}} className="p-2">
                        <X/>
                    </button>
                </p>
            )}
            <ul className="space-y-3">
                {notes.reverse().map((note) => (
                    <li key={note.note.id+""}>
                        <Note note={note.note} owner={note.owner} onDelete={handleDelete} onEdit={handleEdit} onShare={handleShare} />
                    </li>
                ))}
            </ul>
        </div>
    )
}