import React, { useState } from 'react';
import { bech32 } from 'bech32';

const MessageEditor = ({ onSubmit }) => {
    const [privateKey, setPrivateKey] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        try {
            const decodedKey = bech32.decode(privateKey);
            const nsec = bech32.fromWords(decodedKey.words);
            onSubmit(Buffer.from(nsec).toString('hex'), message);
        } catch (error) {
            alert('Invalid nsec private key');
        }
    };

    return (
        <div className="w-2/5 p-4">
            <h2 className="text-lg mb-4">Message Editor</h2>
            <input
                type="text"
                className="form-input w-full mb-2"
                placeholder="nsec..."
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
            />
            <textarea
                className="form-textarea w-full mb-2"
                placeholder="Enter JSON message"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
                className="w-full bg-blue-600 text-white py-2"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default MessageEditor;
