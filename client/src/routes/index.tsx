import { createFileRoute, redirect } from '@tanstack/react-router'
import { api } from '@/hono/client';
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import { isNotLocalStorage } from '@/auth';

export const Route = createFileRoute('/')({
    errorComponent: () => <div>Error While Rendering Index Page</div>,
    component: Index,
    beforeLoad: async () => {

        console.log("before load")

        if (isNotLocalStorage) {
            throw redirect({
                to: "/about",
            });
        }
    }
});

export const getAuth = async () => {
    const response = await api.auth.user.$get();
    if (!response.ok) return null;
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
            // localStorage.setItem("user", JSON.stringify(data));
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