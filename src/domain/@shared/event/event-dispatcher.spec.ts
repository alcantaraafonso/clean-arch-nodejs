
import SendEmailWhenProductWasCreatedHandler from "../../product/event/handler/send-email-when-product-was-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {

    it("should register event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductWasCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductWasCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductWasCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductWasCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 100
        });

        eventDispatcher.notify(productCreatedEvent);
        
        expect(spyEventHandler).toHaveBeenCalled();
    });

});