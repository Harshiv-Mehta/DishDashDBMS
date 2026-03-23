import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, MapPin, Send, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Chatbot.css';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the DishDash Genie 🧞‍♂️. I can help calculate discounts, provide rich food info, or find restaurant locations!", sender: "bot", type: "text" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: "user", type: "text" }]);
        setInput("");
        setIsTyping(true);

        // Simulate intelligent bot thinking delay
        setTimeout(() => {
            let botReplies = getBotResponse(userMsg);
            setMessages(prev => [...prev, ...botReplies]);
            setIsTyping(false);
        }, 1200);
    };

    const getBotResponse = (msg) => {
        const lowerMsg = msg.toLowerCase();
        let replies = [];

        // Calculator Logic
        const calcRegex = /(\d+(?:\.\d+)?)\s*(?:%|percent)\s*(?:off|of|discount on)?\s*(?:rs|inr|₹)?\s*(\d+(?:\.\d+)?)/i;
        const match = lowerMsg.match(calcRegex);
        if (match) {
            const percentage = parseFloat(match[1]);
            const price = parseFloat(match[2]);
            const discountAmount = (percentage / 100) * price;
            const finalPrice = price - discountAmount;
            return [{ text: `A ${percentage}% discount on ₹${price} saves you ₹${discountAmount.toFixed(2)}. Your final price is ₹${finalPrice.toFixed(2)}! 🤑`, sender: "bot", type: "text" }];
        }

        // Location / Map Logic
        if (lowerMsg.includes("where") || lowerMsg.includes("location") || lowerMsg.includes("map") || lowerMsg.includes("find")) {
            let loc = [18.5204, 73.8567]; // Default Pune
            let name = "Top Rated Restaurant in Pune";
            
            if (lowerMsg.includes("biryani")) {
                loc = [18.5158, 73.8415];
                name = "SP's Biryani House";
                replies.push({ text: "Here is the top-rated place for authentic Biryani in your city:", sender: "bot", type: "text" });
            } else if (lowerMsg.includes("burger")) {
                loc = [18.5362, 73.8739];
                name = "Burger King HQ / Local Outlet";
                replies.push({ text: "I found this highly-rated burger spot nearby:", sender: "bot", type: "text" });
            } else {
                replies.push({ text: "Here is a highly recommended restaurant for your craving:", sender: "bot", type: "text" });
            }
            
            replies.push({
                text: "",
                sender: "bot",
                type: "map",
                location: loc,
                poiName: name
            });
            return replies;
        }

        // Info / History Logic
        if (lowerMsg.includes("info") || lowerMsg.includes("about") || lowerMsg.includes("what is")) {
            if (lowerMsg.includes("biryani")) {
                return [{ text: "🍲 **Biryani** is an incredibly flavorful mixed rice dish originating among the Muslims of the Indian subcontinent. It is made with Indian spices, rice, and usually some type of meat (chicken, beef, goat, lamb, prawn, or fish), or in some cases without any meat, and sometimes, in addition, eggs and potatoes.", sender: "bot", type: "text" }];
            } else if (lowerMsg.includes("gulab")) {
                return [{ text: "🍨 **Gulab Jamun** is a sweet confectionery or dessert, originating in the Indian subcontinent and a type of mithai popular in India, Pakistan, Nepal, the Maldives (where it is known as gulab ki jaman), and Bangladesh. It is made mainly from milk solids, traditionally from khoya.", sender: "bot", type: "text" }];
            } else if (lowerMsg.includes("dishdash")) {
                return [{ text: "DishDash is the ultimate food price comparison tool! We scan Swiggy, Zomato, EatSure, and more to ensure you permanently save up to 30% on every meal. We also now feature beautiful AI-powered dish imagery and an interactive Leaflet map assistant!", sender: "bot", type: "text" }];
            }
            return [{ text: "I can fetch information on specific dishes like Biryani, Gulab Jamun, or Burgers! Just ask 'Info about Biryani'.", sender: "bot", type: "text" }];
        }

        // Default
        return [{ text: "I'm the DishDash Genie! Ask me to 'find Biryani on the map', 'info about Gulab Jamun', or 'calculate 20% off 500'. How can I help?", sender: "bot", type: "text" }];
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
                            <span className="genie-icon">🧞‍♂️</span>
                            <div className="bot-titles">
                                <h3>DishDash Genie</h3>
                                <span>Online</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="close-btn">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-wrapper ${msg.sender}`}>
                                {msg.sender === 'bot' && <div className="bot-avatar">🧞‍♂️</div>}
                                <div className={`message-bubble ${msg.sender} ${msg.type === 'map' ? 'map-bubble' : ''}`}>
                                    {msg.type === "text" ? (
                                        <div className="bubble-content">{msg.text}</div>
                                    ) : (
                                        <div className="map-container-wrapper">
                                            <div className="map-title"><MapPin size={14}/> {msg.poiName}</div>
                                            <MapContainer center={msg.location} zoom={14} style={{ height: '200px', width: '100%', borderRadius: '8px' }}>
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={msg.location}>
                                                    <Popup>{msg.poiName}</Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-wrapper bot">
                                <div className="bot-avatar">🧞‍♂️</div>
                                <div className="message-bubble bot typing">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
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
