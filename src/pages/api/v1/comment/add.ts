import type { APIRoute } from "astro";

const options = {
    method: ["POST"],
    headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${import.meta.env.COMMENT_API_KEY}`,
        "Content-Type": "application/json",
    },
};

interface CommentRequestBody {
    abc?: string;
}

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const now = new Date();
        console.debug("request:", request);
        const paramAbc = params.abc || "(null)";
        const responseData = {
            content: `現在時刻は${now.toLocaleString()}、パラメータに"abc"が${paramAbc}と含まれています。`,
        }

        return new Response(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};