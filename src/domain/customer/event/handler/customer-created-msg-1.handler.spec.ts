import Address from "../../value-object/address";
import Customer from "../../../customer/entity/customer";
import CustomerAddressChangedEvent from "../../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../../customer/event/customer-created.event";
import CustomerAddressChangedHandler from "./customer-address-changed.handler";
import CustomerCreatedMessage1 from "./customer-created-msg-1.handler";
import CustomerCreatedMessage2 from "./customer-created-msg-2.handler";
import EventDispatcher from "../../../@shared/event/event-dispatcher";

describe("Log 1 event test", () => {
    it("should register the event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new CustomerCreatedMessage1();
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
  
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    });
  
    it("should unregister the event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new CustomerCreatedMessage1();
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
  
      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });
  
    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new CustomerCreatedMessage1();
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
  
      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBe(undefined);
    });
  
    it("should notify all customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const firstMessageEventHandler = new CustomerCreatedMessage1();
        const secondMessageEventHandler = new CustomerCreatedMessage2();

        const firstMessageSpyEventHandler = jest.spyOn(firstMessageEventHandler, "handle");
        const secondMessageSpyEventHandler = jest.spyOn(secondMessageEventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", firstMessageEventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondMessageEventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstMessageEventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondMessageEventHandler);

        const customer = new Customer('123', 'Customer 1');
        const customerCreatedEvent = new CustomerCreatedEvent({ customer });
        
        eventDispatcher.notify(customerCreatedEvent);

        expect(firstMessageSpyEventHandler).toHaveBeenCalled();
        expect(secondMessageSpyEventHandler).toHaveBeenCalled();
    });


    it("should notify customer address changed event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const firstMessageCustomerCreatedEventHandler = new CustomerCreatedMessage1();
        const secondMessageCustomerCreatedEventHandler = new CustomerCreatedMessage2();
        const addressChangedEventHandler = new CustomerAddressChangedHandler();

        const firstMessageCustomerCreatedSpyEventHandler = jest.spyOn(firstMessageCustomerCreatedEventHandler, "handle");
        const secondMessageCustomerCreatedSpyEventHandler = jest.spyOn(secondMessageCustomerCreatedEventHandler, "handle");
        const addressChangedSpyEventHandler = jest.spyOn(addressChangedEventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", firstMessageCustomerCreatedEventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondMessageCustomerCreatedEventHandler);
        eventDispatcher.register("CustomerAddressChangedEvent", addressChangedEventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstMessageCustomerCreatedEventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondMessageCustomerCreatedEventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(addressChangedEventHandler);
    
        const customer = new Customer('123', 'Customer 1');
        const customerCreatedEvent = new CustomerCreatedEvent({
            customer
        });
        eventDispatcher.notify(customerCreatedEvent);

        const address = new Address('Rua 1', 2, '12345-678', 'São Paulo');
        customer.changeAddress(address);

        const addressChangedEvent = new CustomerAddressChangedEvent({ 
            id: customer.id,
            name: customer.name
        });

        eventDispatcher.notify(addressChangedEvent);

        expect(firstMessageCustomerCreatedSpyEventHandler).toHaveBeenCalled();
        expect(secondMessageCustomerCreatedSpyEventHandler).toHaveBeenCalled();
        expect(addressChangedSpyEventHandler).toHaveBeenCalled();
    });

  });