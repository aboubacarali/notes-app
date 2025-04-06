import httpClient from "@/lib/axios";
import {z} from "zod";


export const noteSchema = z.object({
    title: z.string().min(3, { message: "Le titre doit comporter au moins 3 caractères" }),
    content: z.string().min(10, { message: "Le contenu doit comporter au moins 10 caractères" }),
    visibility: z.enum(["private", "public"], { message: "La visibilité doit être 'privée' ou 'publique'" })
});


export async function GET(req) {
    // console.log({req: req.headers.get('bearer')});
    try {
        const response = await httpClient.get('/notes', {
            headers: {
                Authorization: `Bearer ${req.headers.get('bearer')}`,
            }
        });
        // console.log(response.data);

        return Response.json(response.data);
    }
    catch (error) {
        // console.log({err: error});
        return Response.json(error.response.data, {status: error.status});
    }
}


export async function POST(req) {
    try {
        const data = await req.json();

        const safeData = noteSchema.parse(data);

        const response = await httpClient.post('/notes', {
            title: safeData.title,
            content: safeData.content,
            visibiliy: safeData.visibility,
        }, {
            headers: {
                Authorization: `bearer ${req.headers.get('bearer')}`,
            }
        });
        // console.log(response.data);

        return Response.json(response.data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json(
                { detail: error.errors.map(e => e.message)[0] },
                { status: 400 }
            );
        }
        // console.log({erreur: error});
        return Response.json(error.response.data, {status: error.status});
    }

}

