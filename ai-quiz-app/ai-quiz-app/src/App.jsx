import { useState, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d12; }

  .app {
    min-height: 100vh;
    background: #0d0d12;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .header {
    width: 100%; max-width: 780px; padding: 4rem 2rem 0;
    position: relative; z-index: 1;
    text-align: center;
  }

  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.06); border: 0.5px solid rgba(255,255,255,0.12);
    border-radius: 20px; padding: 4px 14px; font-size: 11px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #a89f93; margin-bottom: 1.5rem;
  }

  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #c5a87a; }

  h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.4rem, 6vw, 3.8rem);
    font-weight: 400; line-height: 1.1;
    color: #f0ead8; margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  h1 em { font-style: italic; color: #c5a87a; }

  .subtitle {
    font-size: 15px; color: #7a7068; font-weight: 300; margin-bottom: 3rem;
    line-height: 1.6;
  }

  .input-area {
    width: 100%; max-width: 780px; padding: 0 2rem;
    position: relative; z-index: 1;
  }

  .input-row {
    display: flex; gap: 10px;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(255,255,255,0.1);
    border-radius: 14px; padding: 8px 8px 8px 20px;
    transition: border-color 0.2s;
  }

  .input-row:focus-within { border-color: rgba(197,168,122,0.5); }

  .topic-input {
    flex: 1; background: transparent; border: none; outline: none;
    font-family: 'DM Sans', sans-serif; font-size: 16px;
    color: #e8e4dc; caret-color: #c5a87a;
  }

  .topic-input::placeholder { color: #4a4540; }

  .gen-btn {
    background: #c5a87a; color: #0d0d12; border: none; border-radius: 10px;
    padding: 10px 22px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer;
    transition: background 0.2s, transform 0.1s; white-space: nowrap;
    display: flex; align-items: center; gap: 8px;
  }

  .gen-btn:hover:not(:disabled) { background: #d4b888; }
  .gen-btn:active:not(:disabled) { transform: scale(0.98); }
  .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .quick-topics {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;
  }

  .chip {
    background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 5px 14px; font-size: 12px;
    color: #7a7068; cursor: pointer; transition: all 0.15s;
  }

  .chip:hover { background: rgba(197,168,122,0.1); border-color: rgba(197,168,122,0.3); color: #c5a87a; }

  .loading-screen {
    width: 100%; max-width: 780px; padding: 0 2rem;
    display: flex; flex-direction: column; align-items: center;
    margin-top: 5rem; position: relative; z-index: 1;
  }

  .spinner-wrap { position: relative; width: 64px; height: 64px; margin-bottom: 1.5rem; }
  .spinner-ring {
    position: absolute; inset: 0; border-radius: 50%;
    border: 1.5px solid transparent; animation: spin 1.4s linear infinite;
  }
  .spinner-ring.outer { border-top-color: #c5a87a; }
  .spinner-ring.inner { border-right-color: rgba(197,168,122,0.3); animation-duration: 0.9s; animation-direction: reverse; inset: 10px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #f0ead8; margin-bottom: 0.5rem; }
  .loading-sub { font-size: 13px; color: #4a4540; }

  .quiz-area {
    width: 100%; max-width: 780px; padding: 2rem 2rem 4rem;
    position: relative; z-index: 1;
  }

  .quiz-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 2.5rem; padding-bottom: 1.5rem;
    border-bottom: 0.5px solid rgba(255,255,255,0.08);
  }

  .quiz-title { font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #f0ead8; }
  .quiz-meta { font-size: 12px; color: #4a4540; margin-top: 4px; letter-spacing: 0.05em; text-transform: uppercase; }

  .reset-btn {
    background: transparent; border: 0.5px solid rgba(255,255,255,0.12);
    border-radius: 8px; padding: 7px 14px; color: #7a7068;
    font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
    transition: all 0.15s; white-space: nowrap; align-self: flex-start;
  }
  .reset-btn:hover { border-color: rgba(197,168,122,0.4); color: #c5a87a; }

  .progress-bar-wrap { margin-bottom: 2rem; }
  .progress-label {
    display: flex; justify-content: space-between;
    font-size: 12px; color: #4a4540; margin-bottom: 8px;
  }
  .progress-track {
    height: 2px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: linear-gradient(90deg, #c5a87a, #d4b888);
    border-radius: 2px; transition: width 0.4s ease;
  }

  .question-card {
    background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 1.75rem; margin-bottom: 1rem;
    transition: border-color 0.2s;
  }

  .question-card.active { border-color: rgba(197,168,122,0.25); }
  .question-card.answered-correct { border-color: rgba(80,200,120,0.3); background: rgba(80,200,120,0.04); }
  .question-card.answered-wrong { border-color: rgba(220,80,80,0.3); background: rgba(220,80,80,0.04); }

  .q-num { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #4a4540; margin-bottom: 0.75rem; }
  .q-text { font-size: 16px; color: #e8e4dc; line-height: 1.5; margin-bottom: 1.25rem; font-weight: 400; }

  .options { display: flex; flex-direction: column; gap: 8px; }

  .option-btn {
    background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 11px 16px; text-align: left;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #a89f93;
    cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 10px;
  }

  .option-btn:hover:not(:disabled) {
    background: rgba(197,168,122,0.08); border-color: rgba(197,168,122,0.3); color: #e8e4dc;
  }

  .option-btn.selected {
    background: rgba(197,168,122,0.12); border-color: rgba(197,168,122,0.5); color: #e8e4dc;
  }

  .option-btn.correct {
    background: rgba(80,200,120,0.1); border-color: rgba(80,200,120,0.5); color: #a0e8b8;
  }

  .option-btn.wrong {
    background: rgba(220,80,80,0.1); border-color: rgba(220,80,80,0.4); color: #f0a0a0;
  }

  .option-btn:disabled { cursor: default; }

  .opt-label {
    width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 500; flex-shrink: 0; letter-spacing: 0;
  }

  .explanation {
    margin-top: 12px; padding: 12px 16px; background: rgba(255,255,255,0.03);
    border-left: 2px solid rgba(197,168,122,0.4); border-radius: 0 8px 8px 0;
    font-size: 13px; color: #7a7068; line-height: 1.6;
  }

  .explanation strong { color: #a89f93; font-weight: 500; }

  .results-card {
    background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 2.5rem; text-align: center; margin-top: 2rem;
  }

  .score-ring {
    width: 100px; height: 100px; margin: 0 auto 1.5rem;
    position: relative;
  }

  .score-svg { transform: rotate(-90deg); }

  .score-text {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }

  .score-num { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #f0ead8; }
  .score-den { font-size: 11px; color: #4a4540; }
  .score-pct { font-size: 18px; font-weight: 500; margin: 0.5rem 0; }
  .score-label { font-size: 13px; color: #7a7068; margin-bottom: 1.5rem; }

  .retry-btn {
    background: #c5a87a; color: #0d0d12; border: none; border-radius: 10px;
    padding: 11px 28px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.2s;
    margin: 0 6px;
  }
  .retry-btn:hover { background: #d4b888; }

  .error-msg {
    background: rgba(220,80,80,0.08); border: 0.5px solid rgba(220,80,80,0.3);
    border-radius: 10px; padding: 14px 18px; margin-top: 1rem;
    font-size: 13px; color: #f0a0a0;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.4s ease both; }
`;

const QUICK_TOPICS = [
  "World War II", "Python Programming", "Human Anatomy",
  "Quantum Physics", "Shakespeare", "Cryptocurrency",
  "Climate Science", "Ancient Rome"
];

const SYSTEM_PROMPT = `You are an expert quiz generator. When given a topic, generate exactly 20 multiple choice questions.

Return ONLY a JSON array with no markdown, no backticks, no explanation. Each object must have:
- "question": string
- "options": object with keys "A", "B", "C", "D" as strings
- "answer": single letter "A", "B", "C", or "D"
- "explanation": 1-2 sentence string explaining why the answer is correct

Vary difficulty (easy, medium, hard) and question types (factual, conceptual, applied). Make distractors plausible.`;

function ScoreRing({ correct, total }) {
  const pct = total ? correct / total : 0;
  const r = 42, cx = 50, cy = 50;
  const circumference = 2 * Math.PI * r;
  const dash = pct * circumference;
  const color = pct >= 0.8 ? "#50c878" : pct >= 0.5 ? "#c5a87a" : "#dc5050";
  return (
    <div className="score-ring">
      <svg className="score-svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" />
      </svg>
      <div className="score-text">
        <span className="score-num">{correct}</span>
        <span className="score-den">/ {total}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [topic, setTopic] = useState("");
  const [phase, setPhase] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("Crafting your quiz…");
  const inputRef = useRef(null);

  const loadingMsgs = [
    "Generating questions…",
    "Adding tricky distractors…",
    "Balancing difficulty…",
    "Almost ready…"
  ];

  async function generateQuiz(overrideTopic) {
    const t = (overrideTopic || topic).trim();
    if (!t) return;
    setError("");
    setPhase("loading");
    setAnswers({});
    setRevealed({});

    let msgIdx = 0;
    setLoadingMsg(loadingMsgs[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMsgs.length;
      setLoadingMsg(loadingMsgs[msgIdx]);
    }, 2200);

    try {
      // Calls our secure Vercel serverless function — API key stays server-side
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `Generate a 20-question MCQ quiz on: ${t}` }]
        })
      });

      clearInterval(interval);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("").trim();
      const clean = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length < 5) throw new Error("Invalid quiz data received.");
      setQuestions(parsed.slice(0, 20));
      setPhase("quiz");
    } catch (e) {
      clearInterval(interval);
      setError(e.message || "Something went wrong. Please try again.");
      setPhase("home");
    }
  }

  function handleChipClick(t) {
    setTopic(t);
    generateQuiz(t);
  }

  function selectAnswer(qi, letter) {
    if (answers[qi] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qi]: letter }));
    setTimeout(() => setRevealed(prev => ({ ...prev, [qi]: true })), 300);
  }

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;

  const scoreLabel = () => {
    const p = correctCount / questions.length;
    if (p >= 0.9) return "Outstanding!";
    if (p >= 0.75) return "Great work!";
    if (p >= 0.5) return "Not bad!";
    return "Keep practising";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="grain" />

        {phase === "home" && (
          <>
            <div className="header fade-up">
              <div className="badge"><span className="badge-dot" />AI-powered quiz generator</div>
              <h1>Test your knowledge<br />on <em>anything</em></h1>
              <p className="subtitle">
                Enter any topic and get 20 thoughtfully crafted<br />
                multiple-choice questions in seconds.
              </p>
            </div>
            <div className="input-area fade-up">
              <div className="input-row">
                <input
                  ref={inputRef}
                  className="topic-input"
                  placeholder="e.g. 'Cell Biology' or 'The French Revolution'…"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && generateQuiz()}
                />
                <button className="gen-btn" onClick={() => generateQuiz()} disabled={!topic.trim()}>
                  Generate Quiz →
                </button>
              </div>
              <div className="quick-topics">
                {QUICK_TOPICS.map(t => (
                  <button key={t} className="chip" onClick={() => handleChipClick(t)}>
                    {t}
                  </button>
                ))}
              </div>
              {error && <div className="error-msg">{error}</div>}
            </div>
          </>
        )}

        {phase === "loading" && (
          <div className="loading-screen fade-up">
            <div className="spinner-wrap">
              <div className="spinner-ring outer" />
              <div className="spinner-ring inner" />
            </div>
            <div className="loading-text">{loadingMsg}</div>
            <div className="loading-sub">Generating 20 questions on "{topic}"</div>
          </div>
        )}

        {(phase === "quiz" || phase === "results") && (
          <div className="quiz-area">
            <div className="quiz-header fade-up">
              <div>
                <div className="quiz-title">{topic}</div>
                <div className="quiz-meta">{questions.length} questions · multiple choice</div>
              </div>
              <button className="reset-btn" onClick={() => { setPhase("home"); setTopic(""); }}>
                ← New quiz
              </button>
            </div>

            <div className="progress-bar-wrap fade-up">
              <div className="progress-label">
                <span>{answeredCount} of {questions.length} answered</span>
                <span>{answeredCount > 0 ? `${correctCount} correct` : "—"}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
              </div>
            </div>

            {questions.map((q, i) => {
              const sel = answers[i];
              const show = revealed[i];
              const cardClass = show
                ? sel === q.answer ? "answered-correct" : "answered-wrong"
                : sel ? "active" : "";

              return (
                <div key={i} className={`question-card ${cardClass} fade-up`}
                  style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
                  <div className="q-num">Question {i + 1}</div>
                  <div className="q-text">{q.question}</div>
                  <div className="options">
                    {["A", "B", "C", "D"].map(letter => {
                      let cls = "";
                      if (show) {
                        if (letter === q.answer) cls = "correct";
                        else if (letter === sel) cls = "wrong";
                      } else if (letter === sel) cls = "selected";

                      return (
                        <button
                          key={letter}
                          className={`option-btn ${cls}`}
                          onClick={() => selectAnswer(i, letter)}
                          disabled={!!sel}
                        >
                          <span className="opt-label">{letter}</span>
                          {q.options[letter]}
                        </button>
                      );
                    })}
                  </div>
                  {show && (
                    <div className="explanation">
                      <strong>{sel === q.answer ? "Correct — " : `The answer is ${q.answer} — `}</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {allAnswered && (
              <div className="results-card fade-up">
                <ScoreRing correct={correctCount} total={questions.length} />
                <div className="score-pct" style={{
                  color: correctCount / questions.length >= 0.8
                    ? "#50c878" : correctCount / questions.length >= 0.5
                    ? "#c5a87a" : "#dc5050"
                }}>
                  {Math.round((correctCount / questions.length) * 100)}%
                </div>
                <div className="score-label">
                  {scoreLabel()} You got {correctCount} out of {questions.length} right.
                </div>
                <button className="retry-btn" onClick={() => generateQuiz()}>
                  Regenerate Quiz
                </button>
                <button className="retry-btn"
                  style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.12)", color: "#7a7068" }}
                  onClick={() => { setPhase("home"); setTopic(""); }}>
                  Try New Topic
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
