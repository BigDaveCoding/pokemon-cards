import FetchPokeData from "../utilities/poke-api"

function DisplayPokemonInfo({data}) {

    const unpackData = (object) => {
        return Object.entries(object).map(([key, value]) => (
            <div className="grid grid-cols-2" key={key}>
                <p className="font-bold" >{key}:</p>
                <p>{value}</p>
            </div>
        ));
    }

    return (
        <>
            <h3 className="text-center text-4xl uppercase">{data.pokemon_name} </h3>

            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center items-center p-2">
                    <img className="w-full border-2 border-amber-500/50" src={data.pokemon_default_img} alt="" />
                    <p className="font-bold">Standard</p>
                </div>
                <div className="flex flex-col justify-center items-center p-2">
                    <img className="w-full border-2 border-amber-500/50" src={data.pokemon_shiny_img} alt="" />
                    <p className="font-bold">Shiny</p>
                </div>
            </div>

            <div className="">

                <div className="border-y-1 p-2">
                    <h4 className="text-2xl underline underline-offset-4">Base Stats</h4>
                    {unpackData(data.pokemon_stats)}
                </div>
                <div className="p-2" >
                    <h4 className="text-2xl underline underline-offset-4" >Abilties</h4>
                    <p>These are the potential abilities this pokemon might have.</p>
                    {unpackData(data.ability_description)}
                </div>

            </div>
        </>
    )
}

export default DisplayPokemonInfo