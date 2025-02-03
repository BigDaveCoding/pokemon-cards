import { useState, useEffect } from "react"
import CreateText from "./CreateText";

export default function PokemonMoves({moves}) {

    // console.log("pokemon moves component", moves)

    const [currentPage, setCurrentPage] = useState(0)
    const movesPerPage = 10
    const [movesDescriptions, setMovesDescriptions] = useState([])

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

            for (const move of currentPageMoves) {
                const response = await fetch(move.move.url);
                const data = await response.json();

                console.log(data)

                // Find the flavor text entry for Sword/Shield in English
                for (const ft_entry of data.flavor_text_entries) {
                    if (ft_entry.language.name === 'en' && ft_entry.version_group.name === 'sword-shield') {
                        descriptions.push(ft_entry.flavor_text);
                        break; // Exit loop after finding the description for this move
                    }
                }
            }

            setMovesDescriptions(descriptions); // Update the state with descriptions for the current page
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
                        <CreateText className="border-r-1" text={move.move.name} />
                        <CreateText className="pl-2" text={movesDescriptions[index]}  />
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
