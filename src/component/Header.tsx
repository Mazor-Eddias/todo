import {PlusCircle, Ticket} from "@phosphor-icons/react";
import styles from './Header.module.css';
import {ChangeEvent, FormEvent, useState} from "react";

interface HeaderProps {
    addTask: (task: string) => void
}


export const Header = ({addTask}: HeaderProps) => {
    const [task, setTask] = useState('')

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setTask(event.target.value);
    }

    function handleCreate(event: FormEvent) {
        event.preventDefault();
        if (task.trim() !== '') {
            addTask(task);
            setTask('');
        }
    }


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Ticket size={36} className={styles.icon}/>
                <h1>to<span>do</span></h1>
            </header>
            <div className={styles.content}>
                <input
                    type="text" name="task" id="task"
                    className={styles.text}
                    placeholder={'Adicione uma nova tarefa'}
                    required
                    onChange={handleChange}
                    value={task}
                />
                {(task.length > 0) ? <button
                    className={styles.link}
                    onClick={handleCreate}
                >Criar <PlusCircle size={20} className={styles.plus}/></button> : ''}
            </div>
        </div>

    );
};