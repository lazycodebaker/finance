
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
        }).then(async (result : unknown) => {
            console.log(await result.json());
            
        }).catch((err : unknown) => {
            console.log(err);
            
        });

        //console.log(await response.json());

    };

    return (
        <div>
            <h1>About</h1>

            <button className='px-4 py-2 bg-gray-900 text-gray-50 text-xs text-center' onClick={login}>Login</button>
        </div>
    );
}