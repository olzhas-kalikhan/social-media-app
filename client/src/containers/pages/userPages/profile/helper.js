const dateToString = (date) => {
    let convertedDate = new Date(date)
    return convertedDate.toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
}

export { dateToString}