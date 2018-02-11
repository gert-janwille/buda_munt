const {isEmpty} = require(`lodash`);

module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  let clients = [];


  io.on(`connection`, socket => {
    const {id: socketId} = socket;
    const handshakeData = socket.request;

    const qr = JSON.parse(new Buffer(handshakeData._query[`account`], `base64`).toString(`ascii`));
    const {account} = qr;

    if (account === undefined) return;
    const existing = clients.filter(c => c.account === account);


    const client = {
      socketId,
      account: account
    };
    if (isEmpty(existing)) clients.push(client);


    // socket.emit(`init`, clients);

    socket.on(`message`, data => {
      console.log(data);
      const toObj = clients.filter(c => c.account === data.to)[0];
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
