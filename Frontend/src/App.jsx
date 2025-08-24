import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; 
import 'prismjs/components/prism-jsx';  
import Editor from 'react-simple-code-editor';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import axios from 'axios';
import rehypehighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Import a highlight.js theme
import Markdown from "react-markdown";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`function add(a, b) {
  return a + b;
}`);
const[review, setReview] = useState('');
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);  // re-highlight on code change
const [loading, setLoading] = useState(false);
  async function handleReviewClick() {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    setReview(response.data);
  } catch (err) {
    console.error("Review API error:", err.message);
    setReview({ response: "Error getting review." });
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="container">
      <div className="left-box">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => Prism.highlight(code, Prism.languages.jsx, 'jsx')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: '#000',
            color: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            height: '100%',
            overflow: 'auto',
          }}
        />
        <div onClick={handleReviewClick} className={`button ${loading ? 'loading' : ''}`}>
  {loading ? "Reviewing..." : "Review"}
</div>
      </div>
      <div className="right-box">
        {review && typeof review.response === 'string' ? (
          <Markdown rehypePlugins={[rehypehighlight]}>
            {review.response}
          </Markdown>
        ) : (
          <p>No review or invalid format</p>
        )}
      </div>
    </main>
  );
}

export default App;
