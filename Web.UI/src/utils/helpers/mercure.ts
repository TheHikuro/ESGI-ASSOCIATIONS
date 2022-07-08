import React from "react";

export const useMercureState = (initialState: any) => {
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
        const url = new URL('http://localhost:8000/.well-known/mercure');
        url.searchParams.append('topic', 'http://localhost:3000/api/posts/{id}');

        const eventSource: EventSource = new EventSource(url, { withCredentials: true });

        eventSource.onmessage = e => console.log(e.data);
    }, []);

    return state;
}