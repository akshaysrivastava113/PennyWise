
import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import axios from "axios";



export default function RangeDemo() {
  const [dates, setDates] = useState(null);
  const [emailsData, setEmailsData] = useState([]);

    async function apiCall(): MouseEventHandler<HTMLButtonElement> {
            
      const sinceDate: any | string = dates&&dates[0];
      const formattedSinceDate: any | Date = new Intl.DateTimeFormat("en-CA").format(new Date(sinceDate)); // dd/mm/yyyy
      const beforeDate: any | string = dates&&dates[1];
      const formattedBeforeDate: any | Date = new Intl.DateTimeFormat("en-CA").format(new Date(beforeDate)); // dd/mm/yyyy
      console.log("formattedSinceDate client",formattedSinceDate);
      console.log("formattedBeforeDate client", formattedBeforeDate);
      await axios.post('http://localhost:3000/api/data', {
        sinceDate: formattedSinceDate,
        beforeDate: formattedBeforeDate
      })
      .then((res) => {
          setEmailsData(res.data);
      })
      .finally(()=> {
      })
      .catch((e) => console.error(e));
    }
    return (
      <>
        <div className="card flex justify-content-center">
            <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection dateFormat="dd/mm/yy"/>
            <button onClick={apiCall}>Submit</button>
        </div>
        <div>
          {emailsData.map((item) => <p>{item}</p>)}
        </div>
        </>
    )
}
        