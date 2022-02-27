import React from 'react';
import Link from 'next/link';
import * as Realm from "realm-web";
import { GetServerSideProps } from 'next';

type Props = {
    id: string,
    round: string,
    blockTime: string,
};

class About extends React.Component<Props> {

    render(): React.ReactNode {
        return (
            <div>
                This is my about page
                <br/>
                <Link
                    href="/"
                    >
                    Go home
                </Link>
                <br/>
                <code>
                    {
                        this.props.id !== undefined && (
                            <ul>
                                <li>
                                    { this.props.id }
                                </li>
                                <li>
                                    { this.props.round }
                                </li>
                                <li>
                                    { this.props.blockTime }
                                </li>
                            </ul>
                        )
                    }
                </code>
            </div>
        )
    }    
}

export const getServerSideProps: GetServerSideProps = async ({
    params,
    res
}) => {
    try {
        const realmId: any = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const REALM_APP = new Realm.App({
            id: realmId
        });

        let apiKey = process.env.NEXT_PUBLIC_REALM_API_KEY;
        if (!apiKey) {
            console.error(`Unable to get API key`);
            return undefined;
        }

        const credentials = Realm.Credentials.userApiKey(apiKey);
        await REALM_APP.logIn(credentials);

        const client = REALM_APP.currentUser.mongoClient("mongodb-atlas");
        const block = await client.db("NftExplorer-Prod8").collection("LastBlock").findOne({}); 
        return {
            props: {
                id: block._id,
                round:  block.round,
                blockTime: block["block-time"],
            }
        };
    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        return {
            props: { }
        };
    }
}

export default About;
