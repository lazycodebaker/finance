import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: Index,
});

function Index() {
    return (
        <div>
            <h1>About</h1>
        </div>
    );
}