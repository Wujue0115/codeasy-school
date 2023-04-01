export const state = () => ({
  themeMode: "green"
})

export const getters = {
  getThemeClassName(state) {
    return `theme-${state.themeMode}`;
  },
  getThemeMode(state) {
    return state.themeMode;
  }
}

export const mutations = {
  changeTheme(state, mode) {
    state.themeMode = mode;
  }
}