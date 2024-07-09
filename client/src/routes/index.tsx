import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/hono/client';
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
    beforeLoad: async () => {
        await getAuth();
    },
    loader: async () => {
        await getAuth();
    },
    component: Index
});

const getAuth = async () => {
    const response = await api.auth.user.$get();
    if (!response.ok) throw Error(response);
    const data = await response.json();
    const user = data.data;
    return user;
};

function Index() {
    const { isPending, isLoading, data, error } = useQuery({
        queryKey: ["auth"],
        queryFn: getAuth,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            localStorage.setItem("user", JSON.stringify(data));
        }

        const local = localStorage.getItem("user");

        console.log(local);
        

        if (!local) {
            navigate({
                to: "/about"
            });
        }
    }, [data, navigate]);

    if (isPending) return <p>Loading...</p>;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <>
            {data?.username}
        </>
    );
}