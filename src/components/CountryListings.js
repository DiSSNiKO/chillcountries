import { useEffect, useState } from "react";
import SearchAndRegion from "./SearchAndRegion";
import { Link } from "react-router-dom";
function CountryListings(props){
  const { fetchedData, chosenRegion, filterPopupOn, setChosenRegion, setFilterPopupOn} = props; //Array of 250 objects lmaooo 
  const [allData, setAllData] = useState([]);
  useEffect(()=>{
    let bigarray = [];
    Object.keys(fetchedData).forEach((region)=>{
      fetchedData[`${region}`].forEach((country)=>{
        bigarray.push(country);
      });
    });
    setAllData(bigarray);
  },[]);
  useEffect(()=>{
    const newAllData = [];
    if((chosenRegion!=="all" && chosenRegion!=="no region") && chosenRegion){
      setAllData(fetchedData[`${chosenRegion}`]);
    } else if(chosenRegion!=="no region") {
      Object.keys(fetchedData).forEach((region)=>{
        fetchedData[`${region}`].forEach((country)=>{
          newAllData.push(country);
        });
      });
      console.log(newAllData)
      setAllData(newAllData);
    }
  },[chosenRegion]);
  if(allData.length!==0){
      return (
      <div>
        <SearchAndRegion filterPopupOn={filterPopupOn} setFilterPopupOn={setFilterPopupOn}
          chosenRegion={chosenRegion} setChosenRegion={setChosenRegion}
          fetchedData={fetchedData} setAllData={setAllData}
          />
        <div className="countryListings">
          {allData.map((country, index)=>{
            return (
              <div key={index} className="countryListing">
                <Link to={`/country/${country.name.common.toLowerCase()}`} className="listingLink">
                  <img src={country['flags'].png} alt="" />
                  <div className="countryListingDetails">
                    <div className="countryName">{country.name.common}</div>
                    <div className="countryDetail">Population : {country.population}</div>
                    <div className="countryDetail">Region : {country.region}</div>
                    <div className="countryDetail">Capital : {country.capital}</div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      );
    } else {
      return <div className="dataLoading">
        <div className="dataload1"></div>
        <div className="dataload2"></div>
        <div className="dataload3"></div>
      </div>
    }
}
export default CountryListings;