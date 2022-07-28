import { useState, useEffect} from 'react';
import axios from 'axios';


export function APITest() {
    const secret = ''; 
    const key = ''; 
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    const body = {
        rapyd_access_key: '5D47E21B4BF411FD87C6', 
        rapyd_secret_key: '75f63ec5132ccc645f4b02d14422250c891fad80fdd3713f72d85f800af86c6ab300ec2db88f7ba3'
      };

      const headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'rapyd_access_key, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'rapyd_access_key': '5D47E21B4BF411FD87C6', 
        'rapyd_secret_key': '75f63ec5132ccc645f4b02d14422250c891fad80fdd3713f72d85f800af86c6ab300ec2db88f7ba3'
      }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
          axios.get(`https://sandboxapi.rapyd.net/v1/data/currencies`, {
            headers: headers
          })
          .then(res => res.json())
          .then(
            (res) => {
              setIsLoaded(true);
              setItems(res);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])
  
    if (error) {
        console.log(error.message);
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        console.log('Loading');
      return <div>Loading...</div>;
    } else {
        console.log(items);
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }