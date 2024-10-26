'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Find office space (1500-2000 sq ft)", completed: false },
    { id: 2, text: "Finalize Division Heads", completed: false },
    { id: 3, text: "Define KPIs for each division", completed: false },
    { id: 4, text: "Secure Technology Partnerships", completed: false },
    { id: 5, text: "Recruit Teams", completed: false },
    { id: 6, text: "Set Up Office", completed: false },
    { id: 7, text: "Initiate Soft Operations", completed: false },
    { id: 8, text: "Launch Full Operations", completed: false },
    { id: 9, text: "Start KPI Tracking", completed: false },
    { id: 10, text: "Begin Profitability Reporting", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Business Plan Implementation To-Do List</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow mr-2"
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="space-x-2 mb-4">
        <Button variant={filter === 'all' ? "default" : "outline"} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? "default" : "outline"} onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? "default" : "outline"} onClick={() => setFilter('completed')}>Completed</Button>
      </div>
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center space-x-2">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}