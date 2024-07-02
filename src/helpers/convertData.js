
const convertData = (data, type) => {
    const convertedData = data[type].map(item => {
        return {
            date: new Date(item[0]).getDate(),
            [type]: item[1].toFixed(0)
        }
    })

    return convertedData;
}

export { convertData };