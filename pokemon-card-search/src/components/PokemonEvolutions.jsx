import CreateText from "./CreateText";


export default function PokemonEvolutions({image_src_array, name_array, parent_className = '', image_className=''}) {
    return (
     <div className={parent_className}>
        {image_src_array.map((img_src, index) => (
            <div className="flex flex-col flex-grow items-center p-2" key={index}>
                <img className={image_className} src={img_src} alt={name_array[index]} />
                <CreateText tag="p" className="text-center text-sm italic font-medium" text={name_array[index]} />
            </div>
        ))}
    </div>
    )
}