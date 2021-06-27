import React, { useEffect, useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

import { CurrentContinent } from "./CurrentContinent";
import { Link } from "react-router-dom";

export const Continent = ({match}) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = new ApolloClient({
            uri: 'https://countries.trevorblades.com',
            cache: new InMemoryCache()
        });

        /* GET COUNTRIES */
        getCountries
            .query({
                query: gql`
                    query data {
                            continent(code: "${match.params.code}") {
                              countries {
                                name
                                emoji
                                languages {
                                  name
                                }
                              }
                            }
                          }
                `
            })
            .then(result => {
                setCountries(result.data.continent.countries)
            });
    }, []);

    const countriesJsx = countries.length > 0 ? countries.map(countrie => {
        const {name, emoji, languages} = countrie;
        return (
            <li key={countrie.name}
                className="p-2 border-2 border-gray-200 hover:bg-yellow-200 transition duration-300"
            >
                <p>countrie name: <span className="font-bold">{name}</span></p>
                <p>countrie emoji: <span className="font-bold">{emoji}</span></p>
                <p>countrie languages: <span className="font-bold">{languages && languages[0] && languages[0].name}</span></p>
            </li>
        )
    }) : null;

        const linkJsx = countries.length > 12 ? (
            <Link to='/continents/'
                  className="block mb-5 p-2 text-center bg-yellow-300 hover:bg-yellow-400 transition duration-300"
            >Go back to continents list</Link>
        ) : null;

    return (
        <div>
            <CurrentContinent continentCode={match.params.code}/>
            <ul>
                {countriesJsx}
            </ul>
            {linkJsx}
        </div>
    );
};