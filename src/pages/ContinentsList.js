import React, { useEffect, useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql
} from "@apollo/client";
import { Link } from "react-router-dom";

export const ContinentsList = ({match}) => {

    const [continents, setContinents] = useState([])

    useEffect(() => {
        const getContinents = new ApolloClient({
            uri: 'https://countries.trevorblades.com',
            cache: new InMemoryCache()
        });
        // GET CONTINENTS
        getContinents
            .query({
                query: gql`
                  query data {
                    continents {
                      name
                      code
                    }
                  }
                `
            })
            .then(result => {
                setContinents(result.data.continents)
            });
    }, [])

    const continentsJsx = continents.map(continent => (
        <li key={continent.name}>
            <Link to={`/continents/${continent.code}`} >
                <p>Continent name: {continent.name}</p>
                <p>Continent code: {continent.code}</p>
            </Link>
        </li>
    ))

    return (
        <ApolloProvider client={continents}>
            <div>
                <p>ContinentsList</p>
                <ul>
                    {continentsJsx}
                </ul>
            </div>
        </ApolloProvider>
    )
}