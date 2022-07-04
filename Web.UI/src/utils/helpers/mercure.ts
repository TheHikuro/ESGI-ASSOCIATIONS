import React from "react";

export const useMercureState = (initialState: any) => {
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
        // allow CORS
        const url = new URL('http://localhost:8000/.well-known/mercure');
        url.searchParams.append('topic', 'http://localhost:3000/api/posts/{id}');

        const eventSource = new EventSource(url, { withCredentials: true });

        // The callback will be called every time an update is published
        eventSource.onmessage = e => console.log(e); // do something with the payload
    }, []);

    return state;
}