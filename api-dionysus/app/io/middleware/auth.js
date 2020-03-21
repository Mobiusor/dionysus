'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx;

    const clientId = socket.id;
    const query = socket.handshake.query;

    console.log(clientId, '=>', query.token);

    // if (session[query.uid].token !== query.token) {
    //   socket.emit('res', '登录状态已改变，请重新登陆');
    //   socket.adapter.remoteDisconnect(clientId, true, err => {
    //     console.log(`${new Date()}\tKick { ${clientId} } out.`);
    //   });
    //   return;
    // }
    await next();
  };
};
