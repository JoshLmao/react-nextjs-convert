import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
        This is my about page
        <br/>
        <Link
            to="/">
            Go home
        </Link>
    </div>
  );
}

export default About;
