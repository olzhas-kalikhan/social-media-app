import moment from 'moment'
const dateToString = (date) => {
    let now = moment(new Date())
    let output = moment(date)
    let diff = moment.duration(now.diff(output)).asDays()
    if (diff >= 1)
        return output.format('MMM D')
    else
        return output.fromNow()
}

export { dateToString }