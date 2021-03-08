export function silentlyUpdateURL(url: string) {
    history.replaceState({}, "", url)
}
