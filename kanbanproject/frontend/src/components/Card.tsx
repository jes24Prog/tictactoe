import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import "./styles/Card.css";

interface CardProps {
    id: string;
    title: string;
    index: number;
}

const Card: React.FC<CardProps> = ({ id, title, index }) => (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card">
                {title}
            </div>
        )}
    </Draggable>
);

export default Card;
