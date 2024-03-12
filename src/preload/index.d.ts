import { ElectronAPI } from '@electron-toolkit/preload';
import { type app } from 'electron';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    app: app;
  }
}
