import React, { Component } from 'react';
import NavBarItem from './NavBarItem';

class NavBar extends Component {

    constructor(props){
        super(props)

        this.state = {
            items: [
                { name: "Item 1", href: "/" },
                { name: "Item 2", href: "/" },
                { name: "Item 3", href: "/" },
                { name: "Item 4", href: "/" }
            ]
        }
    }

    render() {
        return (
            <div>
                {this.state.items.map(item => <NavBarItem name={item.name}/>)}
            </div>
        );
    }
}

export default NavBar;