import React, { useState } from 'react';

export default function Header({ connectRelay, status }) {
    const [relayURI, setRelayURI] = useState("wss://relay.nostriot.com");

    return (
        <header className="p-4 bg-gray-800 text-white">
            <h1 className="text-xl">Nostr Relay Tester</h1>
            <div className="flex items-center">
                <input
                    type="text"
                    value={relayURI}
                    onChange={(e) => setRelayURI(e.target.value)}
                    placeholder="wss://relay.nostriot.com"
                    className="flex-1 p-2 mr-2 text-black"
                />
                <button onClick={() => connectRelay(relayURI)} className={`p-2 ${status === "connected" ? "bg-green-500" : "bg-blue-500"} text-white`}>
                    {status === "connected" ? "Connected" : "Connect"}
                </button>
            </div>
        </header>
    );
}
