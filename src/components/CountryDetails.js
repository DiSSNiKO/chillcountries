import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function CountryDetails(props){
    const { fetchedData } = props;
    const [deita, setDeita] = useState({});
    const fetchCountry = async () => {
        const response = await fetch(`https://restcountries.com/v3/name/${window.location.pathname.slice(9)}?fullText=true`);
        const deita = await response.json();
        setDeita(deita[0]);
    }
    useEffect(()=>{
        fetchCountry();
    },[]);
    const findCountryBy3LetterSymbol = (neighborsArray) => {
        let borderingCountries = [];
        Object.entries(fetchedData).forEach((countryList)=>{
            countryList[1].forEach((country)=>{
                if(neighborsArray.includes(country['cca3'])){
                    borderingCountries.push(country['name']['common']);
                }
            });
        });
        return borderingCountries;
    }
    if(Object.keys(deita).length>0){
        return ( 
            <div className="countryDetails">
                <Link to={"/home"} className="gobackbutton"><img src='/images/lightleftarrow.svg'></img>Go back</Link>
                <div className="imgAndDetails">
                    <img src={`${deita['flags'][1]}`} className='countryDetailsImg' alt="" />
                    <div className="extendedInfo">
                        <h1 className="countryTitle">{deita['name']['common']}</h1>
                        <div className="countryAttributeList">
                            <div>
                                <span><strong>Population: </strong>{deita['population']}</span>
                                <span><strong>Region: </strong>{deita['region']}</span>
                                <span><strong>Sub-region: </strong>{deita['subregion']}</span>
                                <span><strong>Capital: </strong>{deita['capital'][0]}</span>
                            </div>
                            <div>
                                <span><strong>Area: </strong>{deita['area']}</span>
                                <span><strong>Languages: </strong>{Object.entries(deita['languages']).map((lang, indx)=>{
                                    if(indx!==Object.entries(deita['languages']).length-1){
                                        return lang[1]+', ';
                                    } else {
                                        return lang[1]
                                    }
                                    })}</span>
                                <span><strong>Currencies: </strong>{Object.entries(deita['currencies']).map((curr, indx)=>{
                                    
                                    if(Object.entries(deita['currencies']).length-1!==indx){
                                        return curr[1]['symbol']+', ';
                                    } else {
                                        return curr[1]['symbol'];
                                    }
                                })}</span>
                            </div>
                        </div>
                        <div className="neighborCountries">
                            <span><strong>Neighbouring countries: </strong></span>
                            {deita['borders'] ? findCountryBy3LetterSymbol(deita['borders']).map((border, indx)=>{
                                console.log(border)
                                return (
                                    <button key={indx} onClick={()=>{
                                        window.location.href=`/country/${border.toLowerCase()}`;
                                    }}>{border}</button>
                                )
                            }): <span>Nothing here RIP</span>}
                        </div>
                    </div>
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
export default CountryDetails;