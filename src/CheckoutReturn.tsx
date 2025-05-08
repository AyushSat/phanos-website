import {useState, useEffect } from "react";
import {Navigate} from "react-router-dom";

const Return = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        console.log("Hitting session status from Return Component");
        fetch(import.meta.env.VITE_API_URL + `/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
            setStatus(data.status);
        });
    }, []);

    if (status === 'open') {
        return (
        <Navigate to="/checkout" />
        )
    }else if (status === 'complete') {
        return <Navigate to="/users" />
    }else{
        return (<section id="success">
            <p>
            Something went wrong... Status: {status}
            </p>
        </section>)
    }
}

export default Return;