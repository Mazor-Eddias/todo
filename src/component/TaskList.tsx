import styles from './TaskList.module.css';
import clipboard from '../assets/Clipboard.svg';
import { Trash } from "@phosphor-icons/react";
import { ChangeEvent, useState, useEffect, useCallback } from "react";

interface Task {
    id: string;
    text: string;
}

interface TaskListProps {
    taskCount: number;
    taskList: Task[];
    doneList: string[];
    addDoneTask: (task: string) => void;
    deleteTask: (task: string) => void;
}

const useTaskState = (taskList: Task[]) => {
    const [completedTasks, setCompletedTasks] = useState<boolean[]>(new Array(taskList.length).fill(false));

    useEffect(() => {
        setCompletedTasks((prev) => {
            const updatedCompletedTasks = new Array(taskList.length).fill(false);
            for (let i = 0; i < taskList.length; i++) {
                if (prev[i]) {
                    updatedCompletedTasks[i] = true;
                }
            }
            return updatedCompletedTasks;
        });
    }, [taskList]);

    return [completedTasks, setCompletedTasks] as const;
};

export const TaskList = ({ taskCount, taskList, doneList, addDoneTask, deleteTask }: TaskListProps) => {
    const [completedTasks, setCompletedTasks] = useTaskState(taskList);

    const handleCheck = useCallback((index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        setCompletedTasks((prev) => {
            const updatedCompletedTasks = [...prev];
            const isChecked = event.target.checked;

            updatedCompletedTasks[index] = isChecked;

            if (isChecked && !doneList.includes(taskList[index].id)) {
                addDoneTask(taskList[index].id);
            }

            return updatedCompletedTasks;
        });
    }, [addDoneTask, doneList, taskList]);

    const handleDelete = useCallback((taskId: string) => () => {
        deleteTask(taskId);
    }, [deleteTask]);

    const completedCount = completedTasks.filter(Boolean).length;

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p className={styles.create}>Tarefas criadas <span className={styles.count}>{taskCount}</span></p>
                <p className={styles.done}>Concluídas <span className={styles.count}>{taskCount === 0 ? 0 : `${completedCount} de ${taskCount}`}</span></p>
            </div>
            {taskCount === 0 ? (
                <div className={styles.emptyList}>
                    <img src={clipboard} alt="Clipboard" />
                    <h2>Você ainda não tem tarefas cadastradas</h2>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            ) : (
                taskList.map((task, index) => (
                    <div className={styles.item} key={task.id}>
                        <div className={styles.check}>
                            <input
                                type="checkbox"
                                name={`task-${task.id}`}
                                id={`task-${task.id}`}
                                className={styles.roundCheckbox}
                                checked={completedTasks[index] || false}
                                onChange={handleCheck(index)}
                            />
                        </div>
                        <div className={styles.content}>
                            {completedTasks[index] ? <s>{task.text}</s> : <p>{task.text}</p>}
                        </div>
                        <button
                            className={styles.delete}
                            onClick={handleDelete(task.id)}
                        >
                            <Trash size={18} className={styles.trash} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};
