import { type APIRoute } from "astro";

export function getStaticPaths() {
    return [
        { params: { abc: "default" } },
    ];
}

interface CommentRequestBody {
    abc?: string;
}

export const GET: APIRoute = async ({ params, request, url }) => {
    console.debug("request URL:", request.);
    // http://localhost:4321/api/v1/comment/?abc=aa12&ddd=15
    // とアクセスしてもabcが取れない（paramsが空）
    const abc = params.abc || "(null)";
    const def = "def";
    return new Response(JSON.stringify({
        message: "This is the comment API index endpoint.",
        abc,
        def,
    }), { status: 200 });
}