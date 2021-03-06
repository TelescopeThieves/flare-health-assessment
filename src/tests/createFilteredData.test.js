const createFilteredData = require("../helperFunctions.js/createFilteredData")
const dummyAirportData = require("./dummyAirportData") 

test('returns data for % of flights on time in 2004 for ATL', () => {
    expect(createFilteredData("ATL", {
        filterType: "On Time",
        year: "2004",
        selectedAirportCodes: ["ATL"]
    }, dummyAirportData['API RESULT'])).toStrictEqual(dummyAirportData['ATL TEST'])
})
test('returns data for % of flights delayed in 2013 for FLL', () => {
    expect(createFilteredData("FLL", {
        filterType: "Delayed",
        year: "2013",
        selectedAirportCodes: ["FLL"]
    }, dummyAirportData['API RESULT'])).toStrictEqual(dummyAirportData['FLL TEST'])
})
test('returns empty object when no filter type is provided', () => {
    expect(createFilteredData("FLL", {
        filterType: "",
        year: "2013",
        selectedAirportCodes: ["FLL"]
    }, dummyAirportData['API RESULT'])).toStrictEqual(dummyAirportData['EMPTY'])
})
test('returns empty object when no year value is provided', () => {
    expect(createFilteredData("FLL", {
        filterType: "Delayed",
        year: "",
        selectedAirportCodes: ["FLL"]
    }, dummyAirportData['API RESULT'])).toStrictEqual(dummyAirportData['EMPTY'])
})