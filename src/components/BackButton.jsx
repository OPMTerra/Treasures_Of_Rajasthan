import React from 'react';
import { Link } from 'react-router-dom';

export default function BackButton({ href, label }) {
  return (
    <Link to={href} className="back-btn">
      <i className="ri-arrow-left-line"></i>
      <span>{label}</span>
    </Link>
  );
}