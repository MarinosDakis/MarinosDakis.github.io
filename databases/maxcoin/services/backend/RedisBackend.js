/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const Redis = require("ioredis");

const CoinAPI = require('../CoinAPI');

class RedisBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
  }

  async connect() {
  this.client = new Redis(7379);
  return this.client;
  }

  async disconnect() {
  return this.client.disconnect();
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const values = [];
    Object.entries(data.bpi).forEach((entries) => {
      values.push(entries[1]);
      values.push(entries[0]);
    });
    return this.client.zadd('maxcoin:values', values);
  }

  async getMax() {
  return this.client.zrange('maxcoin:values', -1, -1, `WITHSCORES`)
  }

  async max() {
    console.info("connection to Redis");
    console.time("Redis-connect");
    const client = this.connect();
    if(client){
      console.info("successfully connected to Redis");
    } else {
      throw new Error("connect to mongo had failed");
    }
    console.timeEnd("Redis-connect");

    console.info("inserting into Redis");
    console.time("Redis-insert");
    const insertResult = await this.insert();
    console.timeEnd("Redis-insert");

    console.info(`Inserted ${insertResult} documents into MongoDB`);

    console.info("Querying Redis");
    console.time("Redis-find");
    const result = await this.getMax();
    console.timeEnd("Redis-find");


    console.info("Disconnecting from Redis");
    console.time("Redis-disconnect");
    await this.disconnect();
    console.timeEnd("Redis-disconnect");
    return result;
  }
}

module.exports = RedisBackend;