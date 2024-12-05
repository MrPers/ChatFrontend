import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { Message } from "./Message";
import { useState, useEffect, useRef } from "react";

export const Chat = ({ messages, chatRoom, closeChat, sendMessage, userName }) => {
    const [message, setMessage] = useState(""); // Current message being typed
    const messagesEndRef = useRef(null); // Reference to the bottom of the messages list

    // Automatically scroll to the bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle message send
    const onSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(message);
            setMessage(""); // Clear input after sending
        }
    };

    // Handle "Enter" key press to send the message
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSendMessage();
        }
    };

    return (
        <div className="w-1/2 bg-white p-8 rounded shadow-lg">
            {/* Header with chat room name and close button */}
            <div className="flex flex-row justify-between mb-5">
                <Heading size="lg">{chatRoom}</Heading>
                <CloseButton onClick={closeChat} />
            </div>
            {/* Messages list */}
            <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
                {messages.map((messageInfo, index) => (
                    <Message
                        messageInfo={messageInfo}
                        key={index}
                        userName={userName}
                    />
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            {/* Input and send button */}
            <div className="flex gap-3">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your message"
                />
                <Button colorScheme="blue" onClick={onSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};
