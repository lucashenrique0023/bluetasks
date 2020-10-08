import React from 'react';
import { APP_NAME } from '../constants';
import { useNavBarItems } from '../hooks/useNavBarItems';
import NavBarItem from './NavBarItem';

export const NavBar = () => {
    const navBarItems = useNavBarItems();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1" href="#">{ APP_NAME }</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto">
                        {navBarItems.items.map(
                            item => <NavBarItem key={item.name} item={item} />)}
                    </div>
                        <span className="navbar-text">
                            { navBarItems.helloMessage }
                        </span>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;