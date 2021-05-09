const CosmosClient = require("@azure/cosmos").CosmosClient;

const connectionString = process.env.COSMOS_CONNECTION_STRING;
module.exports.cosmosClient = new CosmosClient(connectionString);