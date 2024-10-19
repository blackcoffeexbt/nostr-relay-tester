export default function LeftColumn({
                                       history,
                                       reqHistory,
                                       loadQuery,
                                       deleteQuery,
                                       loadRequestQuery,
                                       deleteRequestQuery
                                   }) {
    console.log('history', history);
    return (
        <aside className="w-full md:w-1/4 p-4 bg-gray-100 order-2 md:order-1">
            <h2 className="text-lg">Event History</h2>
            <p className={"text-sm mb-2"}>Click to load an event</p>
            <div className="overflow-auto md:h-1/2 border border-gray-300 p-2 border-r-4 rounded">

                <ul>
                    {history.map((query, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <div
                                className="text-left p-2 rounded bg-white text-wrap break-words w-full overflow-hidden cursor-pointer shadow-inner hover:shadow-purple-300"
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

            <h2 className="text-lg m-0">Request History</h2>
            <p className={"text-sm mb-2"}>Click to load a request</p>
            <div className="overflow-auto md:h-1/2 border border-gray-300 p-2 border-r-4 rounded mt-1">
                <ul>
                    {reqHistory.map((query, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <div
                                className="text-left p-2 rounded bg-white text-wrap break-words w-full overflow-hidden cursor-pointer shadow-inner hover:shadow-purple-300"
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
