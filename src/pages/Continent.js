import React, { useEffect, useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import { Link } from "react-router-dom";

import { CurrentContinent } from "./CurrentContinent";
import { NoCountries } from "../components/NoCountries";

export const Continent = ({match}) => {
    const [countries, setCountries] = useState([]);
    const [isLinkGoBack, setIsLinkGoBack] = useState(false);
    const [loading, setLoading] = useState(true);

    const depsCountries = countries && countries.length > 0;

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
                setCountries(result.data.continent && result.data.continent.countries);
                setLoading(false);
            });
    }, [match.params.code]);

    useEffect(() => {
        const heightList = document.querySelector(".countries-list");
        const windowHeight = window.innerHeight;
        if (heightList && heightList.clientHeight + 160 > windowHeight) {
            setIsLinkGoBack(true);
        }
    }, [depsCountries])

    const countriesJsx = countries && countries.length > 0 ? countries.map(countrie => {
        const {name, emoji, languages} = countrie;
        const isNoData = languages && languages[0] && languages[0].name ? languages[0].name : 'no data';
        return (
            <li key={countrie.name}
                className="p-2 border-2 border-gray-200 hover:bg-yellow-200 transition duration-300 text-sm"
            >
                <p>countrie name: <span className="font-bold">{name || 'no data'}</span></p>
                <p>countrie emoji: <span className="font-bold">{emoji || 'no data'}</span></p>
                <p>countrie languages: <span
                    className="font-bold">{isNoData}</span></p>
            </li>
        )
    }) : null;

    const linkJsx = isLinkGoBack ? (
        <Link to='/continents/'
              className="block mb-5 p-2 text-center bg-yellow-300 hover:bg-yellow-400 transition duration-300"
        >Go back to continents list</Link>
    ) : null;

    return (
        <div>
            <CurrentContinent continentCode={match.params.code}/>
            <ul className="countries-list grid grid-cols-3 gap-5 mb-5"
                // style={{display: `${!loading && !countriesJsx ? 'none' : 'grid'}`}}
            >
                {countriesJsx}
            </ul>
            {loading ? <span>Loading...</span> : null}
            {!loading && !countriesJsx ? <NoCountries continentCode={match.params.code}/> : null}
            {linkJsx}
        </div>
    );
};