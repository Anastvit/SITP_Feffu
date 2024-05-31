import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">ConnectoSphere</div>
            <div className="menu">
                <a href="apple.html">О компании Apple</a>
                <a href="table.html">Сравнение моделей</a>
                <a href="index.html">На главную</a>
            </div>
        </nav>
    );
};

export default Navbar;
