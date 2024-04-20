export const checkNumberInput = (event, step) => {
    const isNumberKey = /[0-9]/.test(event.key)
    const isNavigationKey = [
      'Backspace',
      'Tab',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
    ].includes(event.key)
    const isDot = /[.]/.test(event.key)
    const hasDot = event.target.value.includes('.')
    if (step === 1 && isDot) {
      event.preventDefault()
      return
    }
    if (!isNumberKey && !isNavigationKey && !isDot) {
      event.preventDefault()
      return
    }
    if ((isDot && hasDot) || (step === 1 && isDot)) {
      event.preventDefault()
      return
    }
  }