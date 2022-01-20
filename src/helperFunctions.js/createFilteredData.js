
const createFilteredData = (code, filterBy, airportData) => {
    const filteredData = {}
    const filter = filterBy.filterType
    let mean = 0
    let total = 0
    if(filter === 'Total'){
        for(const obj of airportData){
            if(obj.Airport.Code == code && obj.Time.Year == filterBy.year){
                filteredData[obj.Time.Month] = obj.Statistics.Flights.Total
                total += obj.Statistics.Flights.Total
            }
        }
    } else {
        for(const obj of airportData){
            if(obj.Airport.Code == code && obj.Time.Year == filterBy.year){
                obj.Statistics.Flights[filter] ? (
                    filteredData[obj.Time.Month] = `${(obj.Statistics.Flights[filter] / obj.Statistics.Flights.Total * 100).toFixed(2)}%`
                )
                :
                (
                    filteredData[obj.Time.Month] = `${(obj.Statistics['# of Delays'][filter] / obj.Statistics.Flights.Total * 100).toFixed(2)}%`
                )
                obj.Statistics.Flights[filter] ? (
                    mean += (obj.Statistics.Flights[filter] / obj.Statistics.Flights.Total * 100)
                )
                :
                (
                    mean += (obj.Statistics['# of Delays'][filter] / obj.Statistics.Flights.Total * 100)
                )
            }
        }
        const monthLength = Object.keys(filteredData).length
        mean = `${(mean / monthLength).toFixed(2)}%`
    }
    filter === 'Total' ? filteredData['Result'] = total : filteredData['Result'] = mean
    return filteredData
}

// export default createFilteredData
module.exports = createFilteredData