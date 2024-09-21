import React from 'react';
import Card from './Card';
import './styles/Column.css';
import { Droppable } from '@hello-pangea/dnd';

interface CardData {
    id: string;
    title: string;
}

interface ColumnProps {
    id: string;
    title: string;
    cards?: CardData[];
}

const Column: React.FC<ColumnProps> = ({ id, title, cards = [] }) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                    <div className="column-title">
                        <h3>{title}</h3>
                    </div>
                    <div className="column-card">
                        {cards.map((card, index) => (
                            <Card key={card.id} id={card.id} title={card.title} index={index} />
                        ))}
                    </div>
                    {provided.placeholder} 
                </div>
            )}
        </Droppable>
    );
};

export default Column;
