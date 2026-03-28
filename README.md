# 🧠 AI Quiz Generator

An AI-powered quiz generation app that creates 20 multiple-choice questions on any topic instantly using Groq's free LLaMA API.

---

## ✨ Features

- 🎯 Enter any topic → Get 20 MCQ questions instantly
- ✅ Instant answer reveal with explanations
- 📊 Live progress bar and score tracking
- 🏆 Final score with grade at the end
- 🌙 Beautiful dark UI
- ⚡ Powered by Groq (LLaMA 3.3 70B) — Free API

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **AI API:** Groq (LLaMA 3.3 70B)
- **Deployment:** Vercel
- **Styling:** Pure CSS (no external UI library)

---

## 📁 Project Structure

```
ai-quiz-app/
├── api/
│   └── quiz.js          # Vercel serverless function (API key secure)
├── src/
│   ├── App.jsx          # Main React component
│   └── main.jsx         # React entry point
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .env                 # API key (never push this to GitHub)
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gauresh83/ai-quiz-generator.git
cd ai-quiz-generator/ai-quiz-app/ai-quiz-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your free Groq API Key

- Go to [console.groq.com](https://console.groq.com)
- Sign up for free (no credit card needed)
- Go to **API Keys** → **Create API Key**
- Copy the key

### 4. Create `.env` file

```bash
ANTHROPIC_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
```

> Note: Variable name is `ANTHROPIC_API_KEY` but it holds your Groq key

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deploy on Vercel

### 1. Push code to GitHub

### 2. Go to [vercel.com](https://vercel.com)
- Click **Add New Project**
- Import your GitHub repo
- Set **Root Directory** to: `ai-quiz-app/ai-quiz-app`

### 3. Set Environment Variable in Vercel
```
Name:  ANTHROPIC_API_KEY
Value: gsk_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Click **Deploy** 🎉

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Groq API Key from console.groq.com |

---

## ⚠️ Important Notes

- Never push your `.env` file to GitHub
- `.gitignore` already has `.env` listed
- API key is kept secure on server side via Vercel serverless function
- Groq API is **free** — no credit card required

---

## 📸 Preview

> Enter any topic like "World War II", "Python Programming", "Human Anatomy" and get 20 questions instantly!

---

## 🙏 Credits

- [Groq](https://groq.com) — Free LLaMA API
- [Vite](https://vitejs.dev) — Frontend build tool
- [Vercel](https://vercel.com) — Deployment platform

---

## 📄 License

MIT License — feel free to use and modify!
