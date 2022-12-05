import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Weather from './components/Weather';
function App() {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  if (!navigator.geolocation) {
    throw new Error("No geolocation available")
}
function success(pos) {
  const { latitude } = pos.coords
  const { longitude } = pos.coords
  setLatitude(latitude)
  setLongitude(longitude)
}

function error(pos) {
    console.log(pos)
}

const options = {}
navigator.geolocation.getCurrentPosition(success, error, options)
  return (
    <div className="App">
      <Weather longitude={ longitude} latitude={latitude} />
    </div>
  );
}

export default App;
