export const langState = $state({
    current: 'ja' as 'ja' | 'en'
});

export function toggleLang() {
    langState.current = langState.current === 'ja' ? 'en' : 'ja';
}