import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Calculator, Send } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the DishDash assistant. I can help you calculate discounts or answer questions.", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
        setInput("");

        // Basic Bot Logic
        setTimeout(() => {
            let botReply = getBotResponse(userMsg);
            setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
        }, 600);
    };

    const getBotResponse = (msg) => {
        const lowerMsg = msg.toLowerCase();

        // Greeting
        if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
            return "Hello there! Try asking me to 'calculate 20% off 500' or ask how the site works.";
        }

        // FAQ
        if (lowerMsg.includes("how it works") || lowerMsg.includes("about")) {
            return "DishDash compares food prices across Swiggy, Zomato, Magicpin, and EatSure so you get the lowest price including delivery!";
        }

        // Calculator Logic: e.g., "10% off 250" or "calculate 15 percent of 400"
        const calcRegex = /(\d+(?:\.\d+)?)\s*(?:%|percent)\s*(?:off|of|discount on)?\s*(?:rs|inr|₹)?\s*(\d+(?:\.\d+)?)/i;
        const match = lowerMsg.match(calcRegex);

        if (match) {
            const percentage = parseFloat(match[1]);
            const price = parseFloat(match[2]);
            const discountAmount = (percentage / 100) * price;
            const finalPrice = price - discountAmount;

            return `A ${percentage}% discount on ₹${price} saves you ₹${discountAmount.toFixed(2)}. Your final price is ₹${finalPrice.toFixed(2)}! 🤑`;
        }

        return "I didn't quite catch that. Try asking me a basic calculator question like '15% off 300'!";
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen ? (
                <button className="chatbot-toggle shadow-lg" onClick={() => setIsOpen(true)}>
                    <MessageCircle size={28} color="white" />
                </button>
            ) : (
                <div className="chatbot-window glass-card shadow-lg">
                    <div className="chatbot-header">
                        <div className="header-info">
                            <Calculator size={20} />
                            <span>DishDash Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="close-btn">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-bubble ${msg.sender}`}>
                                <div className="bubble-content">{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="e.g. 20% off 450..."
                        />
                        <button onClick={handleSend} className="send-btn">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
