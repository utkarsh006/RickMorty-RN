type Theme = 'light' | 'dark';
type ThemeListener = (isDark: boolean) => void;

class GlobalTheme {
  private theme: Theme = 'light';
  private listeners: Set<ThemeListener> = new Set();

  get isDark(): boolean {
    return this.theme === 'dark';
  }

  get currentTheme(): Theme {
    return this.theme;
  }

  setTheme(theme: Theme) {
    if (this.theme !== theme) {
      this.theme = theme;
      this.notifyListeners();
    }
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  subscribe(listener: ThemeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.isDark));
  }
}

export const globalTheme = new GlobalTheme();
