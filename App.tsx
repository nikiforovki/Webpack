import React from 'react';
import styles from './src/styles/index.module.scss';
import { TodosHeader } from './src/components/TodosHeader/TodosHeader';
import { TodoList } from './src/components/TodoList/TodoList';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <TodosHeader />
      <TodoList />
    </div>
  );
};

export default App;
