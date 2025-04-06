"use client"
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
    email: z.string().email("L'email n'est pas valide").nonempty("L'email est requis"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    password_confirmation: z.string().min(6, "La confirmation du mot de passe doit contenir au moins 6 caractères"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
});

export default function Page() {
    const [formError, setFormError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const router = useRouter();

    const {logUser} = useAuth()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/register', {
                email: data.email,
                password: data.password,
            })
            console.log(response.data);
            logUser(response.data.user, response.data.user.token);
            try {
            router.push('/app')

            } catch (err) { console.log(err); }
        } catch (error) {
            setFormError("Une erreur est survenue: " + error.response.data.detail);
        }
    };

    return (
        <div className="max-w-3xl w-full mx-auto p-8 border_ bg-white rounded-lg shadow-md_">
            <h1 className="text-2xl font-semibold mb-6 text-center text-black">S'inscrire</h1>

            {formError && <div className="text-red-500 mb-4">{formError}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                        {...register("password")}
                        id="password"
                        type="password"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                    <input
                        {...register("password_confirmation")}
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation.message}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                >
                    S'inscrire
                </button>
            </form>
            <div className="mt-10">
            <span>Déjà un compte ? <Link href={'/login'}>Se connecter</Link> </span>
            </div>
        </div>
    );
}