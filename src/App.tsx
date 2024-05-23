import { Header } from "./component/Header";
import './global.module.css';
import { useState, useEffect } from "react";
import { TaskList } from "./component/TaskList";

function App() {
    const [taskList, setTaskList] = useState<string[]>([]);
    const [taskListRange, setTaskListRange] = useState(0);

    const addTask = (task: string) => {
        setTaskList(prevTaskList => [...prevTaskList, task]);
    };

    const [doneList, setDoneList] = useState<string[]>([]);

    const addDoneTask = (task: string) => {
        setDoneList(prevState => [...prevState, task]);
    };

    const deleteTask = (task: string) => {
        setTaskList(prevTaskList => prevTaskList.filter(t => t !== task));
        setDoneList(prevDoneList => prevDoneList.filter(t => t !== task));
    };

    useEffect(() => {
        setTaskListRange(taskList.length);
    }, [taskList]);

    function taskRange(): number {
        return taskListRange;
    }

    return (
        <>
            <Header addTask={addTask} />
            <TaskList
                taskCount={taskRange()}
                taskList={taskList}
                doneList={doneList}
                addDoneTask={addDoneTask}
                deleteTask={deleteTask}
            />
        </>
    );
}

export default App;
