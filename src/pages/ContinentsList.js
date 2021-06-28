import React, { useEffect, useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql
} from "@apollo/client";
import { Link } from "react-router-dom";

export const ContinentsList = () => {

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
        <li key={continent.name}
            className="border-2 border-gray-200 hover:bg-yellow-200 transition duration-300"
        >
            <Link to={`/continents/${continent.code}`}>
                <p>Continent name: {continent.name}</p>
                <p>Continent code: {continent.code}</p>
            </Link>
        </li>
    ))

    return (
        <ApolloProvider client={continents}>
            <div>
                <p className="p-2 bg-yellow-200 text-center">Continents list</p>
                <Link to='/'
                      className="block mb-5 p-2 text-center bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                >Go back to home page</Link>
                <ul className="flex flex-col gap-2">
                    {continentsJsx}
                </ul>
            </div>
        </ApolloProvider>
    )
}