exports.handler = async (event, context) => {
  const res = {
    value: Math.floor(Math.random() * 4000) + 6000,
  };

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
