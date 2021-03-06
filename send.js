// require the library
var amqp = require("amqplib/callback_api");

// connect to RabbitMQ server
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  // create a channel
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    // declare a queue
    var queue = "hello";
    var msg = "Hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);

});
