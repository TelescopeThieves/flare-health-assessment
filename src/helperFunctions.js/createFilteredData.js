
const createFilteredData = (code, filterBy, airportData) => {
    const filteredData = {}
    const filter = filterBy.filterType
    const year = filterBy.year
    let mean = 0
    let total = 0
    if(filter === 'Total' && year){
        for(const obj of airportData){
            if(obj.Airport.Code == code && obj.Time.Year == year){
                filteredData[obj.Time.Month] = obj.Statistics.Flights.Total
                total += obj.Statistics.Flights.Total
            }
        }
        filteredData['Result'] = total
        return filteredData
    } else if(filter && year) {
        for(const obj of airportData){
            if(obj.Airport.Code == code && obj.Time.Year == year){
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
        filteredData['Result'] = `${(mean / monthLength).toFixed(2)}%`
        return filteredData 
    }
    return {}
}

module.exports = createFilteredData