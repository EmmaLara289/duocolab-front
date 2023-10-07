import { Modal } from "./modal";

@Component({
  // ...
})
export class ComponentA {
  constructor(private modalService: Modal) {}

  openModal() {
    // Lógica para abrir el modal
    // ...

    // Cuando quieras cerrar el modal, llama al método close del servicio
    this.modalService.close();
  }
}
