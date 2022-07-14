import React, { Fragment } from 'react';

interface MercureProps {
    children: React.ReactNode;
    topics: string[];
    hub: string;
    update: (data: any) => void;
    json: boolean
}

export const MercureSubscriber = ({ json, update, hub, topics, children }: MercureProps) => {
    React.useEffect(() => {
        const url = new URL(hub);

        topics.map(topic => {
            url.searchParams.append('topic', topic);
        })

        const eventSource = new EventSource(url);

        eventSource.onmessage = function (e) {
            update(json ? JSON.parse(e.data) : e.data);
        };
    }, []);

    return <Fragment>{children}</Fragment>
}

export default MercureSubscriber;

