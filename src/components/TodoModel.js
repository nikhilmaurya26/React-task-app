import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

import { addTodo, updateTodo } from '../slices/todoSlice';

function TodoModel({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [priority, setPriority] = useState('medium');
  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setPriority(todo.priority);
    } else {
      setTitle('');
      setStatus('incomplete');
      setPriority('medium');
    }
  }, [type, todo, modalOpen]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please Emter a title');
    }

    if (title && status && priority) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            priority,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added Sucessfully ');
      }
      if (type === 'update') {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.priority !== priority
        ) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
              priority,
            })
          );
        } else {
          toast.error('No changes');
        }
      }
      setModalOpen(false);
    } else {
      toast.error('emplty');
    }
    console.log({ title, status, priority });
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form
            className={styles.form}
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
            <h1 className={styles.formTitle}>
              {type === 'update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="statys"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complte</option>
              </select>
            </label>
            <label htmlFor="priority">
              Priority
              <select
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" varient="primary">
                {type === 'update' ? 'Update' : 'Add'} task
              </Button>
              <Button
                type="button"
                varient="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModel;
