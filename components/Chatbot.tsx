"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to the Porsche 918 Spyder experience. Ask me anything about its engineering, hybrid technology, performance, or history.",
    },
  ]);

  async function sendMessage() {
    const userQuestion = question.trim();
    const API_URL = process.env.NEXT_API_URL;

    if (!userQuestion || isThinking) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: userQuestion },
    ]);

    setQuestion("");
    setIsThinking(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting to the Porsche AI system. Please check that the backend is running and try again.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <>
      <style jsx>{`
        .porsche-ai-panel {
          position: fixed;
          top: 95px;
          right: 30px;
          z-index: 9999;
          width: 390px;
          height: 570px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #edf7ff;
          background: rgba(3, 12, 23, 0.96);
          border: 1px solid rgba(37, 190, 255, 0.35);
          border-radius: 16px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(22px);
          font-family: Arial, sans-serif;
        }

        .porsche-ai-header {
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(100, 170, 210, 0.18);
          background: rgba(8, 28, 45, 0.85);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .brand-icon {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          color: #24c7ff;
          background: #0b2940;
          border: 1px solid #17618a;
          border-radius: 9px;
          font-size: 21px;
        }

        .brand-name {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .brand-subtitle {
          margin-top: 5px;
          color: #27c7ff;
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .header-actions {
          display: flex;
          gap: 13px;
        }

        .header-actions button {
          color: #9cb5c8;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 19px;
        }

        .chat-messages {
          flex: 1;
          padding: 18px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .system-status {
          color: #27d7a5;
          font-size: 9px;
          letter-spacing: 2px;
          margin-bottom: 2px;
        }

        .message {
          max-width: 88%;
          padding: 12px 14px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .assistant-message {
          align-self: flex-start;
          background: #102a40;
          border: 1px solid rgba(37, 190, 255, 0.14);
          color: #d9eaf5;
        }

        .user-message {
          align-self: flex-end;
          background: #07527b;
          color: white;
        }

        .thinking {
          align-self: flex-start;
          padding: 13px 16px;
          background: #102a40;
          border-radius: 12px;
          display: flex;
          gap: 5px;
        }

        .thinking span {
          width: 6px;
          height: 6px;
          background: #27c7ff;
          border-radius: 50%;
          animation: pulse 1s infinite ease-in-out;
        }

        .thinking span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .thinking span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes pulse {
          0%,
          80%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-5px);
          }
        }

        .chat-input-area {
          padding: 15px;
          border-top: 1px solid rgba(100, 170, 210, 0.18);
          background: rgba(5, 18, 31, 0.95);
        }

        .input-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 8px 7px 13px;
          background: #0b1c2b;
          border: 1px solid #1c435e;
          border-radius: 10px;
        }

        .input-row input {
          flex: 1;
          min-width: 0;
          color: white;
          background: transparent;
          border: none;
          outline: none;
          font-size: 12px;
        }

        .input-row input::placeholder {
          color: #71899c;
        }

        .send-button {
          width: 35px;
          height: 35px;
          color: #001421;
          background: #25c7ff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 17px;
        }

        .send-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .footer-text {
          margin-top: 11px;
          text-align: center;
          color: #607b90;
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .porsche-ai-launcher {
          position: fixed;
          top: 95px;
          right: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 19px;
          color: white;
          background: rgba(4, 18, 32, 0.94);
          border: 1px solid rgba(37, 190, 255, 0.55);
          border-radius: 30px;
          cursor: pointer;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 1.5px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .launcher-icon {
          color: #25c7ff;
          font-size: 19px;
        }

        @media (max-width: 480px) {
          .porsche-ai-panel {
            top: 75px;
            right: 10px;
            left: 10px;
            width: auto;
            height: min(570px, calc(100vh - 95px));
          }

          .porsche-ai-launcher {
            top: 85px;
            right: 12px;
          }
        }
      `}</style>

      {isOpen ? (
        <div className="porsche-ai-panel">
          <div className="porsche-ai-header">
            <div className="brand">
              <div className="brand-icon">✦</div>
              <div>
                <div className="brand-name">PORSCHE AI</div>
                <div className="brand-subtitle">918 SPYDER INTELLIGENCE</div>
              </div>
            </div>

            <div className="header-actions">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(true);
                }}
                aria-label="Minimize chatbot"
              >
                −
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          <div className="chat-messages">
            <div className="system-status">● SYSTEM ONLINE</div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                {message.content}
              </div>
            ))}

            {isThinking && (
              <div className="thinking">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <form
              className="input-row"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about the 918 Spyder..."
              />

              <button
                className="send-button"
                type="submit"
                disabled={!question.trim() || isThinking}
              >
                ↑
              </button>
            </form>

            <div className="footer-text">POWERED BY PORSCHE KNOWLEDGE AI</div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="porsche-ai-launcher"
          aria-label="Open Porsche AI assistant"
        >
          <span className="launcher-icon">✦</span>
          <span>ASK PORSCHE AI</span>
        </button>
      )}
    </>
  );
}
