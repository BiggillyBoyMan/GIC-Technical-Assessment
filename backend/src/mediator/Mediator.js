class Mediator {
  constructor() {
    this.handlers = new Map()
  }

  register(commandName, handler) {
    this.handlers.set(commandName, handler)
  }

  async send(command) {
    const commandName = command.constructor.name
    const handler = this.handlers.get(commandName)

    if (!handler) {
      throw new Error(`No handler registered for command: ${commandName}`)
    }

    return handler.handle(command)
  }
}

module.exports = Mediator