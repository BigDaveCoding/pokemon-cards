import CreateText from "./CreateText";


export default function PokemonImages({images, text}){
    return (
        <>
            {images.map((image, index) => (
                <div key={index} className="flex flex-col justify-center items-center">
                    <img src={image} alt={`Pokemon {index}`} />
                    <CreateText tag="p" className="capitalize font-bold text-center p-2" text={text[index]} />
                </div>
            ))}
        </>
    )
}