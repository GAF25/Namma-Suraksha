import React from 'react'

const Signup = () => {
  return (
    <div>
      <div className="signup-page">
      <h1 className="signup-title">Sign-Up</h1>
      <div className="signup-box">
        <form className="signup-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="re-enter Password" />
          <button type="submit">Sign-up</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
