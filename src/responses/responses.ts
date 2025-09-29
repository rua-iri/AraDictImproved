import type { QueryResult } from "mysql2";

interface AraDictResponse {
  status: string;
  data: string | object | Array<object> | QueryResult;
}

class Response200 implements AraDictResponse {
  status;
  data;

  constructor(data: string | object | Array<object> | QueryResult) {
    this.status = "success";
    this.data = data;
  }
}

class Response404 implements AraDictResponse {
  status;
  data;

  constructor(data: string) {
    this.status = "error";
    this.data = data;
  }
}

class Response500 implements AraDictResponse {
  status;
  data;

  constructor() {
    this.status = "error";
    this.data = "Internal Server Error";
  }
}

export { Response200, Response404, Response500 };
