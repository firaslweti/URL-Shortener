import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Lottie from 'react-lottie';
import animationData from './loading-animation.json';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/shorten', { originalUrl });
      const { shortId } = response.data;
      setShortUrl(`http://localhost:3001/${shortId}`);
      saveToLocalStorage(originalUrl, shortId);
    } catch (error) {
      console.error('Error shortening the URL', error);
    } finally {
      setLoading(false);
    }
  };
  const saveToLocalStorage = (originalUrl, shortId) => {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    urls.push({ originalUrl, shortId });
    localStorage.setItem('urls', JSON.stringify(urls));
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="App" id="app">
      <div className="container">
      <h1>URL Shortener</h1>
      <div className="loading-animation">
          <Lottie options={defaultOptions}  width={200} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter the original URL"
          />
          <button type="submit">Shorten</button>
        </form>
        {shortUrl && (
          <div className="result">
            <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
            <button onClick={() => navigator.clipboard.writeText(shortUrl)}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;