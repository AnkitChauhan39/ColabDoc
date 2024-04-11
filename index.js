const document = require("./model/document")
const dbConnect = require("./configs/database")
const mongoose = require("mongoose")
dbConnect();

const PORT = process.env.PORT || 5000

const io = require("socket.io")(PORT, {
    cors: {
        // origin: "http://localhost:3000",
        // methods: ["GET","POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("get-document", async documentId => {
        const data = await GetDocs(documentId)
        socket.join(documentId)
        socket.emit("load-document", data.data)

        socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on("save-document", async (data) => {
            await document.findByIdAndUpdate(documentId,{data})
        })
    })
})


const GetDocs = async (id) => {
    if (id == null) return
    const data = await document.findById(id)
    if (data) {
        return data
    }
    const newdata = await document.create({ _id: id })
    return newdata
}





