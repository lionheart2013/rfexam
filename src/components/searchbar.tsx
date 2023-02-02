import React, {FormEvent} from "react";
import {Hero} from "@/common/hero.types";

type Props = {
    searchResult: React.Dispatch<React.SetStateAction<Hero[]>>;
}
export default function Searchbar({ searchResult }: Props) {

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & { searchTerm: { value: string } };

        fetch(`/api/search?name=${target.searchTerm.value}`)
            .then((resp) => resp.json())
            .then(searchResult)
            .catch(console.error);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                name="searchTerm"
                placeholder="Type superhero name"/>
            <button>Search</button>
        </form>
    );
}