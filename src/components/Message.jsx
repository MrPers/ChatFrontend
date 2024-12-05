export const Message = ({ messageInfo, userName }) => {
    const isOwnMessage = messageInfo.userName === userName; // Check if the message is from the current user
    const sentiment = messageInfo.sentiment; // Sentiment of the message (Positive, Negative, Neutral)

    // Determine text color based on sentiment
    let sentimentColor;
    switch (sentiment) {
        case "Positive":
            sentimentColor = "text-green-500";
            break;
        case "Negative":
            sentimentColor = "text-red-500";
            break;
        case "Neutral":
            sentimentColor = "text-gray-500";
            break;
        default:
            sentimentColor = "text-black";
    }


    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                <span className="text-sm text-slate-600">{messageInfo.userName}</span>
                <div className={`p-2 rounded-lg shadow-md bg-gray-100 ${sentimentColor}`}>
                    {messageInfo.message}
                </div>
            </div>
        </div>
    );
};
