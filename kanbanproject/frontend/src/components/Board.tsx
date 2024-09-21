
import Column from './Column';
import "./styles/Board.css";
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Data } from './Create';


interface BoardProps {
    data: Data;
    setData: React.Dispatch<React.SetStateAction<Data>>;
}


const Board: React.FC<BoardProps> = ({data, setData}) => {

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;

        const startColumn = data.columns[source.droppableId];
        const finishColumn = data.columns[destination.droppableId];

        if (startColumn === finishColumn) {

            const newCardIds = Array.from(startColumn.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, result.draggableId); 

            const newColumn = {
                ...startColumn,
                cardIds: newCardIds,
            };

            setData((prev) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [newColumn.id]: newColumn,
                },
            }));
        } else {

            const startCardIds = Array.from(startColumn.cardIds);
            startCardIds.splice(source.index, 1); 

            const finishCardIds = Array.from(finishColumn.cardIds);
            finishCardIds.splice(destination.index, 0, result.draggableId);

            const newStartColumn = {
                ...startColumn,
                cardIds: startCardIds,
            };
            const newFinishColumn = {
                ...finishColumn,
                cardIds: finishCardIds,
            };

            setData((prev) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [newStartColumn.id]: newStartColumn,
                    [newFinishColumn.id]: newFinishColumn,
                },
            }));
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                <div className="app-board-container">
                    <div className="app-board-content">
                        {data.columnOrder.map((columnId) => {
                            const column = data.columns[columnId];
                            const cards = column.cardIds.map((cardId) => data.cards[cardId]);
                            return <Column key={column.id} id={column.id} title={column.title} cards={cards} />;
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

export default Board;
