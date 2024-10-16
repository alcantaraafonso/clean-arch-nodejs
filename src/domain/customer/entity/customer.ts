
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends  Entity{
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        
        this._id = id;
        this._name = name;
        this.validate(); //Aqui é um exemplo de como podemos validar o objeto (autovalidation principle)

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    //A diferença entre o setName e o changeName é que o setName está na classe por estar
    //Já o changeName traz consigo a intenção de mudar o nome do cliente a partir de uma regra de negócio
    changeName(newName: string) {
        if (newName.length === 0) {
            throw new Error("Nome inválido");
        }
        this._name = newName;
    }

    changeAddress(newAddress: Address) {
        this._address = newAddress;
    }

    //A modelagem do domínio rico expressa CLARAMENTE a necessidade do negócio
    activate() {
        if(this._address === null || this._address === undefined) {    
            throw new Error("The address is required to activate the customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        if (this.id.length === 0) {
            this.notification.addError({ message: "ID é requerido", context: "Customer" });
        }
        if (this._name.length === 0) {
            this.notification.addError({ message: "Nome é requerido", context: "Customer" });
        }
    }

    get address(): Address {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    get active(): boolean {
        return this._active;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
}