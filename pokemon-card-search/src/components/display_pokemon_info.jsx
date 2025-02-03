import FetchPokeData from "../utilities/poke-api"
import PokemonTitle from "./PokemonTitle";

function DisplayPokemonInfo({data, tcgData}) {

    const unpackData = (object, div_class = '', key_class = '', value_class = '') => {
        return Object.entries(object).map(([key, value]) => (
            <div className={div_class} key={key}>
                <p className={key_class} >{key}:</p>
                <p className={value_class}>{value}</p>
            </div>
        ));
    }

    const unpackTypeImg = (array, alt_txt = '', img_class = '') => {
        return array.map((src, index) => (

                <img key={index} className={img_class} src={src} alt={alt_txt} />

        ));

    }

    const unpackEvolutionImages = (img_array) => {
        return img_array.map((src, index) => (
            <img className="w-30" src={src} key={index} alt='' />
        ))
    }

    // const grid_cols_length = tcgData.evolves_to_img.length
    // console.log("grid cols:", grid_cols_length)

    return (
        <>
            <PokemonTitle name={data.pokemon_name} text={tcgData.flavor_text} />  

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

            <div className="flex justify-evenly p-4 bg-gray-100">
                {unpackTypeImg(data.type_img_array, "pokemon type")}
            </div>

            <div className="p-2">
                <h4 className="text-2xl underline underline-offset-4">Evolutions</h4>
                <div className="flex flex-wrap justify-evenly">
                    {unpackEvolutionImages(tcgData.evolves_to_img)}
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