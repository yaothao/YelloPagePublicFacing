import React, {useEffect, useState} from "react";

function Stream() {
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const source = new EventSource('http://localhost:3001/api/stream?dir=../src/ads_img');
      // handle SSE
      source.onmessage = (event) => {
        console.log("event.data");
        const data = JSON.parse(event.data);
        setMessage(data.message);
      };
  
      // cleanup
      return () => {
        source.close();
      };
    }, []);
  
    return (
      <div>
        <h1>Server Sent Events Example</h1>
        <p>Message: {message}</p>
      </div>
    );
}

export default Stream;