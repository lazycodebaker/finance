
import { api } from '@/hono/client'; 
import { createLazyFileRoute } from '@tanstack/react-router' 

export const Route = createLazyFileRoute('/about')({
    errorComponent: () => <div>Error While Rendering About Page</div>,
    component: Index,
});

function Index() {

    const login = async () => {
        const response = await api.auth.login.$post({
            form: {
                username: "lazycodebaker",
                password: "Lazycodebaker@14"
            }
        })

        console.log(await response.json());

    };

    return (
        <div>
            <h1>About</h1>

            <button onClick={login}>Login</button>
        </div>
    );
}