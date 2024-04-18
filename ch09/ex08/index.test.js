// Jest encountered an unexpected tokenでテストうまくいかなかった
import { AlarmClock } from "./index.js";
// Jest encountered an unexpected token

describe("AlarmClock", () => {
  let alarmClock;

  beforeEach(() => {
    alarmClock = new AlarmClock();
  });

  it("transitions from 'normal' to 'alarmSet' when 'setAlarm' is called", () => {
    alarmClock.setState("normal");
    expect(alarmClock.setAlarm()).toBe("none");
  });

  it("transitions from 'alarmSet' to 'normal' when 'cancelAlarm' is called", () => {
    alarmClock.setState("alarmSet");
    expect(alarmClock.cancelAlarm()).toBe("none");
  });

  it("transitions from 'alarmSet' to 'alarmSounding' when 'reachedToAlarmTime' is called", () => {
    alarmClock.setState("alarmSet");
    expect(alarmClock.reachedToAlarmTime()).toBe("soundAlarm");
  });

  it("transitions from 'alarmSounding' to 'snoozing' when 'snooze' is called", () => {
    alarmClock.setState("alarmSounding");
    expect(alarmClock.snooze()).toBe("stopAlarm");
  });

  it("transitions from 'snoozing' to 'alarmSounding' when 'elapseSnoozeTime' is called", () => {
    alarmClock.setState("snoozing");
    expect(alarmClock.elapseSnoozeTime()).toBe("soundAlarm");
  });

  it("stays at 'normal' when 'cancelAlarm' is called", () => {
    alarmClock.setState("normal");
    expect(alarmClock.cancelAlarm()).toBe("none");
  });

  it("stays at 'normal' when 'reachedToAlarmTime' is called", () => {
    alarmClock.setState("normal");
    expect(alarmClock.reachedToAlarmTime()).toBe("none");
  });

  it("stays at 'normal' when 'snooze' is called", () => {
    alarmClock.setState("normal");
    expect(alarmClock.snooze()).toBe("none");
  });

  it("stays at 'normal' when 'elapseSnoozeTime' is called", () => {
    alarmClock.setState("normal");
    expect(alarmClock.elapseSnoozeTime()).toBe("none");
  });
});
