import { Autocomplete } from "./components/Autocomplete"


const ExampleSync = () => {
    const suggestions = [{
        label: 'John',
        value: '1'
    }, {
        label: 'Jane',
        value: '2'
    }, {
        label: 'Joe',
        value: '3'
    }, {
        label: 'Jill',
        value: '4'
    }, {
        label: 'Jim',
        value: '5'
    }, {
        label: 'Jack',
        value: '6'
    }]

    return (
        <>
            <h1>Autocomplete (sync)</h1>
            <Autocomplete inputLabel="User Search" suggestions={suggestions} placeholder="Search by name..." />
        </>
    )
}

export default ExampleSync