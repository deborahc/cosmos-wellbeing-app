const CosmosClient = require("@azure/cosmos").CosmosClient;
const { ManagedIdentityCredential } = require("@azure/identity");

const endpoint = process.env['CosmosEndPointUrl'];
const key = process.env['CosmosAuthKey'];

module.exports.cosmosClient = new CosmosClient({
    endpoint, 
    key
//    aadCredentials: new ManagedIdentityCredential('734adba9-79fb-4ecd-a515-cf385f96bb4b')
});
