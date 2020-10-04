import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import { APP_NAME } from '../constants';
import NavBarItem from './NavBarItem';

class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [
                { name: "Listar Tarefas", href: "/", active: true},
                { name: "Nova Tarefa", href: "/form", active: false }
            ]
        }

        this.onClickHandle = this.onClickHandle.bind(this);
    }

    onClickHandle(itemClicked) {
        const items = [...this.state.items]
        items.forEach(item => item === itemClicked ? item.active = true : item.active = false);
        this.setState({ items })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1" href="#">{ APP_NAME }</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav mr-auto">
                            {this.state.items.map(
                                i => <NavBarItem
                                    key={i.name}
                                    item={i}
                                    onClick={this.onClickHandle}
                                />
                            )}
                                 { AuthService.isAuthenticated() ? 
                                    <NavBarItem item={ { name: "Logout", active: false, href: "#"  } } />
                                    : ""
                                }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;