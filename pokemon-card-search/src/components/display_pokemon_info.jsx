import FetchPokeData from "../utilities/poke-api"
import PokemonEvolutions from "./PokemonEvolutions";
import PokemonImages from "./PokemonImages";
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

    const unpackTypeImg = (array, alt_txt = 'pokemon type', img_class = '') => {
        return array.map((src, index) => (
            <img key={index} className={img_class} src={src} alt={alt_txt} />
        ));

    }


    return (
        <>
            <PokemonTitle name={data.pokemon_name} text={tcgData.flavor_text} />  

            <div className="grid grid-cols-2">
                <PokemonImages images={[data.pokemon_default_img, data.pokemon_shiny_img]} text={['Standard', 'Shiny']} />
            </div>

            <div className="flex justify-evenly p-4 bg-gray-100">
                {unpackTypeImg(data.type_img_array, "pokemon type")}
            </div>


            <PokemonEvolutions image_src_array={tcgData.evolves_to_img} name_array={tcgData.evolves_to_array} parent_className="flex flex-wrap justfiy-evenly" image_className="w-30" />

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