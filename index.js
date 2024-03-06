const express = require('express')
const uuid = require('uuid')
const door = 3000
const app = express()
app.use(express.json())


const orders = []


const checkOrderId = (request,response,next)=>{
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0 ) {
        return response.status(404).json({ message:"This order are not found."})
    }
    request.orderIndex=index
    request.orderId=id
    next()
   
}

const requests = (request, response, next) => {
    const method = request.route.methods
    const url = request.route.path
    console.log(method, url)

    next()
}


app.get('/orders', requests, (request,response)=>{

    return response.json(orders)
})

app.post('/orders', requests, (request, response)=>{
    const {order, clienteName,price} = request.body

    const newOrder = {id:uuid.v4(), order, clienteName:clienteName, price, status:"em preparacao"}

    orders.push(newOrder)

    return response.status(201).json(orders)
})

app.put('/orders/:id',checkOrderId, requests, (request,response)=>{
    const {order, clienteName, price} = request.body
    const index = request.userIndex
    const id = request.userId
    const status = "Em preparação"
    const updateOrders = {id, order, clienteName, price, status: "em preparacao"}


    orders[index]=updateOrders

    return response.json(updateOrders)


})

app.delete('/orders/:id', checkOrderId, requests, (request,response)=>{
    const index = request.userIndex
    orders.splice(index,1)

    return response.status(204).json()

})

app.get('/orders/:id',checkOrderId, requests,(request, response) =>{
    const index = request.userIndex

    const order = orders[index]

    return response.json(order)
})


app.patch("/order/:id", checkOrderId, requests, (request, response) => {
    const index = request.orderIndexIndex
    const { id, clienteName, order, price } = orders[index]
    let status = orders[index].status
    status = "Pedido pronto"
    const finishedOrder = { id, order, clienteName, price, status }
    orders[index] = finishedOrder

    return response.json(finishedOrder)
})



app.listen(door,()=>{
    console.log(`Server started on port ${door} 🍔`)
})