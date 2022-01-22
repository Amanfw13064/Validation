const app=require('./app')

const connect=require('./config/db')

app.listen(5555,async()=>{
    await connect()
    console.log('listening port 5555')
})