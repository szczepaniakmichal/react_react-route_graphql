import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const CurrentContinent = ({continentCode}) => (
    <>
        <p>{continentCode}</p>
        <Link to='/continents/'>Go back to continents list</Link>
    </>
)

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
    }, [])

    const countriesJsx = countries.map(countrie => (
        <li key={countrie.name}>
            <p>countrie name: {countrie.name}</p>
            <p>countrie emoji: {countrie.emoji}</p>
            <p>countrie languages: {countrie.languages[0].name}</p>
        </li>
    ))

    return (
        <div>
            <CurrentContinent continentCode={match.params.code}/>
            <ul>
                {countriesJsx}
            </ul>
        </div>
    )
};