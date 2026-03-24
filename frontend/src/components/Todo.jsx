import React, { useState } from 'react';

const Todo = ({ initialItems = [], title = "To-Do List" }) => {
  const [todoItems, setTodoItems] = useState(initialItems);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ task: '', due: '', priority: 'Medium' });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.task.trim()) return;
    
    // Format the date for display if it exists
    let displayDue = newTodo.due;
    if (newTodo.due) {
        const date = new Date(newTodo.due);
        displayDue = date.toLocaleString([], { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    const newTask = {
      id: Date.now(),
      task: newTodo.task,
      due: displayDue || 'No due date',
      priority: newTodo.priority,
      completed: false
    };

    setTodoItems([newTask, ...todoItems]);
    setNewTodo({ task: '', due: '', priority: 'Medium' });
    setShowAddTodo(false);
  };

  const toggleTodo = (id) => {
    setTodoItems(todoItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTodo = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-[#0e4d46]">{title}</h2>
        <button 
          onClick={() => setShowAddTodo(!showAddTodo)}
          className="text-xs font-bold text-[#0e4d46] transition-colors hover:opacity-80"
        >
          {showAddTodo ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showAddTodo && (
        <form onSubmit={handleAddTodo} className="mb-6 p-4 rounded-2xl bg-[#f8fafb] border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-[#5a827d] uppercase mb-1">Task</label>
                <input 
                type="text" 
                placeholder="What needs to be done?"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
                value={newTodo.task}
                onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-[10px] font-bold text-[#5a827d] uppercase mb-1">Priority</label>
                <select 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10 appearance-none bg-white"
                value={newTodo.priority}
                onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#5a827d] uppercase mb-1">Due Date & Time</label>
            <input 
              type="datetime-local" 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
              value={newTodo.due}
              onChange={(e) => setNewTodo({...newTodo, due: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-[#0e4d46] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#0a3d37] transition-all">
            Add to List
          </button>
        </form>
      )}

      <div className="space-y-4">
        {todoItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f0f7f6] transition-colors group relative">
            <button 
              onClick={() => toggleTodo(item.id)}
              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                item.completed ? 'bg-[#0e4d46] border-[#0e4d46]' : 'border-gray-200 group-hover:border-[#0e4d46]'
              }`}
            >
              {item.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-bold text-[#0e4d46] ${item.completed ? 'line-through opacity-50' : ''}`}>{item.task}</p>
                {item.priority && (
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter
                        ${item.priority === 'High' ? 'bg-red-50 text-red-500' : 
                          item.priority === 'Medium' ? 'bg-orange-50 text-orange-500' : 
                          'bg-blue-50 text-blue-500'}
                    `}>
                        {item.priority}
                    </span>
                )}
              </div>
              <p className="text-xs text-[#5a827d]">{item.due}</p>
            </div>
            <button 
              onClick={() => deleteTodo(item.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
