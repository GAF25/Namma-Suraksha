import React from 'react';

const Login = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <div className="login-box">
        <form className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
