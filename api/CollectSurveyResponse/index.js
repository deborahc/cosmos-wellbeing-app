const cosmosClient = require('./cosmos').cosmosClient;

module.exports = async function (context, req) {
    const database = cosmosClient.database('Demo');
    const container = database.container('SurveyData');
    const { resource: createdItem } = await container.items.create(req.body);

    context.res = {
        body: createdItem.id
    };
}