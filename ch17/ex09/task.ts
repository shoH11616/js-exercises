// 型定義
export type User = { id: number; name: string }; // ユーザーを表す型
export type Task = { title: string; completed: boolean; user: User }; // タスクを表す型
export type Priority = 'low' | 'middle' | 'high'; // 優先度を表す型
export type PriorityTask = Task & { priority: Priority }; // 優先度付きタスクの型

/**
 * オブジェクトがUser型かどうかを判定する関数
 * @param obj - 判定対象のオブジェクト
 * @returns objがUser型の場合true
 */
function isUserObject(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    typeof obj['id'] === 'number' &&
    typeof obj['name'] === 'string'
  );
}

/**
 * タスク管理クラス
 * @template T - 管理するタスクの型
 */
export class TaskManager<T extends Task> {
  private _tasks: T[] = []; // 管理するタスクの配列

  /**
   * タスクを追加する
   * @param task - 追加するタスク
   */
  add(task: T): void {
    this._tasks.push(task);
  }

  /**
   * タスクを完了状態にする
   * @param target - 完了対象（ユーザーまたはタスクタイトル）
   */
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      // Userオブジェクトが指定された場合
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      // タイトルが指定された場合
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  /**
   * 条件にマッチするタスクを取得する
   * @param predicate - フィルタリング条件（オプション）
   * @returns 条件に一致するタスクの配列
   */
  getTasks(predicate?: (task: T) => boolean): T[] {
    if (predicate === undefined) {
      return this._tasks; // 条件がない場合はすべてのタスクを返す
    } else {
      return this._tasks.filter(predicate); // 条件に一致するタスクのみ返す
    }
  }
}

/**
 * タスクが優先度"low"または完了済みかを判定する関数
 * @param task - 判定対象のタスク
 * @returns 条件に一致する場合true
 */
export function isLowOrCompletedTask(task: PriorityTask): boolean {
  return task.priority === 'low' || task.completed;
}

/**
 * 判定関数の否定結果を返す関数を生成する
 * @template T - 判定対象の型
 * @param f - 判定関数
 * @returns fの否定を返す関数
 */
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg: T) => !f(arg);
}
