import { ChangeEvent, useState } from "react";
import "./styles/Create.css";

export interface Card {
    id: string;
    title: string;
}

export interface ColumnData {
    id: string;
    title: string;
    cardIds: string[];
}

export interface Data {
    columns: Record<string, ColumnData>;
    cards: Record<string, Card>;
    columnOrder: string[];
}

interface CreateColumnProps {
    addColumn: (id: string, title: string) => void;
}

interface CreateCardProps {
    addCard: (id: string, title: string, columnId: string) => void;
    columnIds: string[];
}

const initialCards: Record<string, Card> = {};
const initialColumns: Record<string, ColumnData> = {};
const initialColumnOrder: string[] = [];

export const initialData: Data = {
    columns: initialColumns,
    cards: initialCards,
    columnOrder: initialColumnOrder,
};

export const CreateColumn: React.FC<CreateColumnProps> = ({addColumn}) => {

    const[id, setId] = useState<string>('');
    const[title, setTitle] = useState<string>('');

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value.toUpperCase());
        setId(id);
    }

    return(
        <div className="create-column">
            <input type="text" placeholder="Enter Column Title" value={title.toUpperCase()} onChange={handleTitleChange}/>
            <button onClick={()=>{
                addColumn(title, title);
                setId("");
                setTitle("");
            }}>AddColumn</button>
        </div>
    )
}

export const CreateCard: React.FC<CreateCardProps> = ({ addCard, columnIds }) => {

    const[id, setId] = useState<string>('');
    const[title, setTitle] = useState<string>('');
    const [selectedColumnId, setSelectedColumnId] = useState<string>(columnIds[0]);

    const handleTitleChange = async(e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        await setTitle(e.target.value);
        await setId(title)
    }



    return(
        <div className="create-card">
            <input type="text" placeholder="Enter Card Title" value={title} onChange={handleTitleChange}/>
                <select value={selectedColumnId} onChange={(e) => setSelectedColumnId(e.target.value)}>
                    {columnIds.map((columnId) => (
                        <option key={columnId} value={columnId}>
                            {columnId}
                        </option>
                    ))}
                </select>
            <button onClick={()=>{
                addCard(id, title, selectedColumnId);
                setId("");
                setTitle("");
            }}>AddCard</button>
        </div>
    )
}
