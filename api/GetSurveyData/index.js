const cosmosClient = require('../cosmos').cosmosClient;

module.exports = async function (context, req) {

  var questionId = req.params.questionId;
  var cosmosContainer = cosmosClient.database("Demo").container("SurveyData");
  var query = "SELECT AVG(c.ResponseRating) as avgRating, c.Date FROM c WHERE c.QuestionId = " + "'" + questionId + "'" + " GROUP BY c.Date";

  const options = {
    maxItemCount: 1000,
    maxDegreeOfParallelism: 1,
    bufferItems: true
  };

  const { resources: documents } = await cosmosContainer.items
    .query(query, options)
    .fetchAll();

  // var documents = context.bindings.documents;
  // for (var i = 0; i < documents.length; i++) {
  //   var document = documents[i];
  //   context.res.body.
  //   // operate on each document
  // }

  context.res = {
    body: {
      documents
    }
  };
  context.done();

};

