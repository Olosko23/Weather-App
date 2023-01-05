import { useState, useEffect,useCallback } from 'react';
import Weather from './Weather';


function App() {
  const [data, setData] = useState(null);
  const [place, setPlace] = useState(null);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function locationHandler() {
    setSearch('');
    await navigator.geolocation.getCurrentPosition((position) => {
      const crd = position.coords;
      const latitude = crd.latitude;
      const longitude = crd.longitude;
      setLocation(`${latitude},${longitude}`);
    });
  }

  const fetchData = useCallback(async (search, location) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1e6ed15d8amsh9eea5bd6c42b4e7p150bbcjsn5288b59e50d7',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${
      search || location
    }`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  }, []);

  useEffect(() => {
    fetchData(search, location).then((responseData) => {
      setPlace(responseData.location);
      setData(responseData.current);
    });
  }, [location, search, fetchData]);

  let display = data ? (
    <Weather place={place} data={data} />
  ) : (
    <p className="text-3xl">Location not found...Try again</p>
  );

  return (
    <div className="bg-emerald-200 h-screen w-full grid place-items-center">
      <div className="border-2 rounded-xl px-24 py-24 gap-10">
        <h1 className="text-3xl pb-10">Weather Application</h1>
        <div className="rounded-md grid place-items-center">
          <input className="rounded-md h-16 w-80"
            type="text"
            value={search}
            placeholder="   Enter Location..."
            onChange={handleSearch}
          />
        </div>
        <div className="grid place-items-center">
          <p className="text-3xl font-semibold">or</p>
        </div>
        <div className="grid place-items-center">
          <button className="rounded-md py-5 px-10 bg-slate-400" onClick={locationHandler}>Determine Location!</button>
        </div>
        <br />
        <br />
        {display}
      </div>
    </div>
  );
}

export default App;
