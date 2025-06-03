import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [item, setItem] = useState("");
  let [list, setList] = useState(() => {
    let saved = localStorage.getItem("lista-de-compras");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lista-de-compras", JSON.stringify(list)); // corrigido aqui
  }, [list]);

  let addItem = () => {
    if (item.trim() === "") return;
    setList([...list, item]);
    setItem("");
  };

  let removeItem = (index) => {
    let newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white shadow-lg rounded-2xl p-6 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Lista de Compras</h1>
        <div className='flex gap-2 mb-4'>
          <input
            type="text"
            className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            placeholder='Adicionar item...'
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={addItem}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
          >
            Adicionar
          </button>
        </div>

        <ul className='space-y-2'>
          {list.map((item, index) => (
            <li key={index} className='flex justify-between items-center bg-gray-200 rounded-lg px-3 py-2'>
              <span>{item}</span>
              <button
                onClick={() => removeItem(index)}
                className='text-red-500 hover:text-red-700'
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        {list.length === 0 && (
          <p className='text-center text-gray-400 mt-4'>Nenhum item adicionado</p>
        )}
      </div>
    </div>
  );
}

export default App;
