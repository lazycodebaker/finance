
import { api } from '@/hono/client';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { getAuth } from './index.lazy';

export const Route = createLazyFileRoute('/about')({
    errorComponent: () => <div>Error While Rendering About Page</div>,
    component: Index,
});

function Index() {

    const { isPending, isLoading, data, error } = useQuery({
        queryKey: ["auth"],
        queryFn: getAuth,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const local = localStorage.getItem("user");

        if (!local) {
            navigate({
                to: "/login"
            });
        }
    }, [data, navigate]);

    const login = async () => {
        const response = await api.auth.login.$post({
            form: {
                username: "lazycodebaker",
                password: "Lazycodebaker@14"
            }
        })

        console.log(response.json());

    };

    return (
        <div>
            <h1>About</h1>

            <button onClick={login}>Login</button>
        </div>
    );
}