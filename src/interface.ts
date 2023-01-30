type ClienteRequiredKeys = "listName" | "data";

type DataRequiredKeys = "name" | "quantity";

interface Client {
  listName?: string;
  data: Data[],
}

interface ClientWorkOrder extends Client {
  id: number;
}

interface Data {
  name: string;
  quantity: string;
}

export { ClienteRequiredKeys, Client, ClientWorkOrder, DataRequiredKeys, Data };
