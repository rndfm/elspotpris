var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var apiRouter = require("./routes/api");

const ipApi = require("./integrations/ipapi");

var app = express();
app.use(cors());

const http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: [
      "https://elspotpris.dk",
      "http://elspotpris.dk",
      "http://localhost",
      "http://127.0.0.1:4000",
      "http://localhost:4000",
      "http://127.0.0.1:4173"
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  io.emit("users", io.engine.clientsCount);
  console.log("A user connected");
  console.log(io.engine.clientsCount);
  io.emit("prices", prices);
  io.emit("co2emis", co2emis);
  io.emit("co2emisprog", co2emisprog);

  socket.on("region", function () {
    // https://stackoverflow.com/questions/11182980/not-getting-remote-address-while-using-proxy-in-socket-io/11187053#11187053
    const remoteIp =
      socket.handshake.headers["x-forwarded-for"] ||
      socket.request.connection.remoteAddress;
    ipApi
      .getRegion(remoteIp)
      .then((region) => socket.emit("region", region))
      .catch((err) => console.error(err));
  });

  socket.on("disconnect", function () {
    io.emit("users", io.engine.clientsCount);
    console.log("A user disconnected");
    console.log(io.engine.clientsCount);
  });
});

app.set("port", process.env.PORT || 3000);

http.listen(3000, () => {
  console.log("listening on *:3000");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/public")));

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var energidataservice = require("./integrations/energidataservice.js");
var nordpool = require("./integrations/nordpool.js");

var prices, pricesDate, co2emisprog, co2emis;

async function update() {
  // update prices.
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var tomorrow = today.addDays(1);
  if (
    pricesDate == null ||
    (pricesDate < tomorrow && new Date().getHours() >= 12) ||
    pricesDate < today
  ) {
    console.log(`Prices stale. Getting prices for ${tomorrow}`);
    await nordpool.getPrices().then((data) => {
      if (data) {
        console.log(`Got prices for ${data.lastDate}`);
        prices = data.prices;
        pricesDate = data.lastDate;
      }
    });
  }

  io.emit("prices", prices);

  // update co2 emis.
  energidataservice.getCo2Emis().then((data) => {
    if (data) {
      co2emis = JSON.parse(data).records;
      co2emis = co2emis.filter(
        (o) => new Date(o.Minutes5UTC).getUTCMinutes() % 30 == 0
      );
      io.emit("co2emis", co2emis);
    }
  });

  energidataservice.getCo2EmisPrognosis().then((data) => {
    if (data) {
      co2emisprog = JSON.parse(data).records;
      co2emisprog = co2emisprog.filter(
        (o) => new Date(o.Minutes5UTC).getUTCMinutes() == 0
      );
      io.emit("co2emisprog", co2emisprog);
    }
  });
}

update();
setInterval(update, 300000);
module.exports = app;
