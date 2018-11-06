export class AuthorModel{
    public _id: number;
    public firstName: string;
    public secondName: string;
    public email: string;
    public birthDate: Date;
    public book: object;

    constructor();
    constructor(_id: number, firstName: string, secondName: string, email: string, birthDate: Date, book: object);
    constructor(_id?: number, firstName?: string, secondName?: string, email?: string, birthDate?: Date, book?: object) {
        this._id = _id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.birthDate = birthDate;
        this.book = book;
    }
}
