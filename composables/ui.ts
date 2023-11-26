/**
 * main drawer open 여부
 */
export const useMainDrawerOpenedState = () => useState('mainDrawer', () => false)

/**
 * 로딩바 표시 여부
 */
export const useLoadingBarState = () => useState('loadingBar', () => false)

export const useLoadingTask = async (fn: Function) => {
  const loadingBarState = useLoadingBarState()

  try {
    loadingBarState.value = true
    await fn()
  } finally {
    loadingBarState.value = false
  }
}
