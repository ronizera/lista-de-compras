import { useEffect, useState } from 'react';
import './App.css'; // Mantenha, caso tenha outros estilos não-Tailwind

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(() => {
    let saved = localStorage.getItem("lista-de-compras");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("dark-mode");
    // Garante que o valor salvo seja um booleano
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Efeito para salvar a lista no localStorage
  useEffect(() => {
    localStorage.setItem("lista-de-compras", JSON.stringify(list));
  }, [list]);

  // Efeito para salvar o estado do modo noturno e aplicar a classe 'dark' no <html>
  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Adiciona 'dark' ao <html>
    } else {
      document.documentElement.classList.remove("dark"); // Remove 'dark' do <html>
    }
  }, [darkMode]);

  const addItem = () => {
    if (item.trim() === "") return;
    setList([...list, { nome: item, comprado: false }]);
    setItem("");
  };

  const toggleComprado = (index) => {
    let novaLista = [...list];
    novaLista[index].comprado = !novaLista[index].comprado;
    setList(novaLista);
  };

  const removeItem = (index) => {
    let newList = list.filter((_, i) => i !== index);
    setList(newList);
  };


  return (
    // O container principal agora é relativo para o botão absoluto
    <div className='min-h-screen relative flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>

      {/* Botão de Modo Noturno no canto superior direito */}


      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md transition-colors duration-300'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Lista de Compras</h1>
        
        <div className='flex gap-2 mb-4'>
          <input
            type="text"
            className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
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
            <li
              key={index}
              className={`flex justify-between items-center rounded-lg px-3 py-2 cursor-pointer ${
                item.comprado ? 'bg-green-200 line-through text-gray-500' : 'bg-gray-200'
              } dark:bg-gray-700 dark:text-gray-100 ${item.comprado && 'dark:bg-green-700 dark:text-gray-400'}`}
            >
              <span
                className='flex-1 cursor-pointer'
                onClick={() => toggleComprado(index)}
              >
                {item.nome}
              </span>
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
          <p className='text-center text-gray-400 dark:text-gray-500 mt-4'>Nenhum item adicionado</p>
        )}
      </div>
    </div>
  );
}

export default App;