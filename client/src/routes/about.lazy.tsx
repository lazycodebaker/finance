
import { api } from '@/hono/client';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    errorComponent: () => <div>Error While Rendering About Page</div>,
    component: Index,
});

export const getAuth = async () => {
    const response = await api.auth.user.$get();
    if (!response.ok) return null;
    const data = await response.json();
    const user = data.data;
    return user;
};

function Index() {

    const { data } = useQuery({
        queryKey: ["auth"],
        queryFn: getAuth,
    });

    const login = async () => {
        await api.auth.login.$post({
            form: {
                username: "lazycodebaker",
                password: "Lazycodebaker@14"
            }
        }).then(async (result: unknown) => {
            const res = await result.json();
            console.log(res)

            if (res?.message) {
                localStorage.setItem("user", JSON.stringify(data));
            }
        }).catch((err: unknown) => {
            console.log(err);
        });
    };

    return (
        <div>
            <h1>About</h1>

            <button className='px-4 py-2 bg-gray-900 text-gray-50 text-xs text-center' onClick={login}>Login</button>
        </div>
    );
}