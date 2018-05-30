import React from 'react';
export function dateConverter(date) {
    let event = new Date(date)
    return <div>
        {event.toDateString().slice(4)}
    </div>
}


export function getBeltInfo(beltColor) {
    let belt;
    let label;
    switch (beltColor) {
        case "yellow":
            belt = '#FFFF00'
            label = 'Yellow'
            break
        case "halfgreen":
            belt = '#3ADF00'
            label = 'Half Green'
            break
        case "green":
            belt = '#298A08'
            label = 'Green'
            break
        case "halfblue":
            belt = '#0000FF'
            label = 'Half Blue'
            break
        case "blue":
            belt = '#08088A'
            label = 'Blue'
            break
        case "halfred":
            belt = '#FE2E64'
            label = 'Half Red'
            break
        case "red":
            belt = '#DF013A'
            label = 'Red'
            break
        case "halfblack":
            belt = '#848484'
            label = 'Half Black'
            break
        case "black":
            belt = '#000000'
            label = 'Black'
            break
        default:
            belt = "#FFFFFF"
            label = 'White'
    }
    return <div><span className="glyphicon glyphicon-bookmark" style={{ color: belt, marginRight: 5 }} />{label}</div>
}