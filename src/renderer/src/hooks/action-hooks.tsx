import { useCallback, useEffect, useRef, useState } from 'react';

export enum EGamepadButtons {
  'A', // 0
  'B', // 1
  'X', // 2
  'Y', // 3
  'LB', // 4
  'RB', // 5
  'LT', // 6
  'RT', // 7
  'BACK', // 8
  'START', // 9
  'LS', // 10
  'RS', // 11
  'UP', // 12
  'DOWN', // 13
  'LEFT', // 14
  'RIGHT', // 15
}

export enum PressAction {
  KeyUp = 0,
  KeyDown = 1,
}

export const useGamepad = (targetKey, callback, options?) => {
  // const [keyCode, setKeyCode] = useState(null);
  let lastExecTime = 0;

  function throttle(func, interval) {
    const currentTime = Date.now();
    if (currentTime - lastExecTime >= interval) {
      func();
      lastExecTime = currentTime;
    }
  }

  const keyPress = useCallback((event: GamepadEvent) => {
    const gp = navigator.getGamepads()[event.gamepad.index];
    if (gp?.buttons.findIndex((i) => i.value === PressAction.KeyDown) === targetKey) {
      throttle(callback, options?.time ?? 500);
    }
    window.requestAnimationFrame(() => keyPress(event));
  }, []);

  useEffect(() => {
    window.addEventListener('gamepadconnected', (event) => {
      const gamepad = event.gamepad;
      if (gamepad) console.log(`Gamepad connected`);
      window.requestAnimationFrame(() => keyPress(event));
    });
    // 监听手柄断开事件
    window.addEventListener('gamepaddisconnected', () => {
      // const gamepad = event.gamepad;
      console.log(`Gamepad disconnected`);
    });
  }, []);
  return {};
};
