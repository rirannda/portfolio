class OSState {
    theme = $state<'dark' | 'light'>('dark');
    isBooting = $state<boolean>(true);

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }

    setBooting(status: boolean) {
        this.isBooting = status;
    }
}

export const os = new OSState();