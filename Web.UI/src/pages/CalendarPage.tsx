import { Layout } from "../components/Layout";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModalContext } from "../components/modal";
import { Fragment } from "react";
import React from "react";
import { getAllEvent, joinEvent } from "../api/assos.axios";
import { useStoreContext } from "../utils/context/StoreContext";
import { Button } from "@mui/material";

const Timer = ({ date, text }: { date: number, text: string }) => {
    const [final, setFinal] = React.useState('')
    React.useEffect(() => {
        setInterval(() => {
            const currentTime = new Date()
            const startTime = new Date(date)
            const diffTime = startTime.getTime() - currentTime.getTime()
            let duration = moment.duration(diffTime);
            setFinal(duration.hours() + 'h' + " " + duration.minutes() + 'm' + " " + duration.seconds() + 's')
        }, 1000);
    }, [new Date()])
    return (
        <Fragment>
            <span>{text + ' ' + final}</span>
        </Fragment>
    )
}

const CalendarPage = () => {
    const { state: { user: { id } } } = useStoreContext()
    const localizer = momentLocalizer(moment)
    const { openModal, updateModalContent, updateModalTitle, closeModal } = useModalContext()
    const handleEventClick = (event: { title: string, start: Date, end: Date, pointsToWin: number, id: number, participants: any }) => {
        console.log(event.participants);
        updateModalTitle(event.title)
        updateModalContent(
            <Fragment>
                <div className="flex flex-col h-full w-full justify-between">
                    <div className="h-32">
                        <Timer date={Number(event.start)} text={Number(event.start) < new Date().getTime() ? 'Event fini depuis' : 'Event commence dans'} />
                    </div>
                    <div className="mx-auto">
                        <Button
                            disabled={
                                !(Number(event.start) < new Date().getTime() && Number(event.end) > new Date().getTime())
                                || event.participants.map((participant: any) => participant.id).includes(id)
                            }
                            className="p-2 rounded-md shadow-md bg-blue-500"
                            variant="contained"
                            onClick={() => { joinEvent(event.id, id), closeModal() }}
                        >
                            Participer pour {event.pointsToWin} points
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
        openModal()
    }
    const [events, setEvents]: any[] = React.useState([{
        id: 0,
        dateStart: '',
        dateEnd: '',
        description: '',
        association: { id: 0 },
        name: '',
        pointsToWin: 0,
        participants: [{ id: 0 }],
    }])

    React.useEffect(() => {
        getAllEvent(id).then(res => {
            setEvents(
                res.map((element: any) => {
                    return {
                        id: element.id,
                        start: new Date(moment.utc((element.dateStart)).format('YYYY-MM-DD hh:mm')),
                        end: new Date(moment.utc((element.dateEnd)).format('YYYY-MM-DD hh:mm')),
                        description: element.description,
                        association: element.association,
                        title: element.name,
                        pointsToWin: element.pointsToWin,
                        participants: element.participants,
                    }
                })
            )
        })
    }, [id])

    return (
        <Layout large>
            <div className="h-screen w-full bg-white rounded-md p-2 shadow-lg">
                <Calendar
                    localizer={localizer}
                    events={events.filter((event: any) => event.title !== '')}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 780 }}
                    defaultView='week'
                    onSelectEvent={(event: any) => handleEventClick(event)}
                    showAllEvents
                />
            </div>
        </Layout>
    );
}
export default CalendarPage;