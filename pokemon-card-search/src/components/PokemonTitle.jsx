import CreateText from "./CreateText"


export default function PokemonTitle({name, text}){
    return (
        <>
            <CreateText tag='h3' className="text-center text-6xl uppercase p-2" text={name} />
            <CreateText tag="p" className="p-2 text-xl italic text-center" text={text} />
        </>
    )
}