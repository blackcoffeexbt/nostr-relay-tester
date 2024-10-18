import {nip19} from "nostr-tools";
import {Fragment} from "react";

export default function RightColumn({messages}) {

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
                        {msg.event &&
                            <Fragment>
                                Raw Event Data:
                                {JSON.stringify(msg.event.rawEvent())}
                            </Fragment>
                        }

                        Content: {msg.content}
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
