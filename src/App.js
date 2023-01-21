import Header from './components/Header.js';
import CountryListings from './components/CountryListings.js';
import {useState, useEffect} from 'react';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CountryDetails from './components/CountryDetails.js';

function App() {
  const [fetchedData, setFetchedData] = useState({});
  const [filterPopupOn, setFilterPopupOn] = useState(false);
  const [chosenRegion, setChosenRegion] = useState(null);
  const fetchCountries = async () => {
    let bigObject = {};
    const europePromise = new Promise((resolve)=>{
      const deita = fetch(`https://restcountries.com/v3.1/region/europe`);
      resolve(deita)
    }, (reject)=>{
      alert("There was a problem with loading necessary data")
    });
    const oceaniaPromise = new Promise((resolve)=>{
      const deita = fetch(`https://restcountries.com/v3.1/region/oceania`);
      resolve(deita)
    }, (reject)=>{
      alert("There was a problem with loading necessary data")
    });
    const asiaPromise = new Promise((resolve)=>{
      const deita = fetch(`https://restcountries.com/v3.1/region/asia`);
      resolve(deita)
    }, (reject)=>{
      alert("There was a problem with loading necessary data")
    });
    const americaPromise = new Promise((resolve)=>{
      const deita = fetch(`https://restcountries.com/v3.1/region/americas`);
      resolve(deita)
    }, (reject)=>{
      alert("There was a problem with loading necessary data")
    });
    const africaPromise = new Promise((resolve)=>{
      const deita = fetch(`https://restcountries.com/v3.1/region/africa`);
      resolve(deita)
    }, (reject)=>{
      alert("There was a problem with loading necessary data")
    });
    asiaPromise.then(res => {
      return res.json();
    })
    .then(res => {
      bigObject.asia = res;
    }).then(()=>{
      europePromise.then(res => {
        return res.json();
      })
      .then(res => {
        bigObject.europe = res;
      }).then(()=>{
        americaPromise.then(res => {
          return res.json();
        })
        .then(res => {
          bigObject.americas = res;
        }).then(()=>{
          africaPromise.then(res => {
            return res.json();
          })
          .then(res => {
            bigObject.africa = res;
          }).then(()=>{
            oceaniaPromise.then(res => {
              return res.json();
            })
            .then(res => {
              bigObject.oceania = res;
            }).then(()=>{
              setFetchedData(bigObject);
            });
          });
        });
      });
    });
  }
  useEffect(()=>{
    fetchCountries();
  }, []);
  if(Object.keys(fetchedData).length!==0){
    return (
      <BrowserRouter>
        <div className="App">
          <Header setChosenRegion={setChosenRegion}/>
          <Routes>
            <Route exact path='/home' element={
              <CountryListings fetchedData={fetchedData} chosenRegion={chosenRegion} filterPopupOn={filterPopupOn} setFilterPopupOn={setFilterPopupOn} setChosenRegion={setChosenRegion}/>
            }/>
            <Route exact path='/' element={
              <CountryListings fetchedData={fetchedData} chosenRegion={chosenRegion} filterPopupOn={filterPopupOn} setFilterPopupOn={setFilterPopupOn} setChosenRegion={setChosenRegion}/>
            }/>
            <Route exact path='/country/:name' element={
              <CountryDetails fetchedData={fetchedData}/>
            }/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
