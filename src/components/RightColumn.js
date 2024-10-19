import {nip19} from "nostr-tools";
import {Fragment} from "react";

export default function RightColumn({messages}) {
    // define an anon function that formats message content replacing images in the string with img tags
    // make sure the URL ends with an image extension
    const formatMessageContent = (content) => {
        return content.replace(/(https?:\/\/[^\s]+(?=\.(jpg|jpeg|png|gif))\.\2)/g, '<img src="$1" alt="image" />');
    };

    return (
        <section className="w-full md:w-1/4  p-4 bg-gray-100 md:order-3">
            <h2 className="text-lg mb-2">Messages and Events</h2>
            <div className="overflow-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 ${
                            msg.type === "to" ? "border-black" : "border-gray-300"
                        } border border-r-4 rounded`}
                    >
                        <p><strong>Content</strong></p>
                        <div dangerouslySetInnerHTML={{__html: formatMessageContent(msg.content)}} className={"text-wrap rounded text-sm break-words bg-white p-2 border-r-4"}>
                        </div>
                        {msg.event &&
                            <Fragment>
                                <p><strong>Raw Event Data</strong></p>
                                <pre className={"max-h-40 overflow-auto text-wrap rounded text-xs break-words bg-white p-2 border-r-4"}>
                                {JSON.stringify(msg.event.rawEvent(), null, 2)}
                                </pre>
                            </Fragment>
                        }

                        {msg.sender &&
                            <a className="flex mt-4" target="_blank"
                               href={`https://njump.me/${msg.pubkey ? nip19.npubEncode(msg.pubkey) : ''}`}>

                                <div className="font-bold text-black-500">{msg.sender.name}</div>
                                <img src={msg.sender.image} alt={msg.sender.name} className="w-16 h-16 rounded-full"/>
                            </a>
                        }
                    </div>
                ))}
            </div>
        </section>
    );
}
