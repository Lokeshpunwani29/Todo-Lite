import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("Todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (Todos.length > 0) {
      localStorage.setItem("Todos", JSON.stringify(Todos));
    } else {
      localStorage.removeItem("Todos");
    }
  }, [Todos]);

  const toggleFinished = () => {
    setShowFinished(!ShowFinished);
  };

  const handleEdit = (e, id) => {
    let t = Todos.filter(item => item.id === id);
    setTodo(t[0].Todo);
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => item.id === id);
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url(assets/peakpx.jpg)]">
        <Navbar />
        <div className="container mx-auto my-5 px-4 py-6 bg-blue-900/25 rounded-2xl max-w-md sm:max-w-lg md:max-w-xl w-full flex flex-col gap-4 items-center">

          {/* Add Todo */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <input
              onChange={handleChange}
              value={Todo}
              type="text"
              placeholder='Add New Task (min 3 letters)'
              className='flex-1 px-3 py-2 rounded-md text-black font-semibold'
            />
            <button
              onClick={handleAdd}
              disabled={Todo.length < 3}
              className='bg-blue-800 hover:bg-black text-white px-4 py-2 rounded-md disabled:opacity-50'
            >
              <FaSave />
            </button>
          </div>

          {/* Show Finished Toggle */}
          <div className="flex items-center gap-3 text-white font-bold">
            <input
              type="checkbox"
              checked={ShowFinished}
              onChange={toggleFinished}
              className='w-5 h-5'
            />
            <span>Show Finished Tasks</span>
          </div>

          {/* Todos Section */}
          <h1 className='text-2xl sm:text-3xl text-white font-serif'>Your Todos</h1>

          <div className="overflow-y-auto max-h-[50vh] w-full flex flex-col gap-3">
            {Todos.length === 0 && (
              <div className="text-white text-center">No Todos to Display. Add some!</div>
            )}

            {Todos.map(item => {
              return (ShowFinished || !item.isCompleted) && (
                <div key={item.id} className="flex justify-between items-center gap-3 bg-blue-200/40 px-4 py-2 rounded-md">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      onChange={handleCheckbox}
                      className='w-5 h-5'
                    />
                    <div className={`flex-1 text-left text-white font-semibold break-words ${item.isCompleted ? "line-through" : ""}`}>
                      {item.Todo}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => handleEdit(e, item.id)} className='bg-blue-800 hover:bg-black text-white p-2 rounded-md'>
                      <FaEdit />
                    </button>
                    <button onClick={(e) => handleDelete(e, item.id)} className='bg-blue-800 hover:bg-black text-white p-2 rounded-md'>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
