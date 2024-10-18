export default function LeftColumn({history, reqHistory, loadQuery, deleteQuery, loadRequestQuery, deleteRequestQuery}) {
    console.log('history', history);
    return (
        <aside className="w-1/4 p-4 bg-gray-100">
            <div className="overflow-auto h-1/2">
                <h2 className="text-lg mb-2">Event History</h2>
                <ul>
                    {history.map((query, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <div
                                className="text-left p-2 bg-white rounded text-wrap break-words w-full overflow-hidden"
                                onClick={() => loadQuery(query)}
                            >
                                <pre className={"text-wrap text-sm break-words p-2 border-r-4"}>
                                    {query}
                                </pre>
                            </div>
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
                            <div
                                className="text-left p-2  rounded bg-white text-wrap break-words w-full overflow-hidden"
                                onClick={() => loadRequestQuery(query)}
                            >
                                <pre className={"text-wrap text-sm break-words p-2 border-r-4"}>
                                {query}
                                </pre>
                            </div>
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
