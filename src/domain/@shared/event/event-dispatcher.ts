import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [key: string]: EventHandlerInterface[] } = {};

    public notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((handler) => {
                handler.handle(event);
            });
        }

    }

    public register(eventName: string, handler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
   
    }

    public unregister(eventName: string, handler: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
           const index = this.eventHandlers[eventName].indexOf(handler);
           if (index !== -1) {
               this.eventHandlers[eventName].splice(index, 1);
           }
        }
   
    }

    public unregisterAll(): void {
        this.eventHandlers = {};
    }

    public get getEventHandlers(): { [key: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
}