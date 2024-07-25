import "./styles.css";
import { useNavigate } from 'react-router-dom';
import ellipse from "../../assets/image.png";
import additionalImage from "../../assets/chat.png";

export default function ChatHome() {
    const navigate = useNavigate();

    const handleChatButtonClick = () => {
        navigate('/chat'); 
    };
    return (
        <div className='container'>
           
            <div className="content">
                <img src={additionalImage} alt="Chat" className="chat-image" />
                <div className="text-content">
                    <h1 className="heading">Connect with others</h1>
                    <p className="description">
                        Join our vibrant community of food lovers and start chatting with other users who share your passion for cooking. 
                        Exchange recipes, cooking tips, and culinary experiences in real-time. Dive into engaging conversations, swap 
                        delicious recipes, and enhance your culinary skills together. Don’t miss out—start sharing and chatting today!
                    </p>
                    <button className="chat-button" onClick={handleChatButtonClick}>Start Chatting Now </button>
                </div>
                <img src={ellipse} alt="Ellipse" className="ellipse" />
            </div>
        </div>
    );
}
