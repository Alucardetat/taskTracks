import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await fetch("http://localhost:5000/tasks");
			const data = await response.json();
			setTasks(data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const addTask = (newTask) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const markTaskAsComplete = async (taskId) => {
		try {
			const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task._id === taskId ? { ...task, completed: true } : task,
					),
				);
			}
		} catch (error) {
			console.error("Error marking task as complete:", error);
		}
	};

	const markTaskAsIncomplete = async (taskId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/tasks/${taskId}/incomplete`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
				},
			);

			if (response.ok) {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task._id === taskId ? { ...task, completed: false } : task,
					),
				);
			}
		} catch (error) {
			console.error("Error marking task as incomplete:", error);
		}
	};

	const deleteTask = async (taskId) => {
		console.log("Deleting task with ID:", taskId);
		try {
			const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setTasks((prevTasks) =>
					prevTasks.filter((task) => task._id !== taskId),
				);
			} else {
				console.error("Failed to delete task:", response.status);
			}
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	return (
		<>
			<div className="container">
				<div className="newTasks">
					<section>
						<h2>Add a New Task</h2>
						<TaskForm onTaskAdded={addTask} />
					</section>
				</div>

				<div className="tasks">
					<div className="incompleteTasks">
						<section>
							<h2>Incomplete Tasks</h2>
							<TaskList
								tasks={tasks.filter((task) => !task.completed)}
								onComplete={markTaskAsComplete}
								onDelete={deleteTask}
							/>
						</section>
					</div>

					<div className="completeTasks">
						<section>
							<h2>Completed Tasks</h2>
							<TaskList
								tasks={tasks.filter((task) => task.completed)}
								onIncomplete={markTaskAsIncomplete}
								onDelete={deleteTask}
							/>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
