import React from 'react';
import { v4 as uuid } from 'uuid';
import { RxDotsVertical } from 'react-icons/rx';
import useSessionStorage from '../../hooks/useSessionStorage';
import { setTaskProps, Task as TaskProps } from '../../types';
import Button from '../Button';
import Input from '../Input';
import './styles.css';
import useDraggableList from '../../hooks/useDraggableList';

type Props = TaskProps & {
  setTasks: (v: setTaskProps) => void;
}

function Task({
  title, isCompleted, id, setTasks, subTasks: initSubTasks,
}: Props) {
  const [currTaskTitle, setCurrTaskTitle] = React.useState(title);
  const [subTaskTitle, setSubTaskTitle] = React.useState('');
  const [subTasks, setSubTasks] = useSessionStorage(`subtasks-${id}`, initSubTasks);

  const backgroundColor = isCompleted ? '#BDE7BD' : '#FFD5D4';

  const toggleCompletion = () => {
    setTasks((currTasks) => {
      const updatedTasks = currTasks.map((t) => {
        if (t.id === id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });
      return updatedTasks;
    });
  };

  const editCurrTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setCurrTaskTitle(newTitle.charAt(0).toUpperCase() + newTitle.slice(1));
  };

  const addSubtask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subTaskTitle) {
      setSubTasks((currSubTasks) => currSubTasks.concat([{
        id: uuid(),
        title: subTaskTitle,
        isCompleted: false,
        subTasks: [],
      }]));
      setSubTaskTitle('');
    }
  };

  const removeTask = () => {
    setTasks((currTasks) => currTasks.filter((t) => t.id !== id));
  };

  const { dragStart, dragEnter, drop } = useDraggableList(subTasks, setSubTasks);

  return (
    <div className="task-container-col">
      <div
        className="task-container-row"
        style={{ backgroundColor, cursor: 'grab', paddingLeft: '1em' }}
      >
        <div className="task-container-row">
          <RxDotsVertical />
          <label htmlFor={`task-${title}-${id}-check`} className="check-container">
            <input
              type="checkbox"
              checked={isCompleted}
              id={`task-${title}-${id}-check`}
              onChange={toggleCompletion}
            />
          </label>
          <Input
            value={currTaskTitle}
            onChange={editCurrTaskTitle}
            inputStyle={{ backgroundColor }}
          />
        </div>
        <div className="task-container-row">
          <Input
            onSubmit={addSubtask}
            value={subTaskTitle}
            onChange={(e) => setSubTaskTitle(e.target.value)}
            label="New subtask"
            btnLabel="Add subtask"
            inputStyle={{ backgroundColor }}
          />
          <Button onClick={removeTask}>
            Remove this task
          </Button>
        </div>
      </div>
      {subTasks && subTasks.length > 0
        && (
        <div className="subtask-list-container">
          {subTasks.map((st: TaskProps, stIndex) => (
            <div
              key={`task-${st.title}-${st.id}`}
              onDragStart={(e) => dragStart(e, stIndex)}
              onDragEnter={(e) => dragEnter(e, stIndex)}
              onDragEnd={drop}
              draggable
              className="subtask-container"
            >
              <Task
                id={st.id}
                title={st.title}
                isCompleted={st.isCompleted}
                setTasks={setSubTasks}
                subTasks={st.subTasks}
              />
            </div>
          ))}
        </div>
        )}
    </div>
  );
}

export default Task;
