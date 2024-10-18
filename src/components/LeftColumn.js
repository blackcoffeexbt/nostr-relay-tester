export default function LeftColumn({history, reqHistory, loadQuery, deleteQuery, loadRequestQuery, deleteRequestQuery}) {
    console.log('history', history);
    return (
        <aside className="w-1/5 p-4 bg-gray-100">
            <div className="overflow-auto h-1/2">
                <h2 className="text-lg mb-2">Event History</h2>
                <ul>
                    {history.map((query, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <button
                                className="text-left p-2 bg-gray-200 text-wrap max-w-80 overflow-hidden"
                                onClick={() => loadQuery(query)}
                            >
                                {query}
                            </button>
                            <button
                                className="ml-2 p-2 bg-red-500 text-white"
                                onClick={() => deleteQuery(index)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className=" overflow-auto h-1/2">
                <h2 className="text-lg mb-2 mt-4">Request History</h2>
                <ul>
                    {reqHistory.map((query, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <button
                                className="flex-1 text-left p-2 bg-gray-200"
                                onClick={() => loadRequestQuery(query)}
                            >
                                {query}
                            </button>
                            <button
                                className="ml-2 p-2 bg-red-500 text-white"
                                onClick={() => deleteRequestQuery(index)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
