const cosmosClient = require('./cosmos').cosmosClient;

module.exports = async function (context, req) {

  const questionId = req.params.questionId;
  const cosmosContainer = cosmosClient.database("Demo").container("SurveyData");

  const query = {
    query: "SELECT AVG(c.ResponseRating) as avgRating, c.Date FROM c WHERE c.QuestionId = @questionId GROUP BY c.Date",
    parameters: [
      {
        name: "@questionId",
        value: questionId
      }

    ]
  };

  const options = {
    maxItemCount: 1000,
    maxDegreeOfParallelism: 1,
    bufferItems: true
  };

  const { resources: documents } = await cosmosContainer.items
    .query(query, options)
    .fetchAll();

  context.res = {
    body: {
      documents
    }
  };
  context.done();

};

