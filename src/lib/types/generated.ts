import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ClimbingRoute = {
  __typename?: 'ClimbingRoute';
  alongTrail: Scalars['String']['output'];
  completedBy: Array<Person>;
  difficulty: VScale;
  routeName: Scalars['String']['output'];
};

export enum DificultyRanking {
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Hard = 'HARD',
  Intermediate = 'INTERMEDIATE'
}

export type HikingTrail = {
  __typename?: 'HikingTrail';
  climbAverageDifficulty?: Maybe<VScale>;
  climbingRoutes?: Maybe<Array<Maybe<ClimbingRoute>>>;
  difficulty: DificultyRanking;
  distance: Scalars['Float']['output'];
  elevation: Scalars['Float']['output'];
  parking?: Maybe<Scalars['Boolean']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  trailName?: Maybe<Scalars['String']['output']>;
};

export type Person = {
  __typename?: 'Person';
  age: Scalars['Int']['output'];
  job?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getClimbsByHikingTrail?: Maybe<Array<Maybe<ClimbingRoute>>>;
  getHikingTrailByDifficulty?: Maybe<Array<HikingTrail>>;
  getHikingTrailByName?: Maybe<HikingTrail>;
  getHikingTrailsByRating?: Maybe<Array<HikingTrail>>;
  getPeopleByClimb?: Maybe<Array<Maybe<Person>>>;
};


export type QueryGetClimbsByHikingTrailArgs = {
  trailName: Scalars['String']['input'];
};


export type QueryGetHikingTrailByDifficultyArgs = {
  difficulty: DificultyRanking;
};


export type QueryGetHikingTrailByNameArgs = {
  trailName: Scalars['String']['input'];
};


export type QueryGetHikingTrailsByRatingArgs = {
  rating: Scalars['Int']['input'];
};


export type QueryGetPeopleByClimbArgs = {
  routeName: Scalars['String']['input'];
};

export enum VScale {
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3',
  V4 = 'V4',
  V5 = 'V5',
  V6 = 'V6',
  V7 = 'V7',
  V8 = 'V8',
  V9 = 'V9',
  V10 = 'V10'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ClimbingRoute: ResolverTypeWrapper<ClimbingRoute>;
  DificultyRanking: DificultyRanking;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  HikingTrail: ResolverTypeWrapper<HikingTrail>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Person: ResolverTypeWrapper<Person>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  VScale: VScale;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ClimbingRoute: ClimbingRoute;
  Float: Scalars['Float']['output'];
  HikingTrail: HikingTrail;
  Int: Scalars['Int']['output'];
  Person: Person;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type ClimbingRouteResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClimbingRoute'] = ResolversParentTypes['ClimbingRoute']> = {
  alongTrail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completedBy?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['VScale'], ParentType, ContextType>;
  routeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type HikingTrailResolvers<ContextType = any, ParentType extends ResolversParentTypes['HikingTrail'] = ResolversParentTypes['HikingTrail']> = {
  climbAverageDifficulty?: Resolver<Maybe<ResolversTypes['VScale']>, ParentType, ContextType>;
  climbingRoutes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClimbingRoute']>>>, ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['DificultyRanking'], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elevation?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  parking?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  trailName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getClimbsByHikingTrail?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClimbingRoute']>>>, ParentType, ContextType, RequireFields<QueryGetClimbsByHikingTrailArgs, 'trailName'>>;
  getHikingTrailByDifficulty?: Resolver<Maybe<Array<ResolversTypes['HikingTrail']>>, ParentType, ContextType, RequireFields<QueryGetHikingTrailByDifficultyArgs, 'difficulty'>>;
  getHikingTrailByName?: Resolver<Maybe<ResolversTypes['HikingTrail']>, ParentType, ContextType, RequireFields<QueryGetHikingTrailByNameArgs, 'trailName'>>;
  getHikingTrailsByRating?: Resolver<Maybe<Array<ResolversTypes['HikingTrail']>>, ParentType, ContextType, RequireFields<QueryGetHikingTrailsByRatingArgs, 'rating'>>;
  getPeopleByClimb?: Resolver<Maybe<Array<Maybe<ResolversTypes['Person']>>>, ParentType, ContextType, RequireFields<QueryGetPeopleByClimbArgs, 'routeName'>>;
};

export type Resolvers<ContextType = any> = {
  ClimbingRoute?: ClimbingRouteResolvers<ContextType>;
  HikingTrail?: HikingTrailResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

