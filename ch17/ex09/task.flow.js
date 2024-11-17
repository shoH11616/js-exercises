// @flow

// 型定義
export type User = { id: number, name: string };
export type Task = { title: string, completed: boolean, user: User };
export type Priority = "low" | "middle" | "high";
export type PriorityTask = Task & { priority: Priority };

// Userオブジェクトであることを判定する
export function isUserObject(obj: mixed): boolean %checks {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string"
  );
}

export class TaskManager<T: Task> {
  _tasks: Array<T> = [];

  // タスクを追加する
  add(task: T): void {
    this._tasks.push(task);
  }

  // タスクを完了にする
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  getTasks(predicate?: (task: T) => boolean): Array<T> {
    return predicate ? this._tasks.filter(predicate) : this._tasks;
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(task: PriorityTask): boolean {
  return task.priority === "low" || task.completed;
}

// 判定関数の否定結果を返す関数を生成する
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg: T) => !f(arg);
}
