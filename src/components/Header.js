import React, { useState } from 'react';

export default function Header({ connectRelay, status }) {
    const [relayURI, setRelayURI] = useState("wss://relay.damus.io");

    return (
        <header className="p-4 bg-gray-800 text-white">
            <h1 className="text-xl">Nostr Relay Tester</h1>
            <div className="flex items-center">
                <input
                    type="text"
                    value={relayURI}
                    onChange={(e) => setRelayURI(e.target.value)}
                    placeholder="wss://relay.damus.io"
                    className="flex-1 p-2 mr-2 text-black"
                />
                <button onClick={() => connectRelay(relayURI)} className="p-2 bg-blue-600">
                    Connect
                </button>
                <span className="ml-4">{status}</span>
            </div>
        </header>
    );
}
