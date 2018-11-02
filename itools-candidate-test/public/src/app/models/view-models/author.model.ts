export class AuthorModel{
    public id: number;
    public firstName: string;
    public secondName: string;
    public email: string;
    public birthDate: Date;
    public book: object;

    constructor();
    constructor(id: number, firstName: string, secondName: string, email: string, birthDate: Date, book: object);
    constructor(id?: number, firstName?: string, secondName?: string, email?: string, birthDate?: Date, book?: object) {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.birthDate = birthDate;
        this.book = book;
    }
}
