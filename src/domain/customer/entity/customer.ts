import Address from "../value-object/address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate(); //Aqui é um exemplo de como podemos validar o objeto (autovalidation principle)
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
        if (this._id.length === 0) {
            throw new Error("ID é requerido");
        }
        if (this._name.length === 0) {
            throw new Error("Nome inválido");
        }
    }

    get id(): string {
        return this._id;
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