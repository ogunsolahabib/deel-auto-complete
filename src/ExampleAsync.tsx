import { Autocomplete } from "./components/Autocomplete"
import { Suggestion } from "./types/suggestion"

const ExampleAsync = () => {
    const suggestions = async (inputValue: string): Promise<Array<Suggestion>> => new Promise(resolve => { fetch(`https://api.github.com/search/users?q=${inputValue}`).then(response => response.json()).then(result => resolve(result.items?.map((i: { login: string, id: number }) => ({ label: i.login + '_' + i.id, value: i.id })))) })

    return (
        <>
            <h1>Autocomplete(async)</h1>
            <Autocomplete inputLabel="Github User Search" suggestions={suggestions} placeholder="Search by name..." />
        </>
    )
}

export default ExampleAsync