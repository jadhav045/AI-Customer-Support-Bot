# 🤖 AI Customer Support Bot

A smart, LLM-powered customer support system designed to answer FAQs, maintain conversation context, escalate unresolved queries, and provide a simple chat interface. This project was created for the Placement Drive Assignment.

## 🚀 Features

- **AI-Powered Responses**: Utilizes Groq LLM (openai/gpt-oss-120b) for intelligent, contextual replies when FAQs are insufficient.
- **FAQ Matching (Semantic Search)**: Retrieves the best matching FAQ from MongoDB, falling back to AI when similarity is low using embedding-based similarity and word-overlap fallback.
- **Contextual Memory**: Stores user messages, bot messages, and optional summaries, allowing the bot to remember past messages during the session.
- **Escalation System**: Automatically escalates queries that the bot cannot answer after repeated attempts or when FAQ similarity is too low, storing them in the DB for review.
- **Clean REST API**: Well-structured backend with controllers, services, models, validators, error handling, and logging.
- **Simple React Chat UI**: A clean chat interface built with React and Axios.

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Groq SDK (LLM)
- Zod Validation
- Dotenv
- CORS

### Frontend
- React
- Axios
- UUID

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   └── app.js
├── seed/
│   └── insertFaqs.js
└── package.json

client/
├── src/
│   ├── components/
│   ├── api/
│   └── App.jsx
└── package.json
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Add environment variables**
   Create `.env` inside the backend:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-customer-support-bot
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=openai/gpt-oss-120b
   GROQ_EMBEDDING_MODEL=llama-embed-english-v1
   FAQ_MATCH_THRESHOLD=0.6
   FAQ_ESCALATION_THRESHOLD=0.2
   ```

4. **Seed FAQs into MongoDB**
   ```bash
   node seed/insertFaqs.js
   ```

5. **Run backend**
   ```bash
   npm run dev
   ```

6. **Run frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 📡 API Endpoints

### POST /api/query

Send a user message.

**Request:**
```json
{
  "sessionId": "abc123",
  "query": "How do I reset my password?"
}
```

**Response:**
```json
{
  "success": true,
  "botResponse": "Go to Account Settings → Security → Reset Password...",
  "matchScore": 0.92,
  "usedFAQ": true,
  "escalated": false
}
```

## 🖼️ Screenshots

![Chat UI](./assets/image.png)

### Demo Video

The demo video file referenced previously (./assets/demo.mp4) is not present in this branch and will return a 404 on GitHub if missing.

You can also host the demo externally. Example (Google Drive public/shareable link):

- Watch demo (Google Drive): https://drive.google.com/file/d/11I6A-HxVRRu-gg2y8MSAuBIXwI1HkP1Y/view?usp=sharing

Note: Ensure the Google Drive file is set to "Anyone with the link can view" so collaborators can open it. Other options:
- Add demo.mp4 to this repository (small files)
- Upload to YouTube/Vimeo (recommended for large files)
- Convert to GIF for inline preview

## 📌 Author

Developed as part of the Placement Drive Assignment, including an AI-powered customer support pipeline with modern backend and frontend technologies.
