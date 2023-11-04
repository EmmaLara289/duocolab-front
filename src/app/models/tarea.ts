export class Tarea {

    constructor(
       
       	public id_tarea,
        public nombre: string,
        public descripcion: string,
        public key_epica: any,
        public key_sprint: any,
        public key_proyecto: any,
        public key_colaborador: any,
        public key_area: any,
        public key_tarea_status: any,
    ) { }

}