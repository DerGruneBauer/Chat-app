import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [testApiData, setTestApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const testFetchCall = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    return fetch(`http://localhost:8080`, requestOptions)
  }

  useEffect(() => {
    testFetchCall()
      .then(res => res.json())
      .then(data => { console.log(data.express); setTestApiData(data.express); setIsLoading(false) });
  }, [])

  return (
    <div className="App">
          {isLoading ? 'Still Loading...' : testApiData}
    </div>
  );
}

export default App;
