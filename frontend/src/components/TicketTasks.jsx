import { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import TicketsAPI from '../api/TicketsApi.js';
import UsersAPI from '../api/UsersApi.js';
import '../assets/styles/TicketTasks.css';

function TicketTasks({ ticketId }) {
  const [tasks, setTasks] = useState([]);
  const [agents, setAgents] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [newTask, setNewTask] = useState({
    comment: '',
    type: '',
    date_worked: '',
    assigned_to: '',
    hours_worked: '',
    minutes_worked: ''
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({});

  const fetchTasks = async () => {
    try {
      const tasks = await TicketsAPI.getTasks(ticketId);
      setTasks(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
    }
  };

  const fetchAgents = async () => {
    try {
      const agents = await UsersAPI.getUsersList();
      setAgents(agents);
    } catch (error) {
      console.error('Error getting agents:', error);
    }
  };

  const fetchTaskTypes = async () => {
    try {
      const types = await TicketsAPI.getTaskTypes();
      setTaskTypes(types);
    } catch (error) {
      console.error('Error getting task types:', error);
    }
  };

  const addTask = async () => {
    try {
      console.log(newTask);
      await TicketsAPI.createTask(ticketId, newTask);
      setNewTask({
        comment: '',
        type: '',
        date_worked: '',
        assigned_to: '',
        hours_worked: '',
        minutes_worked: ''
      });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId) => {
    try {
      await TicketsAPI.updateTask(taskId, editTask);
      setEditTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchAgents();
    fetchTaskTypes();
  }, [ticketId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTask(task);
  };

  const handleCancelClick = () => {
    setEditTaskId(null);
  };

  return (
    <div className="ticket-tasks">
      <table>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Type</th>
            <th>Date Worked</th>
            <th>Hrs</th>
            <th>Min</th>
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              {editTaskId === task.id ? (
                <>
                  <td>
                    <select name="assigned_to" value={editTask.assigned_to} onChange={handleEditInputChange}>
                      <option value="">Select Agent</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>{agent.username}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select name="type" value={editTask.type} onChange={handleEditInputChange}>
                      <option value="">Select Type</option>
                      {taskTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </td>
                  <td><input type="date" name="date_worked" value={editTask.date_worked ? editTask.date_worked.split('T')[0] : ''} onChange={handleEditInputChange} /></td>
                  <td><input type="numeric" name="hours_worked" value={editTask.hours_worked} onChange={handleEditInputChange} /></td>
                  <td><input type="numeric" name="minutes_worked" value={editTask.minutes_worked} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="comment" value={editTask.comment} onChange={handleEditInputChange} /></td>
                  <td>
                    <button onClick={() => updateTask(task.id)}><FaSave /></button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.assigned_name}</td>
                  <td>{task.type_name}</td>
                  <td>{task.date_worked ? new Date(task.date_worked).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : ''}</td>
                  <td>{task.hours_worked}</td>
                  <td>{task.minutes_worked}</td>
                  <td>{task.comment}</td>
                  <td>
                    <button onClick={() => handleEditClick(task)}><FaEdit /></button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td>
              <select name="assigned_to" value={newTask.assigned_to} onChange={handleInputChange}>
                <option value="">Select Agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.username}</option>
                ))}
              </select>
            </td>
            <td>
              <select name="type" value={newTask.type} onChange={handleInputChange}>
                <option value="">Select Type</option>
                {taskTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </td>
            <td><input type="date" name="date_worked" value={newTask.date_worked} onChange={handleInputChange} /></td>
            <td><input type="numeric" name="hours_worked" value={newTask.hours_worked} onChange={handleInputChange} placeholder="Hrs" /></td>
            <td><input type="numeric" name="minutes_worked" value={newTask.minutes_worked} onChange={handleInputChange} placeholder="Min" /></td>
            <td><input type="text" name="comment" value={newTask.comment} onChange={handleInputChange} placeholder="Task" /></td>
            <td><button onClick={addTask}><FaPlus /></button></td>
          </tr>
        </tbody>
      </table>
      <div className="div-cancel">
        <button className="cancel-button" onClick={handleCancelClick}>Cancel Changes</button>
      </div>
    </div>
  );
}

export default TicketTasks;