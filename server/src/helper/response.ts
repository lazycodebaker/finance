
export const responseFunc = ({ data, message, status }: { data?: any, message: string, status: number }) => {
    return new Response(JSON.stringify({
        ok: true,
        data,
        message
    }), {
        headers: {
            "Content-Type": "application/json",
        },
        status,
    });
};