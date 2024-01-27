export const isBrowserReloading = () => {
    return performance.navigation.type === performance.navigation.TYPE_RELOAD;
};