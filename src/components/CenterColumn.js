import React, {useState, useEffect} from 'react';

export default function CenterColumn({message, req, setMessage, setReq, sendMessage, sendReq}) {
    useEffect(() => {
        setMessage(message);
    }, [message, setMessage]);
    // req
    useEffect(() => {
        setReq(req);
    }, [req, setReq]);

    const handleSubmit = () => {
        sendMessage(message);
    };
    const handleReqSubmit = () => {
        console.log("req", req);
        sendReq(req);
    }

    return (
        <section className="w-2/5 p-4 bg-gray-100">
            <h2 className="text-lg mb-2">Publish Event</h2>
            <div className="mb-2">
        <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
            className="w-full p-2"
            rows="4"
        />
            </div>
            <button onClick={handleSubmit} className="p-2 bg-blue-600 text-white">
                Send
            </button>

            <h2 className="text-lg mb-2 mt-4">Send request</h2>
            <div className="mb-2">
        <textarea
            value={req}
            onChange={(e) => setReq(e.target.value)}
            placeholder="Enter your message here"
            className="w-full p-2"
            rows="4"
        />
            </div>
            <button onClick={handleReqSubmit} className="p-2 bg-blue-600 text-white">
                Send
            </button>
        </section>
    );
}
