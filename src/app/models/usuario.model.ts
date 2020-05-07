export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public role: string,
    public img?: string,
    public google?: boolean,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
// Cuando un parametro es opcional todos los siguientes deben ser opcionales por eso dejar de ultimo los opcionales
