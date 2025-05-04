import {useState, useEffect } from "react";
import {Navigate} from "react-router-dom";

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        console.log("Hitting session status from Return Component");
        fetch(import.meta.env.VITE_API_URL + `/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
            setStatus(data.status);
            setCustomerEmail(data.customer_email);
        });
    }, []);

    if (status === 'open') {
        return (
        <Navigate to="/checkout" />
        )
    }else if (status === 'complete') {
        return (
        <section id="success">
            <p>
            We appreciate your business! A confirmation email will be sent to {customerEmail}.

            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
        </section>
        )
    }else{
        return (<section id="success">
            <p>
            Something went wrong... Status: {status}
            </p>
        </section>)
    }
}

export default Return;