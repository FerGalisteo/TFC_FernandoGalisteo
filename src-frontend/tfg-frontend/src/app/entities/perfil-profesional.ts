import { LugarDisponible } from "./lugarDisponible";
import { Usuario } from "./usuario";

export interface PerfilProfesional {
    id?: number;
    titulo: string;
    descripcion: string;
    categorias: string[];
    lugaresDisponibles: LugarDisponible[];
    imagenes?: any[]; // Puedes definir un modelo específico para las imágenes si lo prefieres
    usuarioCreador?: Usuario;
  }
  