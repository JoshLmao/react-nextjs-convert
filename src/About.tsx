import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as Realm from "realm-web";

class About extends React.Component<{

}, {
    blockInfo: any | undefined
}> {

    _realmApp: any;
    _client: any;

    constructor(props: any) {
        super(props);

        this.state = {
            blockInfo: undefined,
        };
    }

    async componentDidMount() {
        console.log("About mounted");

        const realmId: any = process.env.REACT_APP_REALM_APP_ID;
        this._realmApp = new Realm.App({
            id: realmId
        });

        let apiKey = process.env.REACT_APP_REALM_API_KEY;
        if (!apiKey) {
            console.error(`Unable to get API key`);
            return undefined;
        }

        try {
            const credentials = Realm.Credentials.userApiKey(apiKey);
            await this._realmApp.logIn(credentials);
            console.log("LOGGED IN!");

            this._client = this._realmApp.currentUser.mongoClient("mongodb-atlas");
        } catch (e) {
            console.error(e);
            return undefined;
        }

        const block = await this._client.db("NftExplorer-Prod8").collection("LastBlock").findOne({}); 
        this.setState({
            blockInfo: block,
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                This is my about page
                <br/>
                <Link
                    to="/">
                    Go home
                </Link>
                <br/>
                <code>
                    {
                        this.state.blockInfo !== undefined && JSON.stringify(this.state.blockInfo)
                    }
                </code>
            </div>
        )
    }    
}

export default About;
