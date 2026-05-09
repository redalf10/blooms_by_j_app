# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllFlowerSpecies*](#listallflowerspecies)
  - [*GetCurrentUserProfile*](#getcurrentuserprofile)
- [**Mutations**](#mutations)
  - [*CreateUserPost*](#createuserpost)
  - [*AddUserCollectionEntry*](#addusercollectionentry)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllFlowerSpecies
You can execute the `ListAllFlowerSpecies` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllFlowerSpecies(options?: ExecuteQueryOptions): QueryPromise<ListAllFlowerSpeciesData, undefined>;

interface ListAllFlowerSpeciesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllFlowerSpeciesData, undefined>;
}
export const listAllFlowerSpeciesRef: ListAllFlowerSpeciesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllFlowerSpecies(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllFlowerSpeciesData, undefined>;

interface ListAllFlowerSpeciesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllFlowerSpeciesData, undefined>;
}
export const listAllFlowerSpeciesRef: ListAllFlowerSpeciesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllFlowerSpeciesRef:
```typescript
const name = listAllFlowerSpeciesRef.operationName;
console.log(name);
```

### Variables
The `ListAllFlowerSpecies` query has no variables.
### Return Type
Recall that executing the `ListAllFlowerSpecies` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllFlowerSpeciesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllFlowerSpeciesData {
  flowerSpeciess: ({
    id: UUIDString;
    commonName: string;
    scientificName: string;
    bloomingSeason?: string | null;
    imageUrl?: string | null;
    description?: string | null;
  } & FlowerSpecies_Key)[];
}
```
### Using `ListAllFlowerSpecies`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllFlowerSpecies } from '@dataconnect/generated';


// Call the `listAllFlowerSpecies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllFlowerSpecies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllFlowerSpecies(dataConnect);

console.log(data.flowerSpeciess);

// Or, you can use the `Promise` API.
listAllFlowerSpecies().then((response) => {
  const data = response.data;
  console.log(data.flowerSpeciess);
});
```

### Using `ListAllFlowerSpecies`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllFlowerSpeciesRef } from '@dataconnect/generated';


// Call the `listAllFlowerSpeciesRef()` function to get a reference to the query.
const ref = listAllFlowerSpeciesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllFlowerSpeciesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.flowerSpeciess);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.flowerSpeciess);
});
```

## GetCurrentUserProfile
You can execute the `GetCurrentUserProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

interface GetCurrentUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserProfileData, undefined>;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

interface GetCurrentUserProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserProfileData, undefined>;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserProfileRef:
```typescript
const name = getCurrentUserProfileRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUserProfile` query has no variables.
### Return Type
Recall that executing the `GetCurrentUserProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserProfileData {
  user?: {
    id: UUIDString;
    username: string;
    email: string;
    displayName?: string | null;
    bio?: string | null;
    profilePictureUrl?: string | null;
    createdAt: TimestampString;
  } & User_Key;
}
```
### Using `GetCurrentUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserProfile } from '@dataconnect/generated';


// Call the `getCurrentUserProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUserProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUserProfile(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUserProfile().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUserProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserProfileRef } from '@dataconnect/generated';


// Call the `getCurrentUserProfileRef()` function to get a reference to the query.
const ref = getCurrentUserProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUserPost
You can execute the `CreateUserPost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUserPost(vars: CreateUserPostVariables): MutationPromise<CreateUserPostData, CreateUserPostVariables>;

interface CreateUserPostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserPostVariables): MutationRef<CreateUserPostData, CreateUserPostVariables>;
}
export const createUserPostRef: CreateUserPostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUserPost(dc: DataConnect, vars: CreateUserPostVariables): MutationPromise<CreateUserPostData, CreateUserPostVariables>;

interface CreateUserPostRef {
  ...
  (dc: DataConnect, vars: CreateUserPostVariables): MutationRef<CreateUserPostData, CreateUserPostVariables>;
}
export const createUserPostRef: CreateUserPostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserPostRef:
```typescript
const name = createUserPostRef.operationName;
console.log(name);
```

### Variables
The `CreateUserPost` mutation requires an argument of type `CreateUserPostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserPostVariables {
  imageUrl: string;
  caption?: string | null;
  location?: string | null;
  isIdentified?: boolean | null;
  identifiedSpeciesId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateUserPost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserPostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserPostData {
  post_insert: Post_Key;
}
```
### Using `CreateUserPost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUserPost, CreateUserPostVariables } from '@dataconnect/generated';

// The `CreateUserPost` mutation requires an argument of type `CreateUserPostVariables`:
const createUserPostVars: CreateUserPostVariables = {
  imageUrl: ..., 
  caption: ..., // optional
  location: ..., // optional
  isIdentified: ..., // optional
  identifiedSpeciesId: ..., // optional
};

// Call the `createUserPost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUserPost(createUserPostVars);
// Variables can be defined inline as well.
const { data } = await createUserPost({ imageUrl: ..., caption: ..., location: ..., isIdentified: ..., identifiedSpeciesId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUserPost(dataConnect, createUserPostVars);

console.log(data.post_insert);

// Or, you can use the `Promise` API.
createUserPost(createUserPostVars).then((response) => {
  const data = response.data;
  console.log(data.post_insert);
});
```

### Using `CreateUserPost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserPostRef, CreateUserPostVariables } from '@dataconnect/generated';

// The `CreateUserPost` mutation requires an argument of type `CreateUserPostVariables`:
const createUserPostVars: CreateUserPostVariables = {
  imageUrl: ..., 
  caption: ..., // optional
  location: ..., // optional
  isIdentified: ..., // optional
  identifiedSpeciesId: ..., // optional
};

// Call the `createUserPostRef()` function to get a reference to the mutation.
const ref = createUserPostRef(createUserPostVars);
// Variables can be defined inline as well.
const ref = createUserPostRef({ imageUrl: ..., caption: ..., location: ..., isIdentified: ..., identifiedSpeciesId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserPostRef(dataConnect, createUserPostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.post_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.post_insert);
});
```

## AddUserCollectionEntry
You can execute the `AddUserCollectionEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addUserCollectionEntry(vars: AddUserCollectionEntryVariables): MutationPromise<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;

interface AddUserCollectionEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddUserCollectionEntryVariables): MutationRef<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;
}
export const addUserCollectionEntryRef: AddUserCollectionEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addUserCollectionEntry(dc: DataConnect, vars: AddUserCollectionEntryVariables): MutationPromise<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;

interface AddUserCollectionEntryRef {
  ...
  (dc: DataConnect, vars: AddUserCollectionEntryVariables): MutationRef<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;
}
export const addUserCollectionEntryRef: AddUserCollectionEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addUserCollectionEntryRef:
```typescript
const name = addUserCollectionEntryRef.operationName;
console.log(name);
```

### Variables
The `AddUserCollectionEntry` mutation requires an argument of type `AddUserCollectionEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddUserCollectionEntryVariables {
  dateFound: DateString;
  acquisitionType: string;
  notes?: string | null;
  locationFound?: string | null;
  photoUrl?: string | null;
  flowerSpeciesId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `AddUserCollectionEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddUserCollectionEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddUserCollectionEntryData {
  collectionEntry_insert: CollectionEntry_Key;
}
```
### Using `AddUserCollectionEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addUserCollectionEntry, AddUserCollectionEntryVariables } from '@dataconnect/generated';

// The `AddUserCollectionEntry` mutation requires an argument of type `AddUserCollectionEntryVariables`:
const addUserCollectionEntryVars: AddUserCollectionEntryVariables = {
  dateFound: ..., 
  acquisitionType: ..., 
  notes: ..., // optional
  locationFound: ..., // optional
  photoUrl: ..., // optional
  flowerSpeciesId: ..., // optional
};

// Call the `addUserCollectionEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addUserCollectionEntry(addUserCollectionEntryVars);
// Variables can be defined inline as well.
const { data } = await addUserCollectionEntry({ dateFound: ..., acquisitionType: ..., notes: ..., locationFound: ..., photoUrl: ..., flowerSpeciesId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addUserCollectionEntry(dataConnect, addUserCollectionEntryVars);

console.log(data.collectionEntry_insert);

// Or, you can use the `Promise` API.
addUserCollectionEntry(addUserCollectionEntryVars).then((response) => {
  const data = response.data;
  console.log(data.collectionEntry_insert);
});
```

### Using `AddUserCollectionEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addUserCollectionEntryRef, AddUserCollectionEntryVariables } from '@dataconnect/generated';

// The `AddUserCollectionEntry` mutation requires an argument of type `AddUserCollectionEntryVariables`:
const addUserCollectionEntryVars: AddUserCollectionEntryVariables = {
  dateFound: ..., 
  acquisitionType: ..., 
  notes: ..., // optional
  locationFound: ..., // optional
  photoUrl: ..., // optional
  flowerSpeciesId: ..., // optional
};

// Call the `addUserCollectionEntryRef()` function to get a reference to the mutation.
const ref = addUserCollectionEntryRef(addUserCollectionEntryVars);
// Variables can be defined inline as well.
const ref = addUserCollectionEntryRef({ dateFound: ..., acquisitionType: ..., notes: ..., locationFound: ..., photoUrl: ..., flowerSpeciesId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addUserCollectionEntryRef(dataConnect, addUserCollectionEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.collectionEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionEntry_insert);
});
```

