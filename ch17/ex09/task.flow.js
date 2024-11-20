// @flow

// 型定義
export type User = { id: number, name: string }; // ユーザーを表す型
export type Task = { title: string, completed: boolean, user: User }; // タスクを表す型
export type Priority = "low" | "middle" | "high"; // 優先度の型
export type PriorityTask = Task & { priority: Priority }; // 優先度付きタスクの型

/**
 * Userオブジェクトであることを判定する関数
 * @param {mixed} obj - 判定対象のオブジェクト
 * @returns {boolean} User型である場合はtrue
 */
export function isUserObject(obj: mixed): boolean %checks {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string"
  );
}

/**
 * タスク管理クラス
 * @template T - タスクの型（Taskまたはその派生型）
 */
export class TaskManager<T: Task> {
  _tasks: Array<T> = []; // 管理するタスクの配列

  /**
   * タスクを追加する
   * @param {T} task - 追加するタスク
   */
  add(task: T): void {
    this._tasks.push(task);
  }

  /**
   * タスクを完了状態にする
   * @param {User | string} target - 完了対象のユーザーまたはタスクタイトル
   */
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      // ユーザーに紐づくタスクを完了
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      // タイトルに一致するタスクを完了
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  /**
   * 引数の関数にマッチするタスクを返す
   * @param {(task: T) => boolean} [predicate] - フィルタリング条件
   * @returns {Array<T>} 条件に一致するタスクの配列
   */
  getTasks(predicate?: (task: T) => boolean): Array<T> {
    return predicate ? this._tasks.filter(predicate) : this._tasks;
  }
}

/**
 * 優先度が"low"または完了済みのタスクであるかを判定する
 * @param {PriorityTask} task - 判定対象のタスク
 * @returns {boolean} 判定結果
 */
export function isLowOrCompletedTask(task: PriorityTask): boolean {
  return task.priority === "low" || task.completed;
}

/**
 * 判定関数の否定結果を返す関数を生成する
 * @template T
 * @param {(arg: T) => boolean} f - 判定関数
 * @returns {(arg: T) => boolean} 否定結果を返す関数
 */
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg: T) => !f(arg);
}
