import { useEffect, useState } from "react";
import { Event } from "@common/dto/event";
import api from "@/utils/api";

Component.displayName = "EventPage";

export function Component() {

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/events");;
            setEvents(response.data.data);
        };
        fetchData();
    }, []);

    return (<div>
        <h1>Events</h1>
        <ul>
            {events.map((event) => (
                <li key={event.id}>{event.name}</li>
            ))}
        </ul>
    </div>);
}