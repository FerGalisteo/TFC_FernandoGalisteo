export interface PerfilProfesional {
    id?: number;
    titulo: string;
    descripcion: string;
    categorias: string[];
    lugaresDisponibles: string[];
    imagenes?: any[]; // Puedes definir un modelo específico para las imágenes si lo prefieres
    usuarioCreador?: {
      id: number;
      username: string;
    };
  }
  