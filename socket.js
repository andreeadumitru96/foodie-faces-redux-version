const socketIO = require('socket.io');

let Location = require('./server/models/location.model');

//instantiate socket io

module.exports.listen = function(app){
   const io = socketIO.listen(app)

    io.on('connection', function (socket) {

        socket.on('onUpdateSeatsEvent', (locationToUpdate) => {

            let searchedLocationId = {
                _id: locationToUpdate.locationId
            };


            Location.findOneAndUpdate(searchedLocationId, { $set: { availableSeats: locationToUpdate.availableSeats } }, { new: true }, function (err, updatedLocation) {
                if (err) {
                    console.log(err);
                } else {
                    io.sockets.emit('onSendUpdatedLocation', updatedLocation);
                }
            });
        });

        socket.on('disconnect', () => {
            console.log('user disconnected')
        });
    });
    return io
}
