import styles from './TaskList.module.css';
import clipboard from '../assets/Clipboard.svg';
import { Trash } from "@phosphor-icons/react";
import { ChangeEvent, useState, useEffect } from "react";

interface TaskListProps {
    taskCount: number;
    taskList: string[];
    doneList: string[];
    addDoneTask: (task: string) => void;
    deleteTask: (task: string) => void;
}

export const TaskList = ({ taskCount, taskList, doneList, addDoneTask, deleteTask }: TaskListProps) => {
    const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);

    useEffect(() => {
        setCompletedTasks(new Array(taskList.length).fill(false));
    }, [taskList]);

    const handleCheck = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const updatedCompletedTasks = [...completedTasks];
        const isChecked = event.target.checked;

        updatedCompletedTasks[index] = isChecked;
        setCompletedTasks(updatedCompletedTasks);

        if (isChecked && !doneList.includes(taskList[index])) {
            addDoneTask(taskList[index]);
        }
    };

    const handleDelete = (task: string) => () => {
        deleteTask(task);
    };

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
                    <div className={styles.item} key={index}>
                        <div className={styles.check}>
                            <input
                                type="checkbox"
                                name={`task-${index}`}
                                id={`task-${index}`}
                                className={styles.roundCheckbox}
                                checked={completedTasks[index]}
                                onChange={handleCheck(index)}
                            />
                        </div>
                        <div className={styles.content}>
                            {completedTasks[index] ? <s>{task}</s> : <p>{task}</p>}
                        </div>
                        <div className={styles.delete} onClick={handleDelete(task)}>
                            <Trash size={18} className={styles.trash} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
