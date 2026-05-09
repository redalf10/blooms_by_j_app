# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listAllFlowerSpecies, getCurrentUserProfile, createUserPost, addUserCollectionEntry } from '@dataconnect/generated';


// Operation ListAllFlowerSpecies: 
const { data } = await ListAllFlowerSpecies(dataConnect);

// Operation GetCurrentUserProfile: 
const { data } = await GetCurrentUserProfile(dataConnect);

// Operation CreateUserPost:  For variables, look at type CreateUserPostVars in ../index.d.ts
const { data } = await CreateUserPost(dataConnect, createUserPostVars);

// Operation AddUserCollectionEntry:  For variables, look at type AddUserCollectionEntryVars in ../index.d.ts
const { data } = await AddUserCollectionEntry(dataConnect, addUserCollectionEntryVars);


```