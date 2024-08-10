

export interface Notificacion{
    idNotificacion: string;
    tipo: string;
    mensaje: string;
    fecha: string;
    hora: string;
    fechaActual: string;
}

export interface NotificacionCrear{
    tipo: string;
    mensaje: string;
}

export interface NotificacionActualizar{
    tipo?: string;
    mensaje?: string;
    fecha?: string;
    hora?: string;
    fechaActual?: string;
}