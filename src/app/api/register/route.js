import httpClient from "@/lib/axios";

export async function POST(req) {
    console.log({body: req.getBodyResult});
        try {
            const { email, password } = await req.json();

            const response = await httpClient.post('/users/register', {
                email,
                password,
            });
            console.log(response.data);

            return Response.json(response.data);
        } catch (error) {
            console.log({erreur: error});
            return Response.json(error.response.data, {status: error.status});
        }

}