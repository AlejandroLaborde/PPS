
export class Mensaje{

    id: string;
    mensaje: string;
    usuario: string;
    fecha: string;
    timestamp: number;

    constructor( mensaje:string, usuario:string, fecha:string, timestamp:number, id?:string ){
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.fecha = fecha;
        this.timestamp = timestamp;
        if(id){
            this.id = id;
        }

    }
}