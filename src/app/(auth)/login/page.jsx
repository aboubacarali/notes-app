"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("L'email n'est pas valide").nonempty("L'email est requis"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function LoginPage() {
    const [formError, setFormError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();
    const {logUser} = useAuth()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/login', {
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
            <h1 className="text-2xl font-semibold mb-6 text-center">Se connecter</h1>

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

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                >
                    Se connecter
                </button>
            </form>
            <div className="mt-10">
                <span>Pas encore de compte ? <Link href={'/register'}>S'inscrire</Link> </span>
            </div>
        </div>
    );
}