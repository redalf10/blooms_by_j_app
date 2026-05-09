import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddUserCollectionEntryData {
  collectionEntry_insert: CollectionEntry_Key;
}

export interface AddUserCollectionEntryVariables {
  dateFound: DateString;
  acquisitionType: string;
  notes?: string | null;
  locationFound?: string | null;
  photoUrl?: string | null;
  flowerSpeciesId?: UUIDString | null;
}

export interface CollectionEntry_Key {
  id: UUIDString;
  __typename?: 'CollectionEntry_Key';
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateUserPostData {
  post_insert: Post_Key;
}

export interface CreateUserPostVariables {
  imageUrl: string;
  caption?: string | null;
  location?: string | null;
  isIdentified?: boolean | null;
  identifiedSpeciesId?: UUIDString | null;
}

export interface FlowerSpecies_Key {
  id: UUIDString;
  __typename?: 'FlowerSpecies_Key';
}

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

export interface Like_Key {
  userId: UUIDString;
  postId: UUIDString;
  __typename?: 'Like_Key';
}

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

export interface Post_Key {
  id: UUIDString;
  __typename?: 'Post_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllFlowerSpeciesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllFlowerSpeciesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllFlowerSpeciesData, undefined>;
  operationName: string;
}
export const listAllFlowerSpeciesRef: ListAllFlowerSpeciesRef;

export function listAllFlowerSpecies(options?: ExecuteQueryOptions): QueryPromise<ListAllFlowerSpeciesData, undefined>;
export function listAllFlowerSpecies(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllFlowerSpeciesData, undefined>;

interface GetCurrentUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserProfileData, undefined>;
  operationName: string;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;

export function getCurrentUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;
export function getCurrentUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

interface CreateUserPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserPostVariables): MutationRef<CreateUserPostData, CreateUserPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserPostVariables): MutationRef<CreateUserPostData, CreateUserPostVariables>;
  operationName: string;
}
export const createUserPostRef: CreateUserPostRef;

export function createUserPost(vars: CreateUserPostVariables): MutationPromise<CreateUserPostData, CreateUserPostVariables>;
export function createUserPost(dc: DataConnect, vars: CreateUserPostVariables): MutationPromise<CreateUserPostData, CreateUserPostVariables>;

interface AddUserCollectionEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddUserCollectionEntryVariables): MutationRef<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddUserCollectionEntryVariables): MutationRef<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;
  operationName: string;
}
export const addUserCollectionEntryRef: AddUserCollectionEntryRef;

export function addUserCollectionEntry(vars: AddUserCollectionEntryVariables): MutationPromise<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;
export function addUserCollectionEntry(dc: DataConnect, vars: AddUserCollectionEntryVariables): MutationPromise<AddUserCollectionEntryData, AddUserCollectionEntryVariables>;

