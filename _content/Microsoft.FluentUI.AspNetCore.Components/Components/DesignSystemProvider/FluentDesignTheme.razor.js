export function addThemeChangeEvent(dotNetHelper, id) {
    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("onchange", (e) => {
            try {
                // setTimeout: https://github.com/dotnet/aspnetcore/issues/26809
                setTimeout(() => {
                    dotNetHelper.invokeMethodAsync("OnChangeRaisedAsync", e.detail.name, e.detail.newValue ?? "system");
                }, 0);
            } catch (error) {
                console.error(`FluentDesignTheme: failing to call OnChangeRaisedAsync.`, error);
            }
        });

        try {
            // This can fail when localStorage does not contain a valid JSON object
            const theme = element.themeStorage.readLocalStorage()
            return theme == null ? theme : JSON.stringify(theme);
        } catch (error) {
            ClearLocalStorage(id);
            console.error(`FluentDesignTheme: failing to load theme from localStorage.`, error);
        }
       
    }

    return null;
}

export function UpdateDirection(value) {
    document.body.dir = value;
}

export function GetDirection() {
    return document.body.dir;
}

export function GetGlobalLuminance() {
    return getComputedStyle(document.documentElement).getPropertyValue('--base-layer-luminance');
}

export function ClearLocalStorage(id) {
    const element = document.getElementById(id);

    if (element) {
        element.themeStorage.clearLocalStorage();
    }
}
