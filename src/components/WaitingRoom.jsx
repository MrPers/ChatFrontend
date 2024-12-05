import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";


export const WaitingRoom = ({ joinChat }) => {
    const [username, setUsername] = useState("");
    const [chatRoom, setChatRoom] = useState("");

    // Call joinChat with user inputs
    const onSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && chatRoom.trim()) {
            joinChat(username, chatRoom);
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
            <Heading>Online Chat</Heading>
            
            <div className="mb-4">
                <Text fontSize="sm">Username</Text>
                <Input
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    placeholder="Enter your name"
                    value={username}
                />
            </div>

            <div className="mb-4">
                <Text fontSize="sm">Chat name</Text>
                <Input
                    onChange={(e) => setChatRoom(e.target.value)}
                    name="chatRoom"
                    placeholder="Enter name of the chat"
                    value={chatRoom}
                />
            </div>

            <Button type="submit" colorScheme="blue">
                Join
            </Button>
        </form>
    );
};
