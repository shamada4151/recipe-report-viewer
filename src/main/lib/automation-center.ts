import child from 'child_process'
const AC_PATH = 'C:\\Program Files\\JEOL\\AutomationCenter\\bin\\Release\\AutomationCenter.exe'

export const openAutomationCenter = (recipe?: string): void => {
  const cmd = `start "" "${AC_PATH}" "${recipe || ''}"`

  child.exec(cmd, (err, data) => {
    if (err) {
      console.error(err)
    }

    console.log(data.toString())
  })
}
