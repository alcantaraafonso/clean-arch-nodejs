
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductWasCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log('Send email when product was created');
    }
}