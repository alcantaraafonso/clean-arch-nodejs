

import CustomerCreatedEvent from "../../../customer/event/customer-created.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class CustomerCreatedMessage1 implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é a primeira console.log do evento: CustomerCreated")
    }
    
}