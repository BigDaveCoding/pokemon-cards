import FetchPokeData from "../utilities/poke-api"

function DisplayPokemonInfo({data}) {

    const unpackData = (object, div_class = '', key_class = '', value_class = '') => {
        return Object.entries(object).map(([key, value]) => (
            <div className={div_class} key={key}>
                <p className={key_class} >{key}:</p>
                <p className={value_class}>{value}</p>
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
                    <h4 className="text-2xl underline underline-offset-4 pb-2">Base Stats</h4>
                    {unpackData(data.pokemon_stats, "grid grid-cols-2", "font-bold")}
                </div>
                <div className="p-2" >
                    <h4 className="text-2xl underline underline-offset-4 pb-2" >Potential Abilties</h4>
                    {unpackData(data.ability_description, "grid-cols-1", "font-bold capitalize", "text-md")}
                </div>

            </div>
        </>
    )
}

export default DisplayPokemonInfo