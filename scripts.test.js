global.fetch = require("node-fetch");
const get_exchange_rates = require("./scripts");

test('Check if api returns a number', async () => {
    const data = await get_exchange_rates();
    expect(data).toEqual(expect.any(Number));
  });


