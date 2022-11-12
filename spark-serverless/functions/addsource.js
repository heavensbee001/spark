const FaunaService = require("../src/faunaservice");
exports.handler = async (event, context) => {
  const service = new FaunaService("fnAE1HxwmSACTBm2_VB4ZzIasMaLO4hRj1KlyrWo");

  let task = JSON.parse(event.body);

  await service.createRecord("Sources", task);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  };
};
