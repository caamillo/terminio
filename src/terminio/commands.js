const createResponse = (msg='', error=false) => {
    return {
        error: error,
        message: msg
    }
}

const SyntaxtError = createResponse('Sintassi non corretta', true)

export default (setText) => {
    const clear = () => {
        setText([])
        return createResponse()
    }

    const commands = {
        'clear': clear
    }

    return (cmd, ...args) => {
        const cmdKeys = Object.keys(commands)
        if (!cmd.length) return ''
        if (!cmdKeys.includes(cmd)) return SyntaxtError
    
        return commands[ cmd ](...args)
    }
}