import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

interface IWorkOrderRequest {
    description: string
    mechanical: string
    client: string
    price: number
}

interface IWorkOrder extends IWorkOrderRequest {
    start_date: Date
    end_date: Date
    id: number
}

const orders: Array<IWorkOrder> = []
const ids: Array<number> = []

app.post('/work-order', (request: Request, response: Response) => {

    const orderData: IWorkOrderRequest = request.body

    const id:number = Math.floor(Math.random()*1000)

    const idExists = ids.find(el => el === id)

    if(idExists){
        return response.status(409).json({
            message: "id exists, try again"
        })
    }

    const newOrderData: IWorkOrder = {
        id: id,
        start_date: new Date(),
        end_date: new Date(Date.now() + 86400 * 1000),
        ...orderData
    }

    ids.push(id)
    orders.push(newOrderData)
    
    return response.status(201).json(newOrderData)
})

app.get('/work-order', (request: Request, response: Response) => {
    return response.json(orders)
})

app.listen(3000, () => {
    console.log('Server is running!')
})