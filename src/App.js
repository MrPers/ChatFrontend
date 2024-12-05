import { WaitingRoom } from "./components/WaitingRoom";
import { Chat } from "./components/Chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";


function App() {
    const [connection, setConnection] = useState(null); 
    const [chatRoom, setChatRoom] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState("");

    let joinChatTimeout; // Timeout to prevent frequent join calls

    //join a chat
    const joinChat = async (userName, chatRoom) => {
        if (joinChatTimeout) {
            clearTimeout(joinChatTimeout);
        }

        // Set a timeout before initiating connection
        joinChatTimeout = setTimeout(async () => {
            // Create a new SignalR connection
            const connection = new HubConnectionBuilder()
                .withUrl("https://chatapp-fvg2hsgccmfsf5fs.ukwest-01.azurewebsites.net/chat")
                .withAutomaticReconnect()
                .build();

            // Event handler for receiving a message
            connection.on("ReceiveMessageWithSentiment", (userName, message, sentiment) => {
                setMessages(messages => [...messages, { userName, message, sentiment }]);
            });
            // Start the connection
            try {
                await connection.start();
                await connection.invoke("JoinChat", { userName, chatRoom });
                setConnection(connection);
                setChatRoom(chatRoom);
                setUserName(userName);
            } catch (e) {
                console.error("Error while joining chat:", e);
            }
        }, 1000);
    };

    // leave the chat
    const closeChat = async () => {
        await connection.stop();
        setConnection(null);
        setMessages([]);
    };

     // Send a message via SignalR
    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.error("Error while sending message:", e);
        }
    };

    // Rendering logic
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {connection ? (
                <Chat
                    messages={messages}
                    chatRoom={chatRoom}
                    closeChat={closeChat}
                    sendMessage={sendMessage}
                    userName={userName}
                />
            ) : (
                <WaitingRoom joinChat={joinChat} />
            )}
        </div>
    );
}

export default App;
