import React from 'react';

const History = ({ history, onSelect, onDelete }) => {
    return (
        <div className="w-1/5 p-4 bg-gray-100">
            <h2 className="text-lg mb-4">History</h2>
            <ul className="space-y-2">
                {history.map((query, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <span
                            className="cursor-pointer"
                            onClick={() => onSelect(query)}
                        >
                            {query}
                        </span>
                        <button
                            className="ml-2 text-red-500"
                            onClick={() => onDelete(index)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
