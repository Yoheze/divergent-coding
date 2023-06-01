import './App.css'
import React, { useState, useEffect } from 'react'

function App() {
  // This state is to keep track of the number of shelves for each zone (starting each slider at 5)
  const [zoneValues, setZoneValues] = useState(Array(12).fill(5));
  // Obtaining the name from the input of creating a new Warehouse
  const [name, setName] = useState('')
  // An Array to keep track of every warehouse (since I am not including a database in the backend)
  const [newWareHouse, setNewWareHouse] = useState([]);

  // function that runs when new Warehouse button is clicked to send the information to the backend
  const sendToDatabase = () => {
    // making sure that there isn't a blank input for the name of the warehouse
    if (!name) {
      alert('must input name for new warehouse')
      return;
    }

    // sending to back end (in server folder, index.js)
    fetch('/new-warehouse', {
      // post request
      method: 'POST',
      // must specify type of data to not confuse express
      headers: {
        "Content-Type": "application/json",
      },
      // stringify data before sending it to the backend to process the data more efficiently
      body: JSON.stringify({ name, zoneValues })
    })
    // retreiving data from the data base and parsing the appropriate information out
    .then(data=>data.json())
    .then(data=>{
      // adding the new warehouse to the array (because I did not attach a database to this project)
      setNewWareHouse(current => {
        // save all old warehouses and add the new warehouse to state variable newWareHouse
        return [...current, data]
      })
    })
  }

  // function to update the appropriate value in the array so that the number of shelves goes with the right zone
  const handleZoneChange = (index, value) => {
    setZoneValues(oldValues => {
      // create a copy to not mutate the original array
      const newValues = [...oldValues];
      // specifically change the value of the matching zone and slider with the correct index position
      newValues[index] = value;
      // return the newValues to save it to state variable zoneValues
      return newValues;
    });
  };



  return (
    <>
      <form onSubmit={(e)=>{
        // stop page from refreshing with the submit button
        e.preventDefault();
        sendToDatabase()}}>
        <label id='label'>Name of New Warehouse: </label>
        <input type="text" onChange={(e)=>{
          // keep track of input values to send to database later
          setName(e.target.value)}}
          placeholder="name"></input>
        <div className="zones">
          {// mapping through zone values so that I don't have to render 12 labels and inputs
          zoneValues.map((zoneValue, index) => (
            <>
              <p>{zoneValue}</p>
              <label key={index}>
                Zone {index + 1}: 
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={zoneValue} 
                  onChange={(e) => handleZoneChange(index, Number(e.target.value))} 
                />
              </label>
              
            </>
          ))}
        </div>
        <button type='submit'>New Warehouse</button>
      </form>
      <div className="organize-warehouses">
      { // mapping through the json object to render all the information on the front end
      newWareHouse.map(el=>{ 
        return (
          <div className="warehouse">
            <h3>{el.name}</h3>
            {el.zoneValues.map((el, index)=>{
              const shelves = [];
              for (let i = 0; i < el; i++) {
                // i + 1 because I want to render Shelf 1 first and not Shelf 0
                shelves.push(<p>Shelf {i + 1}</p>)
              }
              return (
                <>
                  <h4>Zone {index + 1}</h4>
                  {shelves}
                </>
                )
            })}
          </div>
          )
        })
      }
      </div>
    </>
  );
}

export default App;

