import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div className={styles.content__wrapper}>
      {filteredTodoList && filteredTodoList.length > 0
        ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'No todos here'}
    </div>
  );
}

export default AppContent;
