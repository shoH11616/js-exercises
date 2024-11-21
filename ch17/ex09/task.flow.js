// @flow
// 実行できなかった

// 型定義
export type User = { id: number, name: string }; // ユーザーを表す型
export type Task = { title: string, completed: boolean, user: User }; // タスクを表す型
export type Priority = 'low' | 'middle' | 'high'; // 優先度の型
export type PriorityTask = Task & { priority: Priority }; // 優先度付きタスクの型

/**
 * オブジェクトがUser型であるかを判定する関数
 * @param {any} obj - 判定対象のオブジェクト
 * @returns {boolean} objがUser型の場合true
 * @flow %checks - Flowで型チェックを可能にする
 */
export function isUserObject(obj: any): boolean %checks {
  return (
    typeof obj === 'object' &&
    typeof obj['id'] === 'number' &&
    typeof obj['name'] === 'string'
  );
}

/**
 * タスク管理クラス
 * 管理するタスクの型をジェネリクスで指定可能
 * @template T - 管理対象のタスク型
 */
export class TaskManager<T: Task> {
  _tasks: Array<T> = []; // 管理対象のタスクを格納する配列

  /**
   * タスクを追加する
   * @param {T} task - 追加するタスク
   * @returns {void}
   */
  add(task: T): void {
    this._tasks.push(task); // タスクを内部配列に追加
  }

  /**
   * タスクを完了状態にする
   * 指定されたユーザーまたはタイトルに基づいてタスクを完了状態に設定する
   * @param {User | string} target - 完了対象（ユーザーオブジェクトまたはタスクタイトル）
   * @returns {void}
   */
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      // 引数がUserオブジェクトの場合
      this._tasks
        .filter((t) => t.user === target) // 指定ユーザーのタスクをフィルタ
        .forEach((t) => (t.completed = true)); // 該当タスクを完了状態に設定
    } else {
      // 引数がタイトルの場合
      this._tasks
        .filter((t) => t.title === target) // 指定タイトルのタスクをフィルタ
        .forEach((t) => (t.completed = true)); // 該当タスクを完了状態に設定
    }
  }

  /**
   * 条件に一致するタスクを取得する
   * 条件が指定されない場合はすべてのタスクを返す
   * @param {(task: T) => boolean} [predicate] - フィルタリング条件（任意）
   * @returns {Array<T>} 条件に一致するタスクの配列
   */
  getTasks(predicate?: (task: T) => boolean): Array<T> {
    if (predicate === undefined) {
      return this._tasks; // 条件が指定されていない場合、全タスクを返す
    } else {
      return this._tasks.filter(predicate); // 条件に一致するタスクを返す
    }
  }
}

/**
 * タスクが優先度"low"または完了済みかを判定する
 * @param {PriorityTask} task - 判定対象のタスク
 * @returns {boolean} 条件に一致する場合true
 */
export function isLowOrCompletedTask(task: PriorityTask): boolean {
  return task.priority === 'low' || task.completed; // 優先度が"low"または完了済み
}

/**
 * 指定した判定関数の否定結果を返す関数を生成する
 * @template T - 判定対象の型
 * @param {(arg: T) => boolean} f - 判定関数
 * @returns {(arg: T) => boolean} fの否定を返す関数
 */
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg: T) => !f(arg); // fの否定結果を返す
}
