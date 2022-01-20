import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ChartContainer from '../styled/ChartContainer'
import FilterContainer from '../styled/FilterContainer'
import MonthContainer from '../styled/MonthContainer'
import Stats from '../styled/Stats'
import Button from '../styled/Button'
import Header from './Header'
import Footer from './Footer'
import WindowContainer from '../styled/WindowContainer'
import createFilteredData from '../helperFunctions.js/createFilteredData'

const Chart = () => {
    const [airportData, setAirportData] = useState([])
    const [filteredAirportData, setFilteredAirportData] = useState({})
    const airportCodes = ['ATL', 'BOS', 'BWI', 'CLT', 'DCA', 'DEN', 'DFW', 'DTW', 'EWR', 'FLL', 'IAD', 'IAH', 'JFK', 'LAS', 'LAX', 'LGA', 'MCO', 'MDW', 'MIA', 'MSP', 'ORD', 'PDX', 'PHL', 'PHX', 'SAN', 'SEA', 'SFO', 'SLC', 'TPA']
    const [filterBy, setFilterBy] = useState({
        filterType: "",
        year: "",
        selectedAirportCodes: []
    })
    const clear = () => {
        setFilterBy({
            filterType: "",
            year: "",
            selectedAirportCodes: []
        })
        setFilteredAirportData({})
    }
    const getAirportData = async () => {
        const localData = await JSON.parse(localStorage.getItem('airport_data'))
        if(localData){
            setAirportData(localData)
        } else {
            const {data} = await axios.get(`https://flare-code-exercise-data.s3.amazonaws.com/airlines.json`)
            setAirportData(data)
            localStorage.setItem('airport_data', JSON.stringify(data))
        }
    }
    const handleFilterSelect = (e) => {
        const {value, name} = e.target
        if(name === 'selectedAirportCodes'){
            const checkForFilters = filterBy.filterType.length && filterBy.year.length
            if(checkForFilters){
                setFilterBy((prev) => ({...prev, [name]: [...prev.selectedAirportCodes, value]}))
            } else {
                setFilterBy((prev) => ({...prev, [name]: [value]}))
            }
        } else {
            setFilterBy((prev) => ({...prev, [name]: value}))
        }
    }
    const getFilteredAirportData = async (code) => {
        const data = createFilteredData(code, filterBy, airportData)
        if(Object.keys(data).length){
            setFilteredAirportData((prev) => ({...prev, [code]: data}))
        }
    }
    useEffect(()=> {
        getAirportData();
        filterBy.selectedAirportCodes.forEach(code => getFilteredAirportData(code));
    }, [filterBy])
    return(
        <WindowContainer>
            <Header />
            <ChartContainer>
                <FilterContainer>
                    <div className='filters'>
                        <div>
                            <label htmlFor={'filterType'}>Filter by:</label>
                            <select name={'filterType'} value={filterBy.filterType} onChange={handleFilterSelect}>
                                <option value={''}>Choose option</option>
                                <option value={'Total'}>Number of flights</option>
                                <option value={'On Time'}>% of flights on time</option>
                                <option value={'Cancelled'}>% of flights canceled</option>
                                <option value={'Diverted'}>% of flights diverted</option>
                                <option value={'Delayed'}>% of flights delayed</option>
                                <option value={'Carrier'}>% of flights delayed due to carrier delay</option>
                                <option value={'Late Aircraft'}>% of flights delayed due to late aircraft</option>
                                <option value={'Weather'}>% of flights delayed due to weather</option>
                                <option value={'Security'}>% of flights delayed due to security</option>
                                <option value={'National Aviation System'}>% of flights delayed due to air traffic control</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor={'year'}>Year:</label>
                            <select name={'year'} value={filterBy.year} onChange={handleFilterSelect}>
                                <option value={''}>Choose year</option>
                                <option value={'2003'}>2003</option>
                                <option value={'2004'}>2004</option>
                                <option value={'2005'}>2005</option>
                                <option value={'2006'}>2006</option>
                                <option value={'2007'}>2007</option>
                                <option value={'2008'}>2008</option>
                                <option value={'2009'}>2009</option>
                                <option value={'2010'}>2010</option>
                                <option value={'2011'}>2011</option>
                                <option value={'2012'}>2012</option>
                                <option value={'2013'}>2013</option>
                                <option value={'2014'}>2014</option>
                                <option value={'2015'}>2015</option>
                                <option value={'2016'}>2016</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor={'selectedAirportCodes'}>Airport Code:</label>
                            <select name={'selectedAirportCodes'} value={filterBy.selectedAirportCodes.slice(-1)} onChange={handleFilterSelect}>
                                <option value={''}>{filterBy.selectedAirportCodes[filterBy.selectedAirportCodes.length - 1] || 'Code'}</option>
                                {airportCodes.map(code => {
                                    if(!filterBy.selectedAirportCodes.includes(code)){
                                        return <option key={code} value={code}>{code}</option>
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='clear'>
                        <Button onClick={clear}>Clear</Button>
                    </div>
                </FilterContainer>
                <MonthContainer>
                            <div></div>
                            <div>Jan</div>
                            <div>Feb</div>
                            <div>March</div>
                            <div>April</div>
                            <div>May</div>
                            <div>June</div>
                            <div>July</div>
                            <div>Aug</div>
                            <div>Sept</div>
                            <div>Oct</div>
                            <div>Nov</div>
                            <div>Dec</div>
                            <div className='result'>{filterBy.filterType === 'Total' ? 'Total' : 'Mean'}</div>
                </MonthContainer>
                {Object.keys(filteredAirportData).length ?
                    (<Stats>     
                        {filterBy.selectedAirportCodes.map(a => 
                            {
                                if(filterBy.filterType.length && filterBy.year.length){
                                    return  <div key={a} className='stats'>
                                                <div className='codes'>{a}</div>
                                                <div>{filteredAirportData?.[a]?.[1]}</div>
                                                <div>{filteredAirportData?.[a]?.[2]}</div>
                                                <div>{filteredAirportData?.[a]?.[3]}</div>
                                                <div>{filteredAirportData?.[a]?.[4]}</div>
                                                <div>{filteredAirportData?.[a]?.[5]}</div>
                                                <div>{filteredAirportData?.[a]?.[6]}</div>
                                                <div>{filteredAirportData?.[a]?.[7]}</div>
                                                <div>{filteredAirportData?.[a]?.[8]}</div>
                                                <div>{filteredAirportData?.[a]?.[9]}</div>
                                                <div>{filteredAirportData?.[a]?.[10]}</div>
                                                <div>{filteredAirportData?.[a]?.[11]}</div>
                                                <div>{filteredAirportData?.[a]?.[12]}</div>
                                                <div className='mean'>{filteredAirportData?.[a]?.Result}</div>
                                            </div>
                                }
                            }
                        )}
                    </Stats>)
                    :
                    (
                        <></>
                    )
                }
            </ChartContainer>
            <Footer />
        </WindowContainer>
    )
}

export default Chart