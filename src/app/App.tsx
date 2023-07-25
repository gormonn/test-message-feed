import { useState } from 'react';
import reactLogo from 'shared/assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createFakeFeed } from 'shared/api/fake';

function App() {
    const [count, setCount] = useState(0);
    const fake = () => {
        const users = createFakeFeed();
        console.log(users);
    };
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <button onClick={fake}>
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </button>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
