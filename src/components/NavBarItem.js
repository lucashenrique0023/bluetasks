import React from 'react';
import { Link } from 'react-router-dom';

// Desestruturando o props e pegando apenas o item
const NavBarItem = ({ item }) => {
    return (
        <div>
            <Link
                className={`nav-item nav-link ${item.active ? "active" : ""}`}
                to={item.href} 
                onClick={() => item.onClick(item)}>
                {item.name}
            </Link>
        </div>
    );
}

export default NavBarItem;