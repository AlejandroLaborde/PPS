
export class Mensaje{

    id:string;
    mensaje:string;
    usuario:string;
    fecha:string;

    constructor( mensaje:string, usuario:string, fecha:string, id?:string ){
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.fecha = fecha;
        if(id){
            this.id = id;
        }

    }
}