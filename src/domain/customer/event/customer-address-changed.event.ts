import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
    eventType: string;

    constructor(customer: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = customer;
        this.eventType = 'customer.address.changed';
    }
}