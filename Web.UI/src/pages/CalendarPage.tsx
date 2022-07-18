import { Layout } from "../components/Layout";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModalContext } from "../components/modal";
import { Fragment } from "react";

const CalendarPage = () => {
    const localizer = momentLocalizer(moment)
    const { openModal, updateModalContent, updateModalTitle } = useModalContext()
    const handleEventClick = (event: { title: string, start: Date, end: Date }) => {
        updateModalTitle(event.title)
        updateModalContent(
            <Fragment>
                <h1>{event.title}</h1>
            </Fragment>
        )
        openModal()
    }
    return (
        <Layout large>
            <div className="h-screen w-full bg-white rounded-md p-2 shadow-lg">
                <Calendar
                    localizer={localizer}
                    events={[{ title: 'today', start: new Date('2022-07-18:08:45'), end: new Date('2022-07-18:12:45') }]}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 780 }}
                    defaultView='week'
                    onSelectEvent={event => handleEventClick(event)}
                />
            </div>
        </Layout>
    );
}
export default CalendarPage;