import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Welcome to GameSphere! Your ultimate gaming assistant. How can I help you today?", 
      options: ["Game recommendations", "Order status", "Technical support", "Deals & discounts"]
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const endOfChatRef = useRef(null);

  // Game database simulation
  const gameDatabase = {
    action: [
      { name: "CyberStrike 2077", price: 59.99, discount: 20 },
      { name: "Shadow of War", price: 39.99, discount: 30 },
      { name: "Doom Eternal", price: 29.99, discount: 0 }
    ],
    rpg: [
      { name: "Elder Scrolls VI", price: 59.99, discount: 10 },
      { name: "Witcher 4: Wild Hunt", price: 49.99, discount: 25 },
      { name: "Dragon Age: Origins", price: 19.99, discount: 50 }
    ],
    sports: [
      { name: "FIFA 24", price: 49.99, discount: 15 },
      { name: "NBA 2K24", price: 59.99, discount: 0 },
      { name: "Madden NFL 24", price: 39.99, discount: 20 }
    ]
  };

  const pairs = [
    [/hi|hello|hey/i, ["Greetings, gamer! Ready for some epic adventures?", "Hello there! What gaming quest brings you here today?"]],
    [/how are you/i, ["I'm running at 120 FPS and ready to assist!", "My servers are cool and I'm ready to help you with your gaming needs!"]],
    [/what is your name/i, ["I'm GameBot 9000, your virtual gaming assistant!", "You can call me GameBot - at your service!"]],
    [/help|support/i, ["I can help with game recommendations, tech support, order status, and more. What do you need?", "Sure thing! Tell me what you need help with: games, orders, or technical issues?"]],
    [/bye|goodbye|quit/i, ["Game over! Come back soon for more gaming goodness!", "Thanks for chatting! Happy gaming! 🎮"]],
    [/thank you|thanks/i, ["No problem! Always happy to help a fellow gamer.", "You're welcome! Now go enjoy those games!"]],
    [/recommend|suggest|what.*play/i, ["What genre are you interested in? Action, RPG, Sports, or Strategy?", "I've got great recommendations! Tell me your favorite genre."]],
    [/action/i, ["Check out these action games:", ...gameDatabase.action.map(g => `${g.name} - $${g.price}${g.discount ? ` (${g.discount}% off!)` : ''}`)]],
    [/rpg/i, ["Here are some epic RPGs:", ...gameDatabase.rpg.map(g => `${g.name} - $${g.price}${g.discount ? ` (${g.discount}% off!)` : ''}`)]],
    [/sports/i, ["Sports fan? Try these:", ...gameDatabase.sports.map(g => `${g.name} - $${g.price}${g.discount ? ` (${g.discount}% off!)` : ''}`)]],
    [/price|cost|how much/i, ["Prices vary by game. New releases are typically $59.99, with frequent sales!", "We have games from $9.99 to $69.99. Check out our current deals!"]],
    [/order|purchase|buy/i, ["You can purchase games directly through our website. Need help finding something specific?", "Ready to buy? Just select 'Add to Cart' on any game page!"]],
    [/shipping|delivery/i, ["All our games are digital downloads - instant delivery after purchase!", "No shipping needed! You'll get your game immediately after payment."]],
    [/payment|pay|credit card/i, ["We accept Visa, MasterCard, PayPal, and cryptocurrency.", "Secure payments via all major credit cards and digital wallets."]],
    [/track|where.*order/i, ["For digital orders, check your email for download links. Need your order number?", "All your purchases appear in 'My Games' section immediately after payment."]],
    [/return|refund/i, ["Digital game refunds are available within 14 days if you haven't played more than 2 hours.", "Contact support with your order number for refund requests."]],
    [/discount|sale|deal/i, ["We have weekly deals! Current promotions: 30% off RPGs, 20% off action games.", "Check our 'Deals' section for limited-time offers!"]],
    [/contact|support|help/i, ["Our support team is available 24/7 at support@gamesphere.com or call 1-800-GAME-HELP.", "Need human help? Live chat with our support team on the website!"]],
    [/system requirements|can my pc run/i, ["Check the 'System Requirements' tab on any game page. Or tell me the game and your specs!", "Most games list minimum and recommended specs. What game are you wondering about?"]],
    [/multiplayer|online play/i, ["Many of our games support online multiplayer! Look for the multiplayer tag.", "We have co-op and competitive games. What type of multiplayer are you looking for?"]],
    [/pre-order|coming soon/i, ["Check our 'Coming Soon' section for pre-order bonuses and release dates!", "Upcoming releases often have special pre-order discounts!"]],
    [/vr|virtual reality/i, ["We have an awesome VR collection! Try 'Skyrim VR' or 'Half-Life: Alyx'.", "VR gaming is amazing! We offer both standalone and PC VR titles."]],
    [/esports|competitive/i, ["We support esports! Check out 'Valorant', 'League of Legends', and 'CS:GO'.", "Competitive gaming is huge! We have all the major esports titles."]],
    [/controller|gamepad/i, ["Most modern games support controllers. Look for the controller icon on game pages!", "We sell premium controllers too! Check our accessories section."]],
    [/gift|present/i, ["Games make great gifts! You can purchase gift cards or send games directly to friends.", "We offer gift wrapping (for physical items) and personalized gift messages!"]],
  ];

  const getResponse = (input) => {
    for (const [pattern, responses] of pairs) {
      if (pattern.test(input)) {
        return {
          text: responses[Math.floor(Math.random() * responses.length)],
          options: []
        };
      }
    }
    return {
      text: "I'm a gaming expert but that question stumped me! Try asking about games, orders, or support.",
      options: ["Game recommendations", "Technical help", "Account issues"]
    };
  };

  const handleQuickReply = (reply) => {
    setUserInput(reply);
    handleSubmit({ preventDefault: () => {} });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: trimmedInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      setIsTyping(false);
      let updatedMessages = [...newMessages];

      if (trimmedInput.toLowerCase() === 'quit') {
        updatedMessages.push({ 
          sender: 'bot', 
          text: "Thanks for chatting! Press the button to restart our conversation anytime.", 
          options: ["Start new chat"] 
        });
      } else {
        const response = getResponse(trimmedInput);
        updatedMessages.push({ 
          sender: 'bot', 
          text: response.text,
          options: response.options
        });
      }

      setMessages(updatedMessages);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen) {
      // Reset conversation when opening
      setMessages([
        { 
          sender: 'bot', 
          text: "Welcome back to GameSphere! How can I help you today?", 
          options: ["Game recommendations", "Order status", "Technical support", "Deals & discounts"]
        }
      ]);
    }
  };

  return (
    <div className={`chatbot-wrapper ${chatOpen ? 'open' : ''}`}>
      {!chatOpen && (
        <button className="chatbot-toggle-button" onClick={toggleChat}>
          <span className="chatbot-toggle-icon">🎮</span>
          <span className="chatbot-toggle-text">Game Help</span>
        </button>
      )}

      {chatOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2 className="chatbot-title">
              <span className="chatbot-icon">🎮</span> GameSphere Assistant
            </h2>
            <button className="chatbot-close-button" onClick={toggleChat}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <div className="message-sender">
                    {msg.sender === 'user' ? 'You' : 'GameBot'}
                  </div>
                  <div className="message-text">{msg.text}</div>
                  {msg.options && msg.options.length > 0 && (
                    <div className="quick-replies">
                      {msg.options.map((option, i) => (
                        <button 
                          key={i} 
                          className="quick-reply-button"
                          onClick={() => handleQuickReply(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot-message">
                <div className="message-content">
                  <div className="message-sender">GameBot</div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfChatRef} />
          </div>

          <form onSubmit={handleSubmit} className="chatbot-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about games, orders, or support..."
              className="chatbot-input"
              autoFocus
            />
            <button type="submit" className="chatbot-send-button">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;