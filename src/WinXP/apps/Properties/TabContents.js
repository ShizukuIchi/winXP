import ThemeTab from './ThemeTab';
import AppearanceTab from './AppearanceTab';
import DesktopTab from './DesktopTab';
import ScreenSaverTab from './ScreenSaverTab';
import SettingsTab from './SettingsTab';

const TabContents = {
  Themes: ThemeTab,
  Desktop: DesktopTab,
  'Screen Saver': ScreenSaverTab,
  Appearance: AppearanceTab,
  Settings: SettingsTab,
};

export default TabContents;
