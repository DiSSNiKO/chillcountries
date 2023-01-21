function SearchAndRegion(props){
  const { filterPopupOn, setFilterPopupOn, chosenRegion, setChosenRegion, setAllData, fetchedData } = props;
  const radioChange = (val) => {
    setChosenRegion(val);
    setFilterPopupOn(false);
  } 
  return (
    <div className="searchAndRegion">
      <form action="GET" onSubmit={(e)=>{
        e.preventDefault();
        let chosenCountries = [];
        const input = e.target.querySelector('#countrySearch')
        const val = input.value;
        if(val!==""){
          for(const kei of Object.keys(fetchedData)){
            for(const country of fetchedData[`${kei}`]){
              if(country.name.common.toLowerCase().includes(val.toLowerCase())){
                chosenCountries.push(country);
                // console.log(chosenCountries);
              }
            }
          }
        }
        if(chosenCountries.length>0){
          setAllData(chosenCountries);
          setChosenRegion("no region");
          input.value = '';
        } else {
          e.target.classList.add('noCountry');
          setTimeout(()=>{
            e.target.classList.remove('noCountry');
          }, 300);
          input.value = '';
        }
      }}>
        <label htmlFor="countrySearch">
          <img src="./images/magnifyglass.svg" alt="" />
        </label>
        <input type="text" placeholder="Search for country" id="countrySearch"/>
      </form>
      <div className="buttonAndDropdown">
        <button className="regionFilter" onClick={()=>{
          if(filterPopupOn){
            setFilterPopupOn(false);
          } else {
            setFilterPopupOn(true);
          }
        }}>
          {(chosenRegion && chosenRegion!=="no region") ? `${chosenRegion}`:"Filter by Region"}
          <img src="./images/downarrow.svg" alt="" className={`regionFilterArrow ${filterPopupOn ? "rotated":""}`} />
        </button>
        <div className={`regionDropdown ${filterPopupOn ? "":"hideRegionDropdown"}`}>
          <div>
            <label htmlFor="allRadio">
              All 
            </label>
            <input type="radio" name="region" id="allRadio"  value="all" onChange={(e)=>{
              radioChange(e.target.value);
            }}/>
          </div>
          <div>
            <label htmlFor="africaRadio">
              Africa
            </label>
            <input type="radio" name="region" id="africaRadio" value="africa" onChange={(e)=>{
              radioChange(e.target.value);
            }}/>
          </div>
          <div>
            <label htmlFor="americaRadio">
              Americas
            </label>
            <input type="radio" name="region" id="americaRadio"  value="americas" onChange={(e)=>{
              radioChange(e.target.value);
            }}/>
          </div>
          <div>
            <label htmlFor="asiaRadio">
              Asia
            </label>
            <input type="radio" name="region" id="asiaRadio"  value="asia" onChange={(e)=>{
              radioChange(e.target.value);
            }}/>
          </div>
          <div>
            <label htmlFor="europeRadio">
              Europe
            </label>
            <input type="radio" name="region" id="europeRadio"  value="europe" onChange={(e)=>{
              radioChange(e.target.value);
            }}/>
          </div>
          <div>
            <label htmlFor="oceaniaRadio">
              Oceania 
            </label>
            <input type="radio" name="region" id="oceaniaRadio"  value="oceania" onChange={(e)=>{
              radioChange(e.target.value);
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchAndRegion;