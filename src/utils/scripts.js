export function dateConverter(date) {
    console.log(date)
    let event = new Date(date)
    return <div>
        {event.toDateString().slice(4)}
    </div>
}

