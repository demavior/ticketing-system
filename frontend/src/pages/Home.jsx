import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="home-container">
      <h1>Welcome to Pharos Support</h1>
      <p>Your Beacon of Reliable Support</p>
      {/* <div className="home-links">
        <a href="/login" className="home-link">Login</a>
        <a href="/customer" className="home-link">Customer Portal</a>
        <a href="/user" className="home-link">User Portal</a>
      </div> */}
    </div>
  );
};

export default Home;