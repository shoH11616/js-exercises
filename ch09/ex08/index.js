// 目覚まし時計クラス
export class AlarmClock {
  // プライベートフィールド
  private state: State;

  constructor() {
    this.state = "normal";
  }

  // 状態を設定するメソッド（テスト用）
  setState(state: State) {
    this.state = state;
  }

  // アラーム設定イベント
  setAlarm(): Action {
    switch (this.state) {
      // アラームの状態がnormalの時、状態をalarmSetに変更
      case "normal":
        this.state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム解除イベント
  cancelAlarm(): Action {
    switch (this.state) {
      // アラームの状態を元に戻す
      case "alarmSet":
        this.state = "normal";
        return "none";
      case "alarmSounding":
        this.state = "normal";
        // stopAlarmアクションを返す。
        return "stopAlarm";
      case "snoozing":
        this.state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime(): Action {
    switch (this.state) {
      // アラームセット状態だとアラームがなっている状態になる
      // アラームを鳴らすためsoundAlarmアクションを返す。
      case "alarmSet":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  // スヌーズイベント
  snooze(): Action {
    switch (this.state) {
      case "alarmSounding":
        this.state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime(): Action {
    switch (this.state) {
      case "snoozing":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}
