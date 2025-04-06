import {noteSchema} from "@/app/api/notes/route";
import httpClient from "@/lib/axios";
import {z} from "zod";

export async function PATCH(req, {params}) {
    const {noteID} = await params
    console.log({id: noteID})
    try {
        const data = await req.json();

        const safeData = noteSchema.parse(data);

        const response = await httpClient.patch('/notes/'+noteID, {
            title: safeData.title,
            content: safeData.content,
            visibility: safeData.visibility,
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

export async function DELETE(req, {params}) {
    const {noteID} = await params
    try {
        const response = await httpClient.delete('/notes/'+noteID, {
            headers: {
                Authorization: `bearer ${req.headers.get('bearer')}`,
            }
        });
        // console.log(response.data);

        return Response.json(response.data);
    } catch (error) {
        // console.log({erreur: error});
        return Response.json(error.response.data, {status: error.status});
    }
}