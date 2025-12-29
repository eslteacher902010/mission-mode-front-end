// SignInForm.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';
import './SignInForm.css';

const SignInForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

 const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await signIn(formData);
      setUser(user);
      console.log("signed in user:", user); 
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };


  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <main>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign In</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;