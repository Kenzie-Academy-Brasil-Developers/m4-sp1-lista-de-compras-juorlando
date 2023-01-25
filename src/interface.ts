type ClienteRequiredKeys = "id" | "listName" | "data";

interface Client {
  id: number;
  listName: string;
  data: Data;
}

interface Data {
    name: string,
    quantity: string,
}

export { ClienteRequiredKeys, Client, Data };
