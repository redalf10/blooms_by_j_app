const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'bloomsbyjapp',
  location: 'us-south1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const listAllFlowerSpeciesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllFlowerSpecies');
}
listAllFlowerSpeciesRef.operationName = 'ListAllFlowerSpecies';
exports.listAllFlowerSpeciesRef = listAllFlowerSpeciesRef;

exports.listAllFlowerSpecies = function listAllFlowerSpecies(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllFlowerSpeciesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCurrentUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserProfile');
}
getCurrentUserProfileRef.operationName = 'GetCurrentUserProfile';
exports.getCurrentUserProfileRef = getCurrentUserProfileRef;

exports.getCurrentUserProfile = function getCurrentUserProfile(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserProfileRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createUserPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUserPost', inputVars);
}
createUserPostRef.operationName = 'CreateUserPost';
exports.createUserPostRef = createUserPostRef;

exports.createUserPost = function createUserPost(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserPostRef(dcInstance, inputVars));
}
;

const addUserCollectionEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddUserCollectionEntry', inputVars);
}
addUserCollectionEntryRef.operationName = 'AddUserCollectionEntry';
exports.addUserCollectionEntryRef = addUserCollectionEntryRef;

exports.addUserCollectionEntry = function addUserCollectionEntry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addUserCollectionEntryRef(dcInstance, inputVars));
}
;
