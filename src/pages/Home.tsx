import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return;
    if (tasks.find((el) => el.title === newTaskTitle)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
      return false;
    }
    setTasks((oldState) => [
      ...oldState,
      { id: Math.random(), title: newTaskTitle, done: false },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks];
    newTasks.find((task) => task.id === id && (task.done = !task.done));
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function handleRemoveQuestion(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [{ text: 'Sim', onPress: () => handleRemoveTask(id) }, { text: 'Não' }],
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const newTasks = [...tasks];
    const taskToBeUpdated = newTasks.find((task) => task.id === taskId);

    if (!taskToBeUpdated) return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveQuestion}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
