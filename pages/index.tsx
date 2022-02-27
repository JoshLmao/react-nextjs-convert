import React from "react";
import Link from "next/link";
// import logo from 'logo.svg';

class Home extends React.Component<{}> {
    render(): React.ReactNode {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <Link
                        href="/about">
                        Go to my about page
                    </Link>
                </header>
            </div>
        )
    }
}

export default Home;