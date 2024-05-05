export default function RightColumn({ messages }) {
    return (
        <section className="w-2/5 p-4 bg-gray-100">
            <h2 className="text-lg mb-2">Messages</h2>
            <div className="h-lvh overflow-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 ${
                            msg.type === "to" ? "border-black" : "border-blue-600"
                        } border-2`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
        </section>
    );
}
