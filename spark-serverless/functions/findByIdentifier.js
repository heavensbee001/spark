const FaunaService = require("../src/faunaservice");
exports.handler = async (event, context) => {
  const service = new FaunaService("fnAE1HxwmSACTBm2_VB4ZzIasMaLO4hRj1KlyrWo");

  // let task = JSON.parse(event.body);

  const res = await service.getRecordByIndex(
    "sources_search_by_name",
    "this is a test"
  );

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(res),
  };
};
