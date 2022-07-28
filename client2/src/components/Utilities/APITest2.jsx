import { useState, useEffect} from 'react';
import axios from 'axios';


export function APITest2() {

    const [data, setData] = useState({});

    // useEffect(() => {
    //     fetch("/ListCountries")
    //     .then(res => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         console.log(data.status);
    //         setData(data);
    //     },
    //     (error) => {
    //         console.log(error);
    //     })

    //     console.log(data);
    // }, [])

    //CreateVirtualAccount
    const body = {
        country:"SK",
        currency:"EUR",
        ewallet: "ewallet_77fcf35b60943fcd9988cd7a4ac614bf"
    }

    useEffect(() => {
        fetch('/GetWalletBalance', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
          })
  }, [])

    return(<div></div>)

  }