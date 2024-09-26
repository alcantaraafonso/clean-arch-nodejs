
import CustomerAddressChangedEvent from "../../../customer/event/customer-address-changed.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class CustomerAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);
    }
}