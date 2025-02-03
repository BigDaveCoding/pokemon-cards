import { useState, useEffect } from "react"
import CreateText from "./CreateText";

export default function PokemonMoves({moves}) {

    // console.log("pokemon moves component", moves)

    const [currentPage, setCurrentPage] = useState(0)
    const movesPerPage = 5


    const [movesDescriptions, setMovesDescriptions] = useState([])
    const [movesAccuracy, setMovesAccuracy] = useState([])
    const [movesPower, setMovesPower] = useState([])
    const [movesPp, setMovesPp] = useState([])

    const getMovesForCurrentPage = () => {
        const startIndex = currentPage * movesPerPage;
        const endIndex = startIndex + movesPerPage;
        return moves.slice(startIndex, endIndex);
    };


    // Fetch descriptions for the moves on the current page
    useEffect(() => {
        const fetchMoveDescriptions = async () => {
            const currentPageMoves = getMovesForCurrentPage(); // Get moves for the current page
            const descriptions = [];
            const accuracy = []
            const power = []
            const pp = []

            for (const move of currentPageMoves) {
                const response = await fetch(move.move.url);
                const data = await response.json();

                console.log(data)

                accuracy.push(data.accuracy)
                power.push(data.power)
                pp.push(data.pp)

                // Find the flavor text entry for Sword/Shield in English
                for (const ft_entry of data.flavor_text_entries) {
                    if (ft_entry.language.name === 'en' && ft_entry.version_group.name === 'sword-shield') {
                        descriptions.push(ft_entry.flavor_text);
                        break; // Exit loop after finding the description for this move
                    }
                }
            }

            setMovesDescriptions(descriptions); // Update the state with descriptions for the current page
            setMovesAccuracy(accuracy)
            setMovesPower(power)
            setMovesPp(pp)
        };

        if (moves.length > 0) {
            fetchMoveDescriptions(); // Call the function only if there are moves
        }
    }, [currentPage, moves]); // Trigger effect whenever 'currentPage' or 'moves' changes

    
    const handleNextPage = () => {
        if ((currentPage + 1) * movesPerPage < moves.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 px-2">
                {getMovesForCurrentPage().map((move, index) => (
                    <div className="grid grid-cols-[1fr_3fr] border-b-1 items-center" key={index}>
                        <div>
                            <CreateText className="border-r-1 text-yellow-400 capitalize" text={move.move.name} />
                        </div>
                        <div className="grid grid-cols-1">
                            <CreateText className="pl-2" text={movesDescriptions[index]}  />
                            <div className="grid grid-cols-[2fr_2fr_1fr] text-lime-200 text-sm px-2">
                                <CreateText className="text-lime-200" text={`Accuracy: ${movesAccuracy[index]}`} />
                                <CreateText text={`Power: ${movesPower[index]}`} />
                                <CreateText text={`PP: ${movesPp[index]}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 border-1 bg-green-900 text-white rounded-md"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={(currentPage + 1) * movesPerPage >= moves.length}
                    className="px-4 py-2 border-1 bg-green-900 text-white rounded-md"
                >
                    Next
                </button>
            </div>
        </>
    )
}
