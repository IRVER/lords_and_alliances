export interface Event {
    id: number;
    title: string;
    description: string;
    options: Option[];
    conditions?: Record<string, any>; // Condiciones opcionales para mostrar el evento
  }
  
  export interface Option {
    text: string;
    consequences: Record<string, number>;
  }
  