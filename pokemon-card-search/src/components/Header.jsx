import CreateText from "./CreateText";


export default function Header() {
    const page_tite = 'Search For Your Favourite Pokemon!'

    return (
        <>
            <header className="grid grid-cols-[1fr_5fr] items-center">
                <img className="" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="the pokemon Gengar" />
                <CreateText tag="h1" className="text-lg underline underline-offset-4 sm:text-2xl md:text-4xl" text={page_tite} />
                <span></span>
            </header>
        </>
    )
}