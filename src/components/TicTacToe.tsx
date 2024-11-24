import React, { useState } from "react"

type SquareProps = {
    mark: string,
    value: number,
    onSquareClick: () => void
}

type WinnerProps = {
    squares: string[],
}

const Square: React.FC<SquareProps> = ({mark, onSquareClick}) => {
    return (
        <div>
            <button className="w-20 h-20 bg-gray-200 m-2 rounded-md text-2xl" onClick={onSquareClick}>{mark}</button>
        </div>
    )
}

const calculateWinner = ({ squares }: WinnerProps): string | null => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Board: React.FC<{ marks: string[], 
    setMarks: React.Dispatch<React.SetStateAction<string[]>>, 
    winner: string | null, 
    setWinner: React.Dispatch<React.SetStateAction<string | null>> }> = ({ marks, setMarks, winner, setWinner }) => {
    const handleClick = (value: number) => {
        if (winner || marks[value]) return;
        setMarks((prevMarks) => {
            const newMarks = [...prevMarks];
            newMarks[value] = (newMarks.filter(mark => mark).length % 2 === 0) ? 'X' : 'O';
            const winner = calculateWinner({ squares: newMarks });
            if (winner) {
                setWinner(winner);
            }
            return newMarks;
        });
    }

    return (
        <div className="grid grid-cols-3">
            {marks.map((mark, index) => 
                <Square 
                key={index} 
                mark={mark} 
                value={index} 
                onSquareClick={() => handleClick(index)} />
            )}
        </div>
    )
}

const TicTacToe = () => {
    const [winner, setWinner] = useState<string | null>(null);
    const [marks, setMarks] = useState<string[]>(Array(9).fill(''));

    const handleRestart = () => {
        setWinner(null);
        setMarks(Array(9).fill(''));
    }

    return (
        <div className="flex items-center justify-center flex-col w-full h-screen">
            <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
            <Board marks={marks} setMarks={setMarks} winner={winner} setWinner={setWinner} />
            {winner && <div className="mt-4">
                <p className="text-xl font-bold">Winner: {winner}</p>
                <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md" onClick={handleRestart}>Restart</button>
            </div>}
        </div>
    )
}

export default TicTacToe;

