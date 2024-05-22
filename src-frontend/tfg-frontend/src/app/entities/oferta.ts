import { LugarDisponible } from "./lugarDisponible";
import { Usuario } from "./usuario";

export interface Oferta {
    id?: number; // Opcional porque al crear una nueva oferta no tendrás el id
    titulo: string;
    descripcion?: string; // Opcional si en el backend también es opcional
    precio: number;
    fechaCreacion: Date;
    fechaComienzo: Date;
    lugar: LugarDisponible;
    usuarioCreador?: Usuario; 
  }