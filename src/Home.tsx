import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.svg';

export class Home extends React.Component<{}> {
    render(): React.ReactNode {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <Link
                        to="/about">
                        Go to my about page
                    </Link>
                </header>
            </div>
        )
    }
}