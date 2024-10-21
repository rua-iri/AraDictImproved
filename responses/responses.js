class Response200 {
  constructor(data) {
    this.status = "success";
    this.data = data;
  }
}

class Response404 {
  constructor(message) {
    this.status = "error";
    this.message = message;
  }
}

class Response500 {
  constructor() {
    this.status = "error";
    this.message = "Internal Server Error";
  }
}

module.exports = {
  Response200,
  Response404,
  Response500,
};
