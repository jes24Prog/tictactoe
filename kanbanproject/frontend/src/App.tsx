import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { ColumnData, CreateCard, CreateColumn, Data, initialData } from './components/Create';

function App() {

  const [data, setData] = useState<Data>(initialData);

  const addColumn = (id: string, title: string) => {
      const columnExists = Object.values(data.columns).some(column => column.title === title);
      
      if (columnExists) {
          alert("Column Exist");
          return;
      }

      const newColumn: ColumnData = { id, title, cardIds: [] };
      const newColumns = { ...data.columns, [id]: newColumn };
      const newColumnOrder = [...data.columnOrder, id];

      setData({
          ...data,
          columns: newColumns,
          columnOrder: newColumnOrder,
      });
  };

  const addCard = (id: string, title: string, columnId: string) => {

    const column = data.columns[columnId];
    const cardExists = column.cardIds.some(cardId => data.cards[cardId].title === title);

    if (cardExists) {
        alert("Card Exist!");
        return;
    }

    const newCard = { id, title };
    const newCards = { ...data.cards, [id]: newCard };
    const newCardIds = [...column.cardIds, id];
    const newColumn = { ...column, cardIds: newCardIds };

    setData({
        ...data,
        cards: newCards,
        columns: {
            ...data.columns,
            [columnId]: newColumn,
        },
    });
  };

  return (

    <div className="app">
      <div className="app-container">
        <h1>KANBAN BOARD</h1>
        <div className="app-input">
        <CreateColumn addColumn={addColumn}/> 
          {
            data.columnOrder.length > 0 ?
              <CreateCard addCard={addCard} columnIds={data.columnOrder} />
            :
            ''
          }          
        </div>
      </div>
      <div className="app-board">
        <Board data={data} setData={setData}/>
      </div>
    </div>
  )
}

export default App
