import React, {useState, useEffect, useRef, Fragment} from 'react';
import NDK, {NDKFilter, NDKPrivateKeySigner, NDKEvent, NDKDVMJobResult, NDKNip07Signer} from "@nostr-dev-kit/ndk";
import Header from './components/Header';
import LeftColumn from './components/LeftColumn';
import CenterColumn from './components/CenterColumn';
import RightColumn from './components/RightColumn';

export default function App() {
    const [status, setStatus] = useState("disconnected");
    const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);
    const [reqHistory, setReqHistory] = useState(JSON.parse(localStorage.getItem("reqHistory")) || []);
    const [messages, setMessages] = useState([]);
    const [req, setReq] = useState([]);
    const [ndk, setNdk] = useState(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentRequest, setCurrentRequest] = useState("");
    const ndkRef = useRef(null);

    const connectRelay = async (relayURI) => {
        setStatus("connecting");
        try {
            const privateKey = localStorage.getItem('localSignerPrivateKey');

            const nip07signer = await new NDKNip07Signer();
            const ndkInstance = new NDK({
                signer: nip07signer,
                explicitRelayUrls: [relayURI],
            });
            // const ndkInstance = new NDK({
            //   explicitRelayUrls: ["wss://a.relay", "wss://another.relay"],
            // });
            setMessages(prevMessages => [{type: "from", content: "Connected to relay"}, ...prevMessages]);
            await ndkInstance.connect();
            setStatus("connected");
            ndkInstance.on("message", (message) => {
                setMessages(prevMessages => [{type: "from", content: message}, ...prevMessages]);
            });
            setNdk(ndkInstance);
            ndkRef.current = ndkInstance;
        } catch (error) {
            setStatus("disconnected");
            console.error("Connection error:", error);
        }
    };

    const sendMessage = (message) => {
        try {
            const json = JSON.parse(message);
            json.created_at = Math.floor(Date.now() / 1000);
            const updatedMessage = JSON.stringify(json);

            let jsonWithoutCreatedAt = JSON.parse(updatedMessage);
            delete jsonWithoutCreatedAt.created_at;
            const messageWithoutCreatedAt = JSON.stringify(jsonWithoutCreatedAt);

            if (!history.includes(messageWithoutCreatedAt)) {
                const newHistory = [messageWithoutCreatedAt, ...history];
                setHistory(newHistory);
                localStorage.setItem("history", JSON.stringify(newHistory));
            }

            const ndkEvent = new NDKEvent(ndk);
            ndkEvent.kind = json.kind;
            ndkEvent.content = json.content;
            ndkEvent.tags = json.tags || [];

            ndkEvent.publish().then(() => {
                // Only include relevant properties
                const {id, kind, pubkey, created_at, tags, content, sig} = ndkEvent;
                console.log("Event published", ndkEvent);
                // setMessages(prevMessages => [{
                //     type: "from",
                //     content: JSON.stringify({id, kind, pubkey, created_at, tags, content, sig}),
                //     pubkey: pubkey,
                // }, ...prevMessages]);
            });
        } catch (error) {
            alert("Invalid JSON");
            console.error("Message error:", error);
        }
    };

    const sendReq = async (message) => {
        try {
            const json = JSON.parse(message);
            const updatedMessage = JSON.stringify(json);

            delete json.created_at;
            message = JSON.stringify(json);


            if (!reqHistory.includes(message)) {
                const newHistory = [updatedMessage, ...reqHistory];
                setReqHistory(newHistory);
                localStorage.setItem("reqHistory", JSON.stringify(newHistory));
            }

            await setTimeout(async () => {
                const b = await ndk.subscribe(
                    json,
                    {closeOnEose: false}
                );

                b.on("event", async (event) => {
                    const user = ndk.getUser({hexpubkey: event.pubkey})
                    const userProfile = await user.fetchProfile();
                    console.log('userprofile', userProfile)
                    // append event.content to the messages
                    setMessages(prevMessages => [{
                        type: "from",
                        event: event,
                        content: event.content,
                        pubkey: event.pubkey,
                        sender: userProfile
                    }, ...prevMessages]);
                    console.log(`received event on b`, event.id, event.content)
                });
            }, 500);


        } catch (error) {
            alert("Invalid JSON");
            console.error("Message error:", error);
        }
    };

    const loadQuery = (query) => {
        setCurrentMessage(query);
    };

    const loadRequestQuery = (query) => {
        setCurrentRequest(query);
    };

    const deleteQuery = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem("history", JSON.stringify(newHistory));
    };

    const deleteRequestQuery = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem("reqHistory", JSON.stringify(newHistory));
    };

    useEffect(() => {
        if (!history.length) {
            // add an example DVM event
            let query2 = `{"content":"","kind":5107,"tags":[["i","[{\\"method\\": \\"getTemperature\\",\\"params\\": [\\"unit\\", \\"celcius\\"]}]","text","wss://relay.nostriot.com"],["output","text/plain"],["p","22b9d2fa2910974d02138af239a341a09ec60560338eb0f8814ec5729ae25c64"]]}`
            let query1 = "{\"kind\":1,\"content\":\"hi mum\"}";
            setHistory([query1, query2]);
            localStorage.setItem("history", JSON.stringify([query1, query2]));
        }
    }, [history]);

    useEffect(() => {
        if (!reqHistory.length) {
            let query1 = `{"kinds":[31990,5107,6107,36107],"limit":1}`
            let query2 = `{"kinds":[1],"limit":1}`

            setReqHistory([query1, query2]);
            localStorage.setItem("reqHistory", JSON.stringify([query1, query2]));
        }
    }, [reqHistory]);

    return (
        <div className="flex flex-col h-screen">
            <Header connectRelay={connectRelay} status={status}/>
            <div className="flex flex-1">
                {status === "connected" &&
                    <Fragment>
                        <LeftColumn history={history}
                                    reqHistory={reqHistory}
                                    loadQuery={loadQuery}
                                    deleteQuery={deleteQuery}
                                    loadRequestQuery={loadRequestQuery} deleteRequestQuery={deleteRequestQuery}/>
                        <CenterColumn message={currentMessage} setMessage={setCurrentMessage}
                                      req={currentRequest}
                                      setReq={setCurrentRequest}
                                      sendMessage={sendMessage}
                                      sendReq={sendReq}
                        />
                        <RightColumn messages={messages}/>
                    </Fragment>
                }
                { status === "disconnected" &&
                    <div className="flex-1 flex justify-center mt-4">
                        <div className={"text-center"}>
                            <p className="text-2xl">Connect to a relay to get started.</p>
                            <p>Use a Nostr browser extension or the "Nostr Login" popup to log in.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
