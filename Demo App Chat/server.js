// adapted from: https://files3.lynda.com/secure/courses/612195/exercises/Ex_Files_Learning_Node.zip?KqI382IWLJGyWZbU1I8C5X-noyP55RCnvvAA1jWJpnNkwJtEFIMV2jxG0gVxzXMCQbwGu_Ez3dIXcugnl3My3yI-NrdtZvMU5ucEKTgUpsaqmdIEaGa8rtT3CdUEHih6qbG-QgDDGUGDGF17QUXOjAKeAz8_qFs99A
var express = require('express')
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise;

var dbURL = 'mongodb+srv://user:user@cluster0.gzfa4.mongodb.net/Cluster0?retryWrites=true&w=majority';

var Message = mongoose.model('Message', {
    name: String,
    message: String
})


app.get('/messages', (req, res) =>{
    Message.find({}, (err, messages) =>
    {
        res.send(messages);
    })
})

app.post('/messages', async (req, res) => {

try {

    var message = new Message(req.body)
    var savedMessage = await message.save();
    console.log('saved');
    var censored = await Message.findOne({message: 'badword'})
    if(censored) {
        await Message.remove({_id: censored.id});
    }
    else {
        io.emit('message', req.body);
    }

    res.sendStatus(200);

} catch (error){
        res.sendStatus(500)
        return console.error(error)
} finally {
    //logger.log("message post called")

}

})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbURL, { useUnifiedTopology: true }, (err) => {
    console.log("mongo db connection", err);
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})