type ClienteRequiredKeys = "id" | "listName" | "data";

interface Client {
  listName?: string;
  data?: Data[];
}

interface ClientWorkOrder extends Client {
  id: number,
}

interface Data {
    name: string,
    quantity: string,
}

export { ClienteRequiredKeys, Client, Data, ClientWorkOrder };
