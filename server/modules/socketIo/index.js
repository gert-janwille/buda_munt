const {isEmpty} = require(`lodash`);

module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  let clients = [];


  io.on(`connection`, socket => {
    const {id: socketId} = socket;
    const handshakeData = socket.request;

    if (handshakeData._query[`account`] === undefined) return;
    const existing = clients.filter(c => c.account === handshakeData._query[`account`]);


    const client = {
      socketId,
      account: handshakeData._query[`account`]
    };
    if (isEmpty(existing)) clients.push(client);

    // socket.emit(`init`, clients);

    socket.on(`message`, data => {
      const to = JSON.parse(new Buffer(data.to, `base64`).toString(`ascii`));
      const toObj = clients.filter(c => c.account === to.account)[0];
      io.to(toObj.socketId).emit(`message`, data);
    });


    socket.on(`disconnect`, () => {
      clients = clients.filter(u => u.socketId !== socketId);
      socket.broadcast.emit(`leave`, socketId);
    });

  });

  next();

};

module.exports.register.attributes = {
  name: `yo`,
  version: `0.1.0`
};
