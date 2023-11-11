import { tareas_tablero } from "./tareas_tablero";

export interface Lista {
    id: string;
    name: string;
    cards: tareas_tablero[];
}