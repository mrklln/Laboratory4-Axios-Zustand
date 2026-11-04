import { create } from "zustand";
import { persist } from "zustand/middleware";

//the store holds the groups, tasks, and the functions that change them
export const useTodoStore = create(
  persist(
    (set) => ({
      groups: [], //list of groups
      tasks: [], //list of tasks

      //add a new group, ignore it if the input is empty
      addGroup: (name) =>
        set((state) => ({
          groups: [...state.groups, { id: Date.now().toString(), name }],
        })),

      //delete a group and all its tasks
      deleteGroup: (id) =>
        set((state) => ({
          groups: state.groups.filter((g) => g.id !== id),
          tasks: state.tasks.filter((t) => t.groupId !== id),
        })),

      //add a new task, ignore it if the input is empty
      addTask: (title, groupId = null) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: Date.now().toString(), title, done: false, groupId },
          ],
        })),

      //toggle a task's done status by its id
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
          ),
        })),
      //delete a task by its id
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      // move a task into a group
      assignTask: (id, groupId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, groupId } : t
          ),
        })),
    }),
    { name: "app-storage" }, //persist the store in localStorage
  ),
);
