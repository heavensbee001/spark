const FaunaService = require("../src/faunaservice");
exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    const CORS_HEADERS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    };
  }

  const service = new FaunaService("fnAE1HxwmSACTBm2_VB4ZzIasMaLO4hRj1KlyrWo");

  let task = JSON.parse(event.body);

  await service.createRecord("Sources", task);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sourceID: task.sourceID }),
  };
};
