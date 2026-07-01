
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Parable
 * 
 */
export type Parable = $Result.DefaultSelection<Prisma.$ParablePayload>
/**
 * Model Quote
 * 
 */
export type Quote = $Result.DefaultSelection<Prisma.$QuotePayload>
/**
 * Model DailyDigest
 * 
 */
export type DailyDigest = $Result.DefaultSelection<Prisma.$DailyDigestPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model DailyParable
 * 
 */
export type DailyParable = $Result.DefaultSelection<Prisma.$DailyParablePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model EmailSubscriber
 * 
 */
export type EmailSubscriber = $Result.DefaultSelection<Prisma.$EmailSubscriberPayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model TelegramSubscriber
 * 
 */
export type TelegramSubscriber = $Result.DefaultSelection<Prisma.$TelegramSubscriberPayload>
/**
 * Model SituationRequest
 * 
 */
export type SituationRequest = $Result.DefaultSelection<Prisma.$SituationRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Parables
 * const parables = await prisma.parable.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Parables
   * const parables = await prisma.parable.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.parable`: Exposes CRUD operations for the **Parable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parables
    * const parables = await prisma.parable.findMany()
    * ```
    */
  get parable(): Prisma.ParableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quote`: Exposes CRUD operations for the **Quote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quotes
    * const quotes = await prisma.quote.findMany()
    * ```
    */
  get quote(): Prisma.QuoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyDigest`: Exposes CRUD operations for the **DailyDigest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyDigests
    * const dailyDigests = await prisma.dailyDigest.findMany()
    * ```
    */
  get dailyDigest(): Prisma.DailyDigestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyParable`: Exposes CRUD operations for the **DailyParable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyParables
    * const dailyParables = await prisma.dailyParable.findMany()
    * ```
    */
  get dailyParable(): Prisma.DailyParableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailSubscriber`: Exposes CRUD operations for the **EmailSubscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailSubscribers
    * const emailSubscribers = await prisma.emailSubscriber.findMany()
    * ```
    */
  get emailSubscriber(): Prisma.EmailSubscriberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.telegramSubscriber`: Exposes CRUD operations for the **TelegramSubscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TelegramSubscribers
    * const telegramSubscribers = await prisma.telegramSubscriber.findMany()
    * ```
    */
  get telegramSubscriber(): Prisma.TelegramSubscriberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.situationRequest`: Exposes CRUD operations for the **SituationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SituationRequests
    * const situationRequests = await prisma.situationRequest.findMany()
    * ```
    */
  get situationRequest(): Prisma.SituationRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Parable: 'Parable',
    Quote: 'Quote',
    DailyDigest: 'DailyDigest',
    Category: 'Category',
    DailyParable: 'DailyParable',
    User: 'User',
    Subscription: 'Subscription',
    EmailSubscriber: 'EmailSubscriber',
    Favorite: 'Favorite',
    TelegramSubscriber: 'TelegramSubscriber',
    SituationRequest: 'SituationRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "parable" | "quote" | "dailyDigest" | "category" | "dailyParable" | "user" | "subscription" | "emailSubscriber" | "favorite" | "telegramSubscriber" | "situationRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Parable: {
        payload: Prisma.$ParablePayload<ExtArgs>
        fields: Prisma.ParableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>
          }
          findFirst: {
            args: Prisma.ParableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>
          }
          findMany: {
            args: Prisma.ParableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>[]
          }
          create: {
            args: Prisma.ParableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>
          }
          createMany: {
            args: Prisma.ParableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>[]
          }
          delete: {
            args: Prisma.ParableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>
          }
          update: {
            args: Prisma.ParableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>
          }
          deleteMany: {
            args: Prisma.ParableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>[]
          }
          upsert: {
            args: Prisma.ParableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParablePayload>
          }
          aggregate: {
            args: Prisma.ParableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParable>
          }
          groupBy: {
            args: Prisma.ParableGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParableGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParableCountArgs<ExtArgs>
            result: $Utils.Optional<ParableCountAggregateOutputType> | number
          }
        }
      }
      Quote: {
        payload: Prisma.$QuotePayload<ExtArgs>
        fields: Prisma.QuoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          findFirst: {
            args: Prisma.QuoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          findMany: {
            args: Prisma.QuoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          create: {
            args: Prisma.QuoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          createMany: {
            args: Prisma.QuoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          delete: {
            args: Prisma.QuoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          update: {
            args: Prisma.QuoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          deleteMany: {
            args: Prisma.QuoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          upsert: {
            args: Prisma.QuoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          aggregate: {
            args: Prisma.QuoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuote>
          }
          groupBy: {
            args: Prisma.QuoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuoteCountArgs<ExtArgs>
            result: $Utils.Optional<QuoteCountAggregateOutputType> | number
          }
        }
      }
      DailyDigest: {
        payload: Prisma.$DailyDigestPayload<ExtArgs>
        fields: Prisma.DailyDigestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyDigestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyDigestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>
          }
          findFirst: {
            args: Prisma.DailyDigestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyDigestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>
          }
          findMany: {
            args: Prisma.DailyDigestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>[]
          }
          create: {
            args: Prisma.DailyDigestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>
          }
          createMany: {
            args: Prisma.DailyDigestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyDigestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>[]
          }
          delete: {
            args: Prisma.DailyDigestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>
          }
          update: {
            args: Prisma.DailyDigestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>
          }
          deleteMany: {
            args: Prisma.DailyDigestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyDigestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyDigestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>[]
          }
          upsert: {
            args: Prisma.DailyDigestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDigestPayload>
          }
          aggregate: {
            args: Prisma.DailyDigestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyDigest>
          }
          groupBy: {
            args: Prisma.DailyDigestGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyDigestGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyDigestCountArgs<ExtArgs>
            result: $Utils.Optional<DailyDigestCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      DailyParable: {
        payload: Prisma.$DailyParablePayload<ExtArgs>
        fields: Prisma.DailyParableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyParableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyParableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>
          }
          findFirst: {
            args: Prisma.DailyParableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyParableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>
          }
          findMany: {
            args: Prisma.DailyParableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>[]
          }
          create: {
            args: Prisma.DailyParableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>
          }
          createMany: {
            args: Prisma.DailyParableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyParableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>[]
          }
          delete: {
            args: Prisma.DailyParableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>
          }
          update: {
            args: Prisma.DailyParableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>
          }
          deleteMany: {
            args: Prisma.DailyParableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyParableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyParableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>[]
          }
          upsert: {
            args: Prisma.DailyParableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyParablePayload>
          }
          aggregate: {
            args: Prisma.DailyParableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyParable>
          }
          groupBy: {
            args: Prisma.DailyParableGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyParableGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyParableCountArgs<ExtArgs>
            result: $Utils.Optional<DailyParableCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      EmailSubscriber: {
        payload: Prisma.$EmailSubscriberPayload<ExtArgs>
        fields: Prisma.EmailSubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailSubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailSubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>
          }
          findFirst: {
            args: Prisma.EmailSubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailSubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>
          }
          findMany: {
            args: Prisma.EmailSubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>[]
          }
          create: {
            args: Prisma.EmailSubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>
          }
          createMany: {
            args: Prisma.EmailSubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailSubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>[]
          }
          delete: {
            args: Prisma.EmailSubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>
          }
          update: {
            args: Prisma.EmailSubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>
          }
          deleteMany: {
            args: Prisma.EmailSubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailSubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailSubscriberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>[]
          }
          upsert: {
            args: Prisma.EmailSubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriberPayload>
          }
          aggregate: {
            args: Prisma.EmailSubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailSubscriber>
          }
          groupBy: {
            args: Prisma.EmailSubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailSubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailSubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<EmailSubscriberCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      TelegramSubscriber: {
        payload: Prisma.$TelegramSubscriberPayload<ExtArgs>
        fields: Prisma.TelegramSubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TelegramSubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TelegramSubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>
          }
          findFirst: {
            args: Prisma.TelegramSubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TelegramSubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>
          }
          findMany: {
            args: Prisma.TelegramSubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>[]
          }
          create: {
            args: Prisma.TelegramSubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>
          }
          createMany: {
            args: Prisma.TelegramSubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TelegramSubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>[]
          }
          delete: {
            args: Prisma.TelegramSubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>
          }
          update: {
            args: Prisma.TelegramSubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>
          }
          deleteMany: {
            args: Prisma.TelegramSubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TelegramSubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TelegramSubscriberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>[]
          }
          upsert: {
            args: Prisma.TelegramSubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSubscriberPayload>
          }
          aggregate: {
            args: Prisma.TelegramSubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTelegramSubscriber>
          }
          groupBy: {
            args: Prisma.TelegramSubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TelegramSubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TelegramSubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<TelegramSubscriberCountAggregateOutputType> | number
          }
        }
      }
      SituationRequest: {
        payload: Prisma.$SituationRequestPayload<ExtArgs>
        fields: Prisma.SituationRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SituationRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SituationRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>
          }
          findFirst: {
            args: Prisma.SituationRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SituationRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>
          }
          findMany: {
            args: Prisma.SituationRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>[]
          }
          create: {
            args: Prisma.SituationRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>
          }
          createMany: {
            args: Prisma.SituationRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SituationRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>[]
          }
          delete: {
            args: Prisma.SituationRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>
          }
          update: {
            args: Prisma.SituationRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>
          }
          deleteMany: {
            args: Prisma.SituationRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SituationRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SituationRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>[]
          }
          upsert: {
            args: Prisma.SituationRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SituationRequestPayload>
          }
          aggregate: {
            args: Prisma.SituationRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSituationRequest>
          }
          groupBy: {
            args: Prisma.SituationRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SituationRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.SituationRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SituationRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    parable?: ParableOmit
    quote?: QuoteOmit
    dailyDigest?: DailyDigestOmit
    category?: CategoryOmit
    dailyParable?: DailyParableOmit
    user?: UserOmit
    subscription?: SubscriptionOmit
    emailSubscriber?: EmailSubscriberOmit
    favorite?: FavoriteOmit
    telegramSubscriber?: TelegramSubscriberOmit
    situationRequest?: SituationRequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ParableCountOutputType
   */

  export type ParableCountOutputType = {
    dailies: number
    digests: number
    favorites: number
  }

  export type ParableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailies?: boolean | ParableCountOutputTypeCountDailiesArgs
    digests?: boolean | ParableCountOutputTypeCountDigestsArgs
    favorites?: boolean | ParableCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes
  /**
   * ParableCountOutputType without action
   */
  export type ParableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParableCountOutputType
     */
    select?: ParableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParableCountOutputType without action
   */
  export type ParableCountOutputTypeCountDailiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyParableWhereInput
  }

  /**
   * ParableCountOutputType without action
   */
  export type ParableCountOutputTypeCountDigestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyDigestWhereInput
  }

  /**
   * ParableCountOutputType without action
   */
  export type ParableCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }


  /**
   * Count Type QuoteCountOutputType
   */

  export type QuoteCountOutputType = {
    digests: number
  }

  export type QuoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    digests?: boolean | QuoteCountOutputTypeCountDigestsArgs
  }

  // Custom InputTypes
  /**
   * QuoteCountOutputType without action
   */
  export type QuoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteCountOutputType
     */
    select?: QuoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuoteCountOutputType without action
   */
  export type QuoteCountOutputTypeCountDigestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyDigestWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    parables: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parables?: boolean | CategoryCountOutputTypeCountParablesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountParablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParableWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    favorites: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Parable
   */

  export type AggregateParable = {
    _count: ParableCountAggregateOutputType | null
    _avg: ParableAvgAggregateOutputType | null
    _sum: ParableSumAggregateOutputType | null
    _min: ParableMinAggregateOutputType | null
    _max: ParableMaxAggregateOutputType | null
  }

  export type ParableAvgAggregateOutputType = {
    readTime: number | null
  }

  export type ParableSumAggregateOutputType = {
    readTime: number | null
  }

  export type ParableMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    moral: string | null
    titleRu: string | null
    contentRu: string | null
    moralRu: string | null
    source: string | null
    readTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
  }

  export type ParableMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    moral: string | null
    titleRu: string | null
    contentRu: string | null
    moralRu: string | null
    source: string | null
    readTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
  }

  export type ParableCountAggregateOutputType = {
    id: number
    title: number
    content: number
    moral: number
    titleRu: number
    contentRu: number
    moralRu: number
    source: number
    readTime: number
    createdAt: number
    updatedAt: number
    categoryId: number
    _all: number
  }


  export type ParableAvgAggregateInputType = {
    readTime?: true
  }

  export type ParableSumAggregateInputType = {
    readTime?: true
  }

  export type ParableMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    moral?: true
    titleRu?: true
    contentRu?: true
    moralRu?: true
    source?: true
    readTime?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
  }

  export type ParableMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    moral?: true
    titleRu?: true
    contentRu?: true
    moralRu?: true
    source?: true
    readTime?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
  }

  export type ParableCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    moral?: true
    titleRu?: true
    contentRu?: true
    moralRu?: true
    source?: true
    readTime?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    _all?: true
  }

  export type ParableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parable to aggregate.
     */
    where?: ParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parables to fetch.
     */
    orderBy?: ParableOrderByWithRelationInput | ParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parables
    **/
    _count?: true | ParableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParableMaxAggregateInputType
  }

  export type GetParableAggregateType<T extends ParableAggregateArgs> = {
        [P in keyof T & keyof AggregateParable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParable[P]>
      : GetScalarType<T[P], AggregateParable[P]>
  }




  export type ParableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParableWhereInput
    orderBy?: ParableOrderByWithAggregationInput | ParableOrderByWithAggregationInput[]
    by: ParableScalarFieldEnum[] | ParableScalarFieldEnum
    having?: ParableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParableCountAggregateInputType | true
    _avg?: ParableAvgAggregateInputType
    _sum?: ParableSumAggregateInputType
    _min?: ParableMinAggregateInputType
    _max?: ParableMaxAggregateInputType
  }

  export type ParableGroupByOutputType = {
    id: string
    title: string
    content: string
    moral: string
    titleRu: string | null
    contentRu: string | null
    moralRu: string | null
    source: string | null
    readTime: number
    createdAt: Date
    updatedAt: Date
    categoryId: string
    _count: ParableCountAggregateOutputType | null
    _avg: ParableAvgAggregateOutputType | null
    _sum: ParableSumAggregateOutputType | null
    _min: ParableMinAggregateOutputType | null
    _max: ParableMaxAggregateOutputType | null
  }

  type GetParableGroupByPayload<T extends ParableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParableGroupByOutputType[P]>
            : GetScalarType<T[P], ParableGroupByOutputType[P]>
        }
      >
    >


  export type ParableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    moral?: boolean
    titleRu?: boolean
    contentRu?: boolean
    moralRu?: boolean
    source?: boolean
    readTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    dailies?: boolean | Parable$dailiesArgs<ExtArgs>
    digests?: boolean | Parable$digestsArgs<ExtArgs>
    favorites?: boolean | Parable$favoritesArgs<ExtArgs>
    _count?: boolean | ParableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parable"]>

  export type ParableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    moral?: boolean
    titleRu?: boolean
    contentRu?: boolean
    moralRu?: boolean
    source?: boolean
    readTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parable"]>

  export type ParableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    moral?: boolean
    titleRu?: boolean
    contentRu?: boolean
    moralRu?: boolean
    source?: boolean
    readTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parable"]>

  export type ParableSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    moral?: boolean
    titleRu?: boolean
    contentRu?: boolean
    moralRu?: boolean
    source?: boolean
    readTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
  }

  export type ParableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "moral" | "titleRu" | "contentRu" | "moralRu" | "source" | "readTime" | "createdAt" | "updatedAt" | "categoryId", ExtArgs["result"]["parable"]>
  export type ParableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    dailies?: boolean | Parable$dailiesArgs<ExtArgs>
    digests?: boolean | Parable$digestsArgs<ExtArgs>
    favorites?: boolean | Parable$favoritesArgs<ExtArgs>
    _count?: boolean | ParableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ParableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ParablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parable"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      dailies: Prisma.$DailyParablePayload<ExtArgs>[]
      digests: Prisma.$DailyDigestPayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      moral: string
      titleRu: string | null
      contentRu: string | null
      moralRu: string | null
      source: string | null
      readTime: number
      createdAt: Date
      updatedAt: Date
      categoryId: string
    }, ExtArgs["result"]["parable"]>
    composites: {}
  }

  type ParableGetPayload<S extends boolean | null | undefined | ParableDefaultArgs> = $Result.GetResult<Prisma.$ParablePayload, S>

  type ParableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParableCountAggregateInputType | true
    }

  export interface ParableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parable'], meta: { name: 'Parable' } }
    /**
     * Find zero or one Parable that matches the filter.
     * @param {ParableFindUniqueArgs} args - Arguments to find a Parable
     * @example
     * // Get one Parable
     * const parable = await prisma.parable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParableFindUniqueArgs>(args: SelectSubset<T, ParableFindUniqueArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParableFindUniqueOrThrowArgs} args - Arguments to find a Parable
     * @example
     * // Get one Parable
     * const parable = await prisma.parable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParableFindUniqueOrThrowArgs>(args: SelectSubset<T, ParableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableFindFirstArgs} args - Arguments to find a Parable
     * @example
     * // Get one Parable
     * const parable = await prisma.parable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParableFindFirstArgs>(args?: SelectSubset<T, ParableFindFirstArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableFindFirstOrThrowArgs} args - Arguments to find a Parable
     * @example
     * // Get one Parable
     * const parable = await prisma.parable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParableFindFirstOrThrowArgs>(args?: SelectSubset<T, ParableFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parables
     * const parables = await prisma.parable.findMany()
     * 
     * // Get first 10 Parables
     * const parables = await prisma.parable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parableWithIdOnly = await prisma.parable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParableFindManyArgs>(args?: SelectSubset<T, ParableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parable.
     * @param {ParableCreateArgs} args - Arguments to create a Parable.
     * @example
     * // Create one Parable
     * const Parable = await prisma.parable.create({
     *   data: {
     *     // ... data to create a Parable
     *   }
     * })
     * 
     */
    create<T extends ParableCreateArgs>(args: SelectSubset<T, ParableCreateArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parables.
     * @param {ParableCreateManyArgs} args - Arguments to create many Parables.
     * @example
     * // Create many Parables
     * const parable = await prisma.parable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParableCreateManyArgs>(args?: SelectSubset<T, ParableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parables and returns the data saved in the database.
     * @param {ParableCreateManyAndReturnArgs} args - Arguments to create many Parables.
     * @example
     * // Create many Parables
     * const parable = await prisma.parable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parables and only return the `id`
     * const parableWithIdOnly = await prisma.parable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParableCreateManyAndReturnArgs>(args?: SelectSubset<T, ParableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Parable.
     * @param {ParableDeleteArgs} args - Arguments to delete one Parable.
     * @example
     * // Delete one Parable
     * const Parable = await prisma.parable.delete({
     *   where: {
     *     // ... filter to delete one Parable
     *   }
     * })
     * 
     */
    delete<T extends ParableDeleteArgs>(args: SelectSubset<T, ParableDeleteArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parable.
     * @param {ParableUpdateArgs} args - Arguments to update one Parable.
     * @example
     * // Update one Parable
     * const parable = await prisma.parable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParableUpdateArgs>(args: SelectSubset<T, ParableUpdateArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parables.
     * @param {ParableDeleteManyArgs} args - Arguments to filter Parables to delete.
     * @example
     * // Delete a few Parables
     * const { count } = await prisma.parable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParableDeleteManyArgs>(args?: SelectSubset<T, ParableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parables
     * const parable = await prisma.parable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParableUpdateManyArgs>(args: SelectSubset<T, ParableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parables and returns the data updated in the database.
     * @param {ParableUpdateManyAndReturnArgs} args - Arguments to update many Parables.
     * @example
     * // Update many Parables
     * const parable = await prisma.parable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parables and only return the `id`
     * const parableWithIdOnly = await prisma.parable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParableUpdateManyAndReturnArgs>(args: SelectSubset<T, ParableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Parable.
     * @param {ParableUpsertArgs} args - Arguments to update or create a Parable.
     * @example
     * // Update or create a Parable
     * const parable = await prisma.parable.upsert({
     *   create: {
     *     // ... data to create a Parable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parable we want to update
     *   }
     * })
     */
    upsert<T extends ParableUpsertArgs>(args: SelectSubset<T, ParableUpsertArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableCountArgs} args - Arguments to filter Parables to count.
     * @example
     * // Count the number of Parables
     * const count = await prisma.parable.count({
     *   where: {
     *     // ... the filter for the Parables we want to count
     *   }
     * })
    **/
    count<T extends ParableCountArgs>(
      args?: Subset<T, ParableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParableAggregateArgs>(args: Subset<T, ParableAggregateArgs>): Prisma.PrismaPromise<GetParableAggregateType<T>>

    /**
     * Group by Parable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParableGroupByArgs['orderBy'] }
        : { orderBy?: ParableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parable model
   */
  readonly fields: ParableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dailies<T extends Parable$dailiesArgs<ExtArgs> = {}>(args?: Subset<T, Parable$dailiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    digests<T extends Parable$digestsArgs<ExtArgs> = {}>(args?: Subset<T, Parable$digestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Parable$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Parable$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Parable model
   */
  interface ParableFieldRefs {
    readonly id: FieldRef<"Parable", 'String'>
    readonly title: FieldRef<"Parable", 'String'>
    readonly content: FieldRef<"Parable", 'String'>
    readonly moral: FieldRef<"Parable", 'String'>
    readonly titleRu: FieldRef<"Parable", 'String'>
    readonly contentRu: FieldRef<"Parable", 'String'>
    readonly moralRu: FieldRef<"Parable", 'String'>
    readonly source: FieldRef<"Parable", 'String'>
    readonly readTime: FieldRef<"Parable", 'Int'>
    readonly createdAt: FieldRef<"Parable", 'DateTime'>
    readonly updatedAt: FieldRef<"Parable", 'DateTime'>
    readonly categoryId: FieldRef<"Parable", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Parable findUnique
   */
  export type ParableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * Filter, which Parable to fetch.
     */
    where: ParableWhereUniqueInput
  }

  /**
   * Parable findUniqueOrThrow
   */
  export type ParableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * Filter, which Parable to fetch.
     */
    where: ParableWhereUniqueInput
  }

  /**
   * Parable findFirst
   */
  export type ParableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * Filter, which Parable to fetch.
     */
    where?: ParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parables to fetch.
     */
    orderBy?: ParableOrderByWithRelationInput | ParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parables.
     */
    cursor?: ParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parables.
     */
    distinct?: ParableScalarFieldEnum | ParableScalarFieldEnum[]
  }

  /**
   * Parable findFirstOrThrow
   */
  export type ParableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * Filter, which Parable to fetch.
     */
    where?: ParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parables to fetch.
     */
    orderBy?: ParableOrderByWithRelationInput | ParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parables.
     */
    cursor?: ParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parables.
     */
    distinct?: ParableScalarFieldEnum | ParableScalarFieldEnum[]
  }

  /**
   * Parable findMany
   */
  export type ParableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * Filter, which Parables to fetch.
     */
    where?: ParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parables to fetch.
     */
    orderBy?: ParableOrderByWithRelationInput | ParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parables.
     */
    cursor?: ParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parables.
     */
    distinct?: ParableScalarFieldEnum | ParableScalarFieldEnum[]
  }

  /**
   * Parable create
   */
  export type ParableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * The data needed to create a Parable.
     */
    data: XOR<ParableCreateInput, ParableUncheckedCreateInput>
  }

  /**
   * Parable createMany
   */
  export type ParableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parables.
     */
    data: ParableCreateManyInput | ParableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parable createManyAndReturn
   */
  export type ParableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * The data used to create many Parables.
     */
    data: ParableCreateManyInput | ParableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Parable update
   */
  export type ParableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * The data needed to update a Parable.
     */
    data: XOR<ParableUpdateInput, ParableUncheckedUpdateInput>
    /**
     * Choose, which Parable to update.
     */
    where: ParableWhereUniqueInput
  }

  /**
   * Parable updateMany
   */
  export type ParableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parables.
     */
    data: XOR<ParableUpdateManyMutationInput, ParableUncheckedUpdateManyInput>
    /**
     * Filter which Parables to update
     */
    where?: ParableWhereInput
    /**
     * Limit how many Parables to update.
     */
    limit?: number
  }

  /**
   * Parable updateManyAndReturn
   */
  export type ParableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * The data used to update Parables.
     */
    data: XOR<ParableUpdateManyMutationInput, ParableUncheckedUpdateManyInput>
    /**
     * Filter which Parables to update
     */
    where?: ParableWhereInput
    /**
     * Limit how many Parables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Parable upsert
   */
  export type ParableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * The filter to search for the Parable to update in case it exists.
     */
    where: ParableWhereUniqueInput
    /**
     * In case the Parable found by the `where` argument doesn't exist, create a new Parable with this data.
     */
    create: XOR<ParableCreateInput, ParableUncheckedCreateInput>
    /**
     * In case the Parable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParableUpdateInput, ParableUncheckedUpdateInput>
  }

  /**
   * Parable delete
   */
  export type ParableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    /**
     * Filter which Parable to delete.
     */
    where: ParableWhereUniqueInput
  }

  /**
   * Parable deleteMany
   */
  export type ParableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parables to delete
     */
    where?: ParableWhereInput
    /**
     * Limit how many Parables to delete.
     */
    limit?: number
  }

  /**
   * Parable.dailies
   */
  export type Parable$dailiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    where?: DailyParableWhereInput
    orderBy?: DailyParableOrderByWithRelationInput | DailyParableOrderByWithRelationInput[]
    cursor?: DailyParableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyParableScalarFieldEnum | DailyParableScalarFieldEnum[]
  }

  /**
   * Parable.digests
   */
  export type Parable$digestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    where?: DailyDigestWhereInput
    orderBy?: DailyDigestOrderByWithRelationInput | DailyDigestOrderByWithRelationInput[]
    cursor?: DailyDigestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyDigestScalarFieldEnum | DailyDigestScalarFieldEnum[]
  }

  /**
   * Parable.favorites
   */
  export type Parable$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Parable without action
   */
  export type ParableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
  }


  /**
   * Model Quote
   */

  export type AggregateQuote = {
    _count: QuoteCountAggregateOutputType | null
    _min: QuoteMinAggregateOutputType | null
    _max: QuoteMaxAggregateOutputType | null
  }

  export type QuoteMinAggregateOutputType = {
    id: string | null
    text: string | null
    textRu: string | null
    author: string | null
    authorRu: string | null
    theme: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuoteMaxAggregateOutputType = {
    id: string | null
    text: string | null
    textRu: string | null
    author: string | null
    authorRu: string | null
    theme: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuoteCountAggregateOutputType = {
    id: number
    text: number
    textRu: number
    author: number
    authorRu: number
    theme: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuoteMinAggregateInputType = {
    id?: true
    text?: true
    textRu?: true
    author?: true
    authorRu?: true
    theme?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuoteMaxAggregateInputType = {
    id?: true
    text?: true
    textRu?: true
    author?: true
    authorRu?: true
    theme?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuoteCountAggregateInputType = {
    id?: true
    text?: true
    textRu?: true
    author?: true
    authorRu?: true
    theme?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quote to aggregate.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quotes
    **/
    _count?: true | QuoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuoteMaxAggregateInputType
  }

  export type GetQuoteAggregateType<T extends QuoteAggregateArgs> = {
        [P in keyof T & keyof AggregateQuote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuote[P]>
      : GetScalarType<T[P], AggregateQuote[P]>
  }




  export type QuoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteWhereInput
    orderBy?: QuoteOrderByWithAggregationInput | QuoteOrderByWithAggregationInput[]
    by: QuoteScalarFieldEnum[] | QuoteScalarFieldEnum
    having?: QuoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuoteCountAggregateInputType | true
    _min?: QuoteMinAggregateInputType
    _max?: QuoteMaxAggregateInputType
  }

  export type QuoteGroupByOutputType = {
    id: string
    text: string
    textRu: string | null
    author: string
    authorRu: string | null
    theme: string | null
    createdAt: Date
    updatedAt: Date
    _count: QuoteCountAggregateOutputType | null
    _min: QuoteMinAggregateOutputType | null
    _max: QuoteMaxAggregateOutputType | null
  }

  type GetQuoteGroupByPayload<T extends QuoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuoteGroupByOutputType[P]>
            : GetScalarType<T[P], QuoteGroupByOutputType[P]>
        }
      >
    >


  export type QuoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    textRu?: boolean
    author?: boolean
    authorRu?: boolean
    theme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    digests?: boolean | Quote$digestsArgs<ExtArgs>
    _count?: boolean | QuoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    textRu?: boolean
    author?: boolean
    authorRu?: boolean
    theme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    textRu?: boolean
    author?: boolean
    authorRu?: boolean
    theme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectScalar = {
    id?: boolean
    text?: boolean
    textRu?: boolean
    author?: boolean
    authorRu?: boolean
    theme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "textRu" | "author" | "authorRu" | "theme" | "createdAt" | "updatedAt", ExtArgs["result"]["quote"]>
  export type QuoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    digests?: boolean | Quote$digestsArgs<ExtArgs>
    _count?: boolean | QuoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type QuoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quote"
    objects: {
      digests: Prisma.$DailyDigestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      textRu: string | null
      author: string
      authorRu: string | null
      theme: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["quote"]>
    composites: {}
  }

  type QuoteGetPayload<S extends boolean | null | undefined | QuoteDefaultArgs> = $Result.GetResult<Prisma.$QuotePayload, S>

  type QuoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuoteCountAggregateInputType | true
    }

  export interface QuoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quote'], meta: { name: 'Quote' } }
    /**
     * Find zero or one Quote that matches the filter.
     * @param {QuoteFindUniqueArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuoteFindUniqueArgs>(args: SelectSubset<T, QuoteFindUniqueArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuoteFindUniqueOrThrowArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuoteFindUniqueOrThrowArgs>(args: SelectSubset<T, QuoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindFirstArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuoteFindFirstArgs>(args?: SelectSubset<T, QuoteFindFirstArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindFirstOrThrowArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuoteFindFirstOrThrowArgs>(args?: SelectSubset<T, QuoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quotes
     * const quotes = await prisma.quote.findMany()
     * 
     * // Get first 10 Quotes
     * const quotes = await prisma.quote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quoteWithIdOnly = await prisma.quote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuoteFindManyArgs>(args?: SelectSubset<T, QuoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quote.
     * @param {QuoteCreateArgs} args - Arguments to create a Quote.
     * @example
     * // Create one Quote
     * const Quote = await prisma.quote.create({
     *   data: {
     *     // ... data to create a Quote
     *   }
     * })
     * 
     */
    create<T extends QuoteCreateArgs>(args: SelectSubset<T, QuoteCreateArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quotes.
     * @param {QuoteCreateManyArgs} args - Arguments to create many Quotes.
     * @example
     * // Create many Quotes
     * const quote = await prisma.quote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuoteCreateManyArgs>(args?: SelectSubset<T, QuoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quotes and returns the data saved in the database.
     * @param {QuoteCreateManyAndReturnArgs} args - Arguments to create many Quotes.
     * @example
     * // Create many Quotes
     * const quote = await prisma.quote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quotes and only return the `id`
     * const quoteWithIdOnly = await prisma.quote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuoteCreateManyAndReturnArgs>(args?: SelectSubset<T, QuoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quote.
     * @param {QuoteDeleteArgs} args - Arguments to delete one Quote.
     * @example
     * // Delete one Quote
     * const Quote = await prisma.quote.delete({
     *   where: {
     *     // ... filter to delete one Quote
     *   }
     * })
     * 
     */
    delete<T extends QuoteDeleteArgs>(args: SelectSubset<T, QuoteDeleteArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quote.
     * @param {QuoteUpdateArgs} args - Arguments to update one Quote.
     * @example
     * // Update one Quote
     * const quote = await prisma.quote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuoteUpdateArgs>(args: SelectSubset<T, QuoteUpdateArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quotes.
     * @param {QuoteDeleteManyArgs} args - Arguments to filter Quotes to delete.
     * @example
     * // Delete a few Quotes
     * const { count } = await prisma.quote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuoteDeleteManyArgs>(args?: SelectSubset<T, QuoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quotes
     * const quote = await prisma.quote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuoteUpdateManyArgs>(args: SelectSubset<T, QuoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotes and returns the data updated in the database.
     * @param {QuoteUpdateManyAndReturnArgs} args - Arguments to update many Quotes.
     * @example
     * // Update many Quotes
     * const quote = await prisma.quote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quotes and only return the `id`
     * const quoteWithIdOnly = await prisma.quote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuoteUpdateManyAndReturnArgs>(args: SelectSubset<T, QuoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quote.
     * @param {QuoteUpsertArgs} args - Arguments to update or create a Quote.
     * @example
     * // Update or create a Quote
     * const quote = await prisma.quote.upsert({
     *   create: {
     *     // ... data to create a Quote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quote we want to update
     *   }
     * })
     */
    upsert<T extends QuoteUpsertArgs>(args: SelectSubset<T, QuoteUpsertArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteCountArgs} args - Arguments to filter Quotes to count.
     * @example
     * // Count the number of Quotes
     * const count = await prisma.quote.count({
     *   where: {
     *     // ... the filter for the Quotes we want to count
     *   }
     * })
    **/
    count<T extends QuoteCountArgs>(
      args?: Subset<T, QuoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuoteAggregateArgs>(args: Subset<T, QuoteAggregateArgs>): Prisma.PrismaPromise<GetQuoteAggregateType<T>>

    /**
     * Group by Quote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuoteGroupByArgs['orderBy'] }
        : { orderBy?: QuoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quote model
   */
  readonly fields: QuoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    digests<T extends Quote$digestsArgs<ExtArgs> = {}>(args?: Subset<T, Quote$digestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quote model
   */
  interface QuoteFieldRefs {
    readonly id: FieldRef<"Quote", 'String'>
    readonly text: FieldRef<"Quote", 'String'>
    readonly textRu: FieldRef<"Quote", 'String'>
    readonly author: FieldRef<"Quote", 'String'>
    readonly authorRu: FieldRef<"Quote", 'String'>
    readonly theme: FieldRef<"Quote", 'String'>
    readonly createdAt: FieldRef<"Quote", 'DateTime'>
    readonly updatedAt: FieldRef<"Quote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quote findUnique
   */
  export type QuoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote findUniqueOrThrow
   */
  export type QuoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote findFirst
   */
  export type QuoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }

  /**
   * Quote findFirstOrThrow
   */
  export type QuoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }

  /**
   * Quote findMany
   */
  export type QuoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quotes to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }

  /**
   * Quote create
   */
  export type QuoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Quote.
     */
    data: XOR<QuoteCreateInput, QuoteUncheckedCreateInput>
  }

  /**
   * Quote createMany
   */
  export type QuoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quotes.
     */
    data: QuoteCreateManyInput | QuoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quote createManyAndReturn
   */
  export type QuoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * The data used to create many Quotes.
     */
    data: QuoteCreateManyInput | QuoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quote update
   */
  export type QuoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Quote.
     */
    data: XOR<QuoteUpdateInput, QuoteUncheckedUpdateInput>
    /**
     * Choose, which Quote to update.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote updateMany
   */
  export type QuoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quotes.
     */
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyInput>
    /**
     * Filter which Quotes to update
     */
    where?: QuoteWhereInput
    /**
     * Limit how many Quotes to update.
     */
    limit?: number
  }

  /**
   * Quote updateManyAndReturn
   */
  export type QuoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * The data used to update Quotes.
     */
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyInput>
    /**
     * Filter which Quotes to update
     */
    where?: QuoteWhereInput
    /**
     * Limit how many Quotes to update.
     */
    limit?: number
  }

  /**
   * Quote upsert
   */
  export type QuoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Quote to update in case it exists.
     */
    where: QuoteWhereUniqueInput
    /**
     * In case the Quote found by the `where` argument doesn't exist, create a new Quote with this data.
     */
    create: XOR<QuoteCreateInput, QuoteUncheckedCreateInput>
    /**
     * In case the Quote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuoteUpdateInput, QuoteUncheckedUpdateInput>
  }

  /**
   * Quote delete
   */
  export type QuoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter which Quote to delete.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote deleteMany
   */
  export type QuoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotes to delete
     */
    where?: QuoteWhereInput
    /**
     * Limit how many Quotes to delete.
     */
    limit?: number
  }

  /**
   * Quote.digests
   */
  export type Quote$digestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    where?: DailyDigestWhereInput
    orderBy?: DailyDigestOrderByWithRelationInput | DailyDigestOrderByWithRelationInput[]
    cursor?: DailyDigestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyDigestScalarFieldEnum | DailyDigestScalarFieldEnum[]
  }

  /**
   * Quote without action
   */
  export type QuoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
  }


  /**
   * Model DailyDigest
   */

  export type AggregateDailyDigest = {
    _count: DailyDigestCountAggregateOutputType | null
    _min: DailyDigestMinAggregateOutputType | null
    _max: DailyDigestMaxAggregateOutputType | null
  }

  export type DailyDigestMinAggregateOutputType = {
    id: string | null
    date: Date | null
    slug: string | null
    titleEn: string | null
    titleRu: string | null
    quoteId: string | null
    parableId: string | null
    conclusionEn: string | null
    conclusionRu: string | null
    questionEn: string | null
    questionRu: string | null
    createdAt: Date | null
  }

  export type DailyDigestMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    slug: string | null
    titleEn: string | null
    titleRu: string | null
    quoteId: string | null
    parableId: string | null
    conclusionEn: string | null
    conclusionRu: string | null
    questionEn: string | null
    questionRu: string | null
    createdAt: Date | null
  }

  export type DailyDigestCountAggregateOutputType = {
    id: number
    date: number
    slug: number
    titleEn: number
    titleRu: number
    quoteId: number
    parableId: number
    conclusionEn: number
    conclusionRu: number
    questionEn: number
    questionRu: number
    createdAt: number
    _all: number
  }


  export type DailyDigestMinAggregateInputType = {
    id?: true
    date?: true
    slug?: true
    titleEn?: true
    titleRu?: true
    quoteId?: true
    parableId?: true
    conclusionEn?: true
    conclusionRu?: true
    questionEn?: true
    questionRu?: true
    createdAt?: true
  }

  export type DailyDigestMaxAggregateInputType = {
    id?: true
    date?: true
    slug?: true
    titleEn?: true
    titleRu?: true
    quoteId?: true
    parableId?: true
    conclusionEn?: true
    conclusionRu?: true
    questionEn?: true
    questionRu?: true
    createdAt?: true
  }

  export type DailyDigestCountAggregateInputType = {
    id?: true
    date?: true
    slug?: true
    titleEn?: true
    titleRu?: true
    quoteId?: true
    parableId?: true
    conclusionEn?: true
    conclusionRu?: true
    questionEn?: true
    questionRu?: true
    createdAt?: true
    _all?: true
  }

  export type DailyDigestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyDigest to aggregate.
     */
    where?: DailyDigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyDigests to fetch.
     */
    orderBy?: DailyDigestOrderByWithRelationInput | DailyDigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyDigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyDigests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyDigests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyDigests
    **/
    _count?: true | DailyDigestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyDigestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyDigestMaxAggregateInputType
  }

  export type GetDailyDigestAggregateType<T extends DailyDigestAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyDigest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyDigest[P]>
      : GetScalarType<T[P], AggregateDailyDigest[P]>
  }




  export type DailyDigestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyDigestWhereInput
    orderBy?: DailyDigestOrderByWithAggregationInput | DailyDigestOrderByWithAggregationInput[]
    by: DailyDigestScalarFieldEnum[] | DailyDigestScalarFieldEnum
    having?: DailyDigestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyDigestCountAggregateInputType | true
    _min?: DailyDigestMinAggregateInputType
    _max?: DailyDigestMaxAggregateInputType
  }

  export type DailyDigestGroupByOutputType = {
    id: string
    date: Date
    slug: string | null
    titleEn: string | null
    titleRu: string | null
    quoteId: string
    parableId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt: Date
    _count: DailyDigestCountAggregateOutputType | null
    _min: DailyDigestMinAggregateOutputType | null
    _max: DailyDigestMaxAggregateOutputType | null
  }

  type GetDailyDigestGroupByPayload<T extends DailyDigestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyDigestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyDigestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyDigestGroupByOutputType[P]>
            : GetScalarType<T[P], DailyDigestGroupByOutputType[P]>
        }
      >
    >


  export type DailyDigestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    slug?: boolean
    titleEn?: boolean
    titleRu?: boolean
    quoteId?: boolean
    parableId?: boolean
    conclusionEn?: boolean
    conclusionRu?: boolean
    questionEn?: boolean
    questionRu?: boolean
    createdAt?: boolean
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyDigest"]>

  export type DailyDigestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    slug?: boolean
    titleEn?: boolean
    titleRu?: boolean
    quoteId?: boolean
    parableId?: boolean
    conclusionEn?: boolean
    conclusionRu?: boolean
    questionEn?: boolean
    questionRu?: boolean
    createdAt?: boolean
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyDigest"]>

  export type DailyDigestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    slug?: boolean
    titleEn?: boolean
    titleRu?: boolean
    quoteId?: boolean
    parableId?: boolean
    conclusionEn?: boolean
    conclusionRu?: boolean
    questionEn?: boolean
    questionRu?: boolean
    createdAt?: boolean
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyDigest"]>

  export type DailyDigestSelectScalar = {
    id?: boolean
    date?: boolean
    slug?: boolean
    titleEn?: boolean
    titleRu?: boolean
    quoteId?: boolean
    parableId?: boolean
    conclusionEn?: boolean
    conclusionRu?: boolean
    questionEn?: boolean
    questionRu?: boolean
    createdAt?: boolean
  }

  export type DailyDigestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "slug" | "titleEn" | "titleRu" | "quoteId" | "parableId" | "conclusionEn" | "conclusionRu" | "questionEn" | "questionRu" | "createdAt", ExtArgs["result"]["dailyDigest"]>
  export type DailyDigestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }
  export type DailyDigestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }
  export type DailyDigestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }

  export type $DailyDigestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyDigest"
    objects: {
      quote: Prisma.$QuotePayload<ExtArgs>
      parable: Prisma.$ParablePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      slug: string | null
      titleEn: string | null
      titleRu: string | null
      quoteId: string
      parableId: string
      conclusionEn: string
      conclusionRu: string
      questionEn: string
      questionRu: string
      createdAt: Date
    }, ExtArgs["result"]["dailyDigest"]>
    composites: {}
  }

  type DailyDigestGetPayload<S extends boolean | null | undefined | DailyDigestDefaultArgs> = $Result.GetResult<Prisma.$DailyDigestPayload, S>

  type DailyDigestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyDigestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyDigestCountAggregateInputType | true
    }

  export interface DailyDigestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyDigest'], meta: { name: 'DailyDigest' } }
    /**
     * Find zero or one DailyDigest that matches the filter.
     * @param {DailyDigestFindUniqueArgs} args - Arguments to find a DailyDigest
     * @example
     * // Get one DailyDigest
     * const dailyDigest = await prisma.dailyDigest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyDigestFindUniqueArgs>(args: SelectSubset<T, DailyDigestFindUniqueArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyDigest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyDigestFindUniqueOrThrowArgs} args - Arguments to find a DailyDigest
     * @example
     * // Get one DailyDigest
     * const dailyDigest = await prisma.dailyDigest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyDigestFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyDigestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyDigest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestFindFirstArgs} args - Arguments to find a DailyDigest
     * @example
     * // Get one DailyDigest
     * const dailyDigest = await prisma.dailyDigest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyDigestFindFirstArgs>(args?: SelectSubset<T, DailyDigestFindFirstArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyDigest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestFindFirstOrThrowArgs} args - Arguments to find a DailyDigest
     * @example
     * // Get one DailyDigest
     * const dailyDigest = await prisma.dailyDigest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyDigestFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyDigestFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyDigests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyDigests
     * const dailyDigests = await prisma.dailyDigest.findMany()
     * 
     * // Get first 10 DailyDigests
     * const dailyDigests = await prisma.dailyDigest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyDigestWithIdOnly = await prisma.dailyDigest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyDigestFindManyArgs>(args?: SelectSubset<T, DailyDigestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyDigest.
     * @param {DailyDigestCreateArgs} args - Arguments to create a DailyDigest.
     * @example
     * // Create one DailyDigest
     * const DailyDigest = await prisma.dailyDigest.create({
     *   data: {
     *     // ... data to create a DailyDigest
     *   }
     * })
     * 
     */
    create<T extends DailyDigestCreateArgs>(args: SelectSubset<T, DailyDigestCreateArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyDigests.
     * @param {DailyDigestCreateManyArgs} args - Arguments to create many DailyDigests.
     * @example
     * // Create many DailyDigests
     * const dailyDigest = await prisma.dailyDigest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyDigestCreateManyArgs>(args?: SelectSubset<T, DailyDigestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyDigests and returns the data saved in the database.
     * @param {DailyDigestCreateManyAndReturnArgs} args - Arguments to create many DailyDigests.
     * @example
     * // Create many DailyDigests
     * const dailyDigest = await prisma.dailyDigest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyDigests and only return the `id`
     * const dailyDigestWithIdOnly = await prisma.dailyDigest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyDigestCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyDigestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyDigest.
     * @param {DailyDigestDeleteArgs} args - Arguments to delete one DailyDigest.
     * @example
     * // Delete one DailyDigest
     * const DailyDigest = await prisma.dailyDigest.delete({
     *   where: {
     *     // ... filter to delete one DailyDigest
     *   }
     * })
     * 
     */
    delete<T extends DailyDigestDeleteArgs>(args: SelectSubset<T, DailyDigestDeleteArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyDigest.
     * @param {DailyDigestUpdateArgs} args - Arguments to update one DailyDigest.
     * @example
     * // Update one DailyDigest
     * const dailyDigest = await prisma.dailyDigest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyDigestUpdateArgs>(args: SelectSubset<T, DailyDigestUpdateArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyDigests.
     * @param {DailyDigestDeleteManyArgs} args - Arguments to filter DailyDigests to delete.
     * @example
     * // Delete a few DailyDigests
     * const { count } = await prisma.dailyDigest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyDigestDeleteManyArgs>(args?: SelectSubset<T, DailyDigestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyDigests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyDigests
     * const dailyDigest = await prisma.dailyDigest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyDigestUpdateManyArgs>(args: SelectSubset<T, DailyDigestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyDigests and returns the data updated in the database.
     * @param {DailyDigestUpdateManyAndReturnArgs} args - Arguments to update many DailyDigests.
     * @example
     * // Update many DailyDigests
     * const dailyDigest = await prisma.dailyDigest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyDigests and only return the `id`
     * const dailyDigestWithIdOnly = await prisma.dailyDigest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyDigestUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyDigestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyDigest.
     * @param {DailyDigestUpsertArgs} args - Arguments to update or create a DailyDigest.
     * @example
     * // Update or create a DailyDigest
     * const dailyDigest = await prisma.dailyDigest.upsert({
     *   create: {
     *     // ... data to create a DailyDigest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyDigest we want to update
     *   }
     * })
     */
    upsert<T extends DailyDigestUpsertArgs>(args: SelectSubset<T, DailyDigestUpsertArgs<ExtArgs>>): Prisma__DailyDigestClient<$Result.GetResult<Prisma.$DailyDigestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyDigests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestCountArgs} args - Arguments to filter DailyDigests to count.
     * @example
     * // Count the number of DailyDigests
     * const count = await prisma.dailyDigest.count({
     *   where: {
     *     // ... the filter for the DailyDigests we want to count
     *   }
     * })
    **/
    count<T extends DailyDigestCountArgs>(
      args?: Subset<T, DailyDigestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyDigestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyDigest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyDigestAggregateArgs>(args: Subset<T, DailyDigestAggregateArgs>): Prisma.PrismaPromise<GetDailyDigestAggregateType<T>>

    /**
     * Group by DailyDigest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDigestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyDigestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyDigestGroupByArgs['orderBy'] }
        : { orderBy?: DailyDigestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyDigestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyDigestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyDigest model
   */
  readonly fields: DailyDigestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyDigest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyDigestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quote<T extends QuoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuoteDefaultArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parable<T extends ParableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParableDefaultArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyDigest model
   */
  interface DailyDigestFieldRefs {
    readonly id: FieldRef<"DailyDigest", 'String'>
    readonly date: FieldRef<"DailyDigest", 'DateTime'>
    readonly slug: FieldRef<"DailyDigest", 'String'>
    readonly titleEn: FieldRef<"DailyDigest", 'String'>
    readonly titleRu: FieldRef<"DailyDigest", 'String'>
    readonly quoteId: FieldRef<"DailyDigest", 'String'>
    readonly parableId: FieldRef<"DailyDigest", 'String'>
    readonly conclusionEn: FieldRef<"DailyDigest", 'String'>
    readonly conclusionRu: FieldRef<"DailyDigest", 'String'>
    readonly questionEn: FieldRef<"DailyDigest", 'String'>
    readonly questionRu: FieldRef<"DailyDigest", 'String'>
    readonly createdAt: FieldRef<"DailyDigest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyDigest findUnique
   */
  export type DailyDigestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * Filter, which DailyDigest to fetch.
     */
    where: DailyDigestWhereUniqueInput
  }

  /**
   * DailyDigest findUniqueOrThrow
   */
  export type DailyDigestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * Filter, which DailyDigest to fetch.
     */
    where: DailyDigestWhereUniqueInput
  }

  /**
   * DailyDigest findFirst
   */
  export type DailyDigestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * Filter, which DailyDigest to fetch.
     */
    where?: DailyDigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyDigests to fetch.
     */
    orderBy?: DailyDigestOrderByWithRelationInput | DailyDigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyDigests.
     */
    cursor?: DailyDigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyDigests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyDigests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyDigests.
     */
    distinct?: DailyDigestScalarFieldEnum | DailyDigestScalarFieldEnum[]
  }

  /**
   * DailyDigest findFirstOrThrow
   */
  export type DailyDigestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * Filter, which DailyDigest to fetch.
     */
    where?: DailyDigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyDigests to fetch.
     */
    orderBy?: DailyDigestOrderByWithRelationInput | DailyDigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyDigests.
     */
    cursor?: DailyDigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyDigests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyDigests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyDigests.
     */
    distinct?: DailyDigestScalarFieldEnum | DailyDigestScalarFieldEnum[]
  }

  /**
   * DailyDigest findMany
   */
  export type DailyDigestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * Filter, which DailyDigests to fetch.
     */
    where?: DailyDigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyDigests to fetch.
     */
    orderBy?: DailyDigestOrderByWithRelationInput | DailyDigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyDigests.
     */
    cursor?: DailyDigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyDigests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyDigests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyDigests.
     */
    distinct?: DailyDigestScalarFieldEnum | DailyDigestScalarFieldEnum[]
  }

  /**
   * DailyDigest create
   */
  export type DailyDigestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyDigest.
     */
    data: XOR<DailyDigestCreateInput, DailyDigestUncheckedCreateInput>
  }

  /**
   * DailyDigest createMany
   */
  export type DailyDigestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyDigests.
     */
    data: DailyDigestCreateManyInput | DailyDigestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyDigest createManyAndReturn
   */
  export type DailyDigestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * The data used to create many DailyDigests.
     */
    data: DailyDigestCreateManyInput | DailyDigestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyDigest update
   */
  export type DailyDigestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyDigest.
     */
    data: XOR<DailyDigestUpdateInput, DailyDigestUncheckedUpdateInput>
    /**
     * Choose, which DailyDigest to update.
     */
    where: DailyDigestWhereUniqueInput
  }

  /**
   * DailyDigest updateMany
   */
  export type DailyDigestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyDigests.
     */
    data: XOR<DailyDigestUpdateManyMutationInput, DailyDigestUncheckedUpdateManyInput>
    /**
     * Filter which DailyDigests to update
     */
    where?: DailyDigestWhereInput
    /**
     * Limit how many DailyDigests to update.
     */
    limit?: number
  }

  /**
   * DailyDigest updateManyAndReturn
   */
  export type DailyDigestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * The data used to update DailyDigests.
     */
    data: XOR<DailyDigestUpdateManyMutationInput, DailyDigestUncheckedUpdateManyInput>
    /**
     * Filter which DailyDigests to update
     */
    where?: DailyDigestWhereInput
    /**
     * Limit how many DailyDigests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyDigest upsert
   */
  export type DailyDigestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyDigest to update in case it exists.
     */
    where: DailyDigestWhereUniqueInput
    /**
     * In case the DailyDigest found by the `where` argument doesn't exist, create a new DailyDigest with this data.
     */
    create: XOR<DailyDigestCreateInput, DailyDigestUncheckedCreateInput>
    /**
     * In case the DailyDigest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyDigestUpdateInput, DailyDigestUncheckedUpdateInput>
  }

  /**
   * DailyDigest delete
   */
  export type DailyDigestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
    /**
     * Filter which DailyDigest to delete.
     */
    where: DailyDigestWhereUniqueInput
  }

  /**
   * DailyDigest deleteMany
   */
  export type DailyDigestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyDigests to delete
     */
    where?: DailyDigestWhereInput
    /**
     * Limit how many DailyDigests to delete.
     */
    limit?: number
  }

  /**
   * DailyDigest without action
   */
  export type DailyDigestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDigest
     */
    select?: DailyDigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyDigest
     */
    omit?: DailyDigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDigestInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    parablesCount: number | null
  }

  export type CategorySumAggregateOutputType = {
    parablesCount: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameRu: string | null
    slug: string | null
    description: string | null
    color: string | null
    parablesCount: number | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameRu: string | null
    slug: string | null
    description: string | null
    color: string | null
    parablesCount: number | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    nameRu: number
    slug: number
    description: number
    color: number
    parablesCount: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    parablesCount?: true
  }

  export type CategorySumAggregateInputType = {
    parablesCount?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    nameRu?: true
    slug?: true
    description?: true
    color?: true
    parablesCount?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    nameRu?: true
    slug?: true
    description?: true
    color?: true
    parablesCount?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    nameRu?: true
    slug?: true
    description?: true
    color?: true
    parablesCount?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    nameRu: string | null
    slug: string
    description: string | null
    color: string | null
    parablesCount: number
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameRu?: boolean
    slug?: boolean
    description?: boolean
    color?: boolean
    parablesCount?: boolean
    parables?: boolean | Category$parablesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameRu?: boolean
    slug?: boolean
    description?: boolean
    color?: boolean
    parablesCount?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameRu?: boolean
    slug?: boolean
    description?: boolean
    color?: boolean
    parablesCount?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    nameRu?: boolean
    slug?: boolean
    description?: boolean
    color?: boolean
    parablesCount?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameRu" | "slug" | "description" | "color" | "parablesCount", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parables?: boolean | Category$parablesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parables: Prisma.$ParablePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameRu: string | null
      slug: string
      description: string | null
      color: string | null
      parablesCount: number
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parables<T extends Category$parablesArgs<ExtArgs> = {}>(args?: Subset<T, Category$parablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly nameRu: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly parablesCount: FieldRef<"Category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.parables
   */
  export type Category$parablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parable
     */
    select?: ParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parable
     */
    omit?: ParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParableInclude<ExtArgs> | null
    where?: ParableWhereInput
    orderBy?: ParableOrderByWithRelationInput | ParableOrderByWithRelationInput[]
    cursor?: ParableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParableScalarFieldEnum | ParableScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model DailyParable
   */

  export type AggregateDailyParable = {
    _count: DailyParableCountAggregateOutputType | null
    _min: DailyParableMinAggregateOutputType | null
    _max: DailyParableMaxAggregateOutputType | null
  }

  export type DailyParableMinAggregateOutputType = {
    id: string | null
    date: Date | null
    parableId: string | null
  }

  export type DailyParableMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    parableId: string | null
  }

  export type DailyParableCountAggregateOutputType = {
    id: number
    date: number
    parableId: number
    _all: number
  }


  export type DailyParableMinAggregateInputType = {
    id?: true
    date?: true
    parableId?: true
  }

  export type DailyParableMaxAggregateInputType = {
    id?: true
    date?: true
    parableId?: true
  }

  export type DailyParableCountAggregateInputType = {
    id?: true
    date?: true
    parableId?: true
    _all?: true
  }

  export type DailyParableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyParable to aggregate.
     */
    where?: DailyParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyParables to fetch.
     */
    orderBy?: DailyParableOrderByWithRelationInput | DailyParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyParables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyParables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyParables
    **/
    _count?: true | DailyParableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyParableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyParableMaxAggregateInputType
  }

  export type GetDailyParableAggregateType<T extends DailyParableAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyParable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyParable[P]>
      : GetScalarType<T[P], AggregateDailyParable[P]>
  }




  export type DailyParableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyParableWhereInput
    orderBy?: DailyParableOrderByWithAggregationInput | DailyParableOrderByWithAggregationInput[]
    by: DailyParableScalarFieldEnum[] | DailyParableScalarFieldEnum
    having?: DailyParableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyParableCountAggregateInputType | true
    _min?: DailyParableMinAggregateInputType
    _max?: DailyParableMaxAggregateInputType
  }

  export type DailyParableGroupByOutputType = {
    id: string
    date: Date
    parableId: string
    _count: DailyParableCountAggregateOutputType | null
    _min: DailyParableMinAggregateOutputType | null
    _max: DailyParableMaxAggregateOutputType | null
  }

  type GetDailyParableGroupByPayload<T extends DailyParableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyParableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyParableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyParableGroupByOutputType[P]>
            : GetScalarType<T[P], DailyParableGroupByOutputType[P]>
        }
      >
    >


  export type DailyParableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    parableId?: boolean
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyParable"]>

  export type DailyParableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    parableId?: boolean
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyParable"]>

  export type DailyParableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    parableId?: boolean
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyParable"]>

  export type DailyParableSelectScalar = {
    id?: boolean
    date?: boolean
    parableId?: boolean
  }

  export type DailyParableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "parableId", ExtArgs["result"]["dailyParable"]>
  export type DailyParableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }
  export type DailyParableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }
  export type DailyParableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }

  export type $DailyParablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyParable"
    objects: {
      parable: Prisma.$ParablePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      parableId: string
    }, ExtArgs["result"]["dailyParable"]>
    composites: {}
  }

  type DailyParableGetPayload<S extends boolean | null | undefined | DailyParableDefaultArgs> = $Result.GetResult<Prisma.$DailyParablePayload, S>

  type DailyParableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyParableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyParableCountAggregateInputType | true
    }

  export interface DailyParableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyParable'], meta: { name: 'DailyParable' } }
    /**
     * Find zero or one DailyParable that matches the filter.
     * @param {DailyParableFindUniqueArgs} args - Arguments to find a DailyParable
     * @example
     * // Get one DailyParable
     * const dailyParable = await prisma.dailyParable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyParableFindUniqueArgs>(args: SelectSubset<T, DailyParableFindUniqueArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyParable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyParableFindUniqueOrThrowArgs} args - Arguments to find a DailyParable
     * @example
     * // Get one DailyParable
     * const dailyParable = await prisma.dailyParable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyParableFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyParableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyParable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableFindFirstArgs} args - Arguments to find a DailyParable
     * @example
     * // Get one DailyParable
     * const dailyParable = await prisma.dailyParable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyParableFindFirstArgs>(args?: SelectSubset<T, DailyParableFindFirstArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyParable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableFindFirstOrThrowArgs} args - Arguments to find a DailyParable
     * @example
     * // Get one DailyParable
     * const dailyParable = await prisma.dailyParable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyParableFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyParableFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyParables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyParables
     * const dailyParables = await prisma.dailyParable.findMany()
     * 
     * // Get first 10 DailyParables
     * const dailyParables = await prisma.dailyParable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyParableWithIdOnly = await prisma.dailyParable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyParableFindManyArgs>(args?: SelectSubset<T, DailyParableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyParable.
     * @param {DailyParableCreateArgs} args - Arguments to create a DailyParable.
     * @example
     * // Create one DailyParable
     * const DailyParable = await prisma.dailyParable.create({
     *   data: {
     *     // ... data to create a DailyParable
     *   }
     * })
     * 
     */
    create<T extends DailyParableCreateArgs>(args: SelectSubset<T, DailyParableCreateArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyParables.
     * @param {DailyParableCreateManyArgs} args - Arguments to create many DailyParables.
     * @example
     * // Create many DailyParables
     * const dailyParable = await prisma.dailyParable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyParableCreateManyArgs>(args?: SelectSubset<T, DailyParableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyParables and returns the data saved in the database.
     * @param {DailyParableCreateManyAndReturnArgs} args - Arguments to create many DailyParables.
     * @example
     * // Create many DailyParables
     * const dailyParable = await prisma.dailyParable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyParables and only return the `id`
     * const dailyParableWithIdOnly = await prisma.dailyParable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyParableCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyParableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyParable.
     * @param {DailyParableDeleteArgs} args - Arguments to delete one DailyParable.
     * @example
     * // Delete one DailyParable
     * const DailyParable = await prisma.dailyParable.delete({
     *   where: {
     *     // ... filter to delete one DailyParable
     *   }
     * })
     * 
     */
    delete<T extends DailyParableDeleteArgs>(args: SelectSubset<T, DailyParableDeleteArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyParable.
     * @param {DailyParableUpdateArgs} args - Arguments to update one DailyParable.
     * @example
     * // Update one DailyParable
     * const dailyParable = await prisma.dailyParable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyParableUpdateArgs>(args: SelectSubset<T, DailyParableUpdateArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyParables.
     * @param {DailyParableDeleteManyArgs} args - Arguments to filter DailyParables to delete.
     * @example
     * // Delete a few DailyParables
     * const { count } = await prisma.dailyParable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyParableDeleteManyArgs>(args?: SelectSubset<T, DailyParableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyParables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyParables
     * const dailyParable = await prisma.dailyParable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyParableUpdateManyArgs>(args: SelectSubset<T, DailyParableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyParables and returns the data updated in the database.
     * @param {DailyParableUpdateManyAndReturnArgs} args - Arguments to update many DailyParables.
     * @example
     * // Update many DailyParables
     * const dailyParable = await prisma.dailyParable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyParables and only return the `id`
     * const dailyParableWithIdOnly = await prisma.dailyParable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyParableUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyParableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyParable.
     * @param {DailyParableUpsertArgs} args - Arguments to update or create a DailyParable.
     * @example
     * // Update or create a DailyParable
     * const dailyParable = await prisma.dailyParable.upsert({
     *   create: {
     *     // ... data to create a DailyParable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyParable we want to update
     *   }
     * })
     */
    upsert<T extends DailyParableUpsertArgs>(args: SelectSubset<T, DailyParableUpsertArgs<ExtArgs>>): Prisma__DailyParableClient<$Result.GetResult<Prisma.$DailyParablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyParables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableCountArgs} args - Arguments to filter DailyParables to count.
     * @example
     * // Count the number of DailyParables
     * const count = await prisma.dailyParable.count({
     *   where: {
     *     // ... the filter for the DailyParables we want to count
     *   }
     * })
    **/
    count<T extends DailyParableCountArgs>(
      args?: Subset<T, DailyParableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyParableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyParable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyParableAggregateArgs>(args: Subset<T, DailyParableAggregateArgs>): Prisma.PrismaPromise<GetDailyParableAggregateType<T>>

    /**
     * Group by DailyParable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyParableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyParableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyParableGroupByArgs['orderBy'] }
        : { orderBy?: DailyParableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyParableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyParableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyParable model
   */
  readonly fields: DailyParableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyParable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyParableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parable<T extends ParableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParableDefaultArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyParable model
   */
  interface DailyParableFieldRefs {
    readonly id: FieldRef<"DailyParable", 'String'>
    readonly date: FieldRef<"DailyParable", 'DateTime'>
    readonly parableId: FieldRef<"DailyParable", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DailyParable findUnique
   */
  export type DailyParableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * Filter, which DailyParable to fetch.
     */
    where: DailyParableWhereUniqueInput
  }

  /**
   * DailyParable findUniqueOrThrow
   */
  export type DailyParableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * Filter, which DailyParable to fetch.
     */
    where: DailyParableWhereUniqueInput
  }

  /**
   * DailyParable findFirst
   */
  export type DailyParableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * Filter, which DailyParable to fetch.
     */
    where?: DailyParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyParables to fetch.
     */
    orderBy?: DailyParableOrderByWithRelationInput | DailyParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyParables.
     */
    cursor?: DailyParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyParables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyParables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyParables.
     */
    distinct?: DailyParableScalarFieldEnum | DailyParableScalarFieldEnum[]
  }

  /**
   * DailyParable findFirstOrThrow
   */
  export type DailyParableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * Filter, which DailyParable to fetch.
     */
    where?: DailyParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyParables to fetch.
     */
    orderBy?: DailyParableOrderByWithRelationInput | DailyParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyParables.
     */
    cursor?: DailyParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyParables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyParables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyParables.
     */
    distinct?: DailyParableScalarFieldEnum | DailyParableScalarFieldEnum[]
  }

  /**
   * DailyParable findMany
   */
  export type DailyParableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * Filter, which DailyParables to fetch.
     */
    where?: DailyParableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyParables to fetch.
     */
    orderBy?: DailyParableOrderByWithRelationInput | DailyParableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyParables.
     */
    cursor?: DailyParableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyParables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyParables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyParables.
     */
    distinct?: DailyParableScalarFieldEnum | DailyParableScalarFieldEnum[]
  }

  /**
   * DailyParable create
   */
  export type DailyParableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyParable.
     */
    data: XOR<DailyParableCreateInput, DailyParableUncheckedCreateInput>
  }

  /**
   * DailyParable createMany
   */
  export type DailyParableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyParables.
     */
    data: DailyParableCreateManyInput | DailyParableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyParable createManyAndReturn
   */
  export type DailyParableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * The data used to create many DailyParables.
     */
    data: DailyParableCreateManyInput | DailyParableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyParable update
   */
  export type DailyParableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyParable.
     */
    data: XOR<DailyParableUpdateInput, DailyParableUncheckedUpdateInput>
    /**
     * Choose, which DailyParable to update.
     */
    where: DailyParableWhereUniqueInput
  }

  /**
   * DailyParable updateMany
   */
  export type DailyParableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyParables.
     */
    data: XOR<DailyParableUpdateManyMutationInput, DailyParableUncheckedUpdateManyInput>
    /**
     * Filter which DailyParables to update
     */
    where?: DailyParableWhereInput
    /**
     * Limit how many DailyParables to update.
     */
    limit?: number
  }

  /**
   * DailyParable updateManyAndReturn
   */
  export type DailyParableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * The data used to update DailyParables.
     */
    data: XOR<DailyParableUpdateManyMutationInput, DailyParableUncheckedUpdateManyInput>
    /**
     * Filter which DailyParables to update
     */
    where?: DailyParableWhereInput
    /**
     * Limit how many DailyParables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyParable upsert
   */
  export type DailyParableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyParable to update in case it exists.
     */
    where: DailyParableWhereUniqueInput
    /**
     * In case the DailyParable found by the `where` argument doesn't exist, create a new DailyParable with this data.
     */
    create: XOR<DailyParableCreateInput, DailyParableUncheckedCreateInput>
    /**
     * In case the DailyParable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyParableUpdateInput, DailyParableUncheckedUpdateInput>
  }

  /**
   * DailyParable delete
   */
  export type DailyParableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
    /**
     * Filter which DailyParable to delete.
     */
    where: DailyParableWhereUniqueInput
  }

  /**
   * DailyParable deleteMany
   */
  export type DailyParableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyParables to delete
     */
    where?: DailyParableWhereInput
    /**
     * Limit how many DailyParables to delete.
     */
    limit?: number
  }

  /**
   * DailyParable without action
   */
  export type DailyParableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyParable
     */
    select?: DailyParableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyParable
     */
    omit?: DailyParableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyParableInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends User$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.subscription
   */
  export type User$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    userId: number
    active: number
    categoryPreferences: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    active?: true
    categoryPreferences?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    userId: string
    active: boolean
    categoryPreferences: string[]
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    active?: boolean
    categoryPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    active?: boolean
    categoryPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    active?: boolean
    categoryPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    active?: boolean
    categoryPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "active" | "categoryPreferences" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      active: boolean
      categoryPreferences: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly userId: FieldRef<"Subscription", 'String'>
    readonly active: FieldRef<"Subscription", 'Boolean'>
    readonly categoryPreferences: FieldRef<"Subscription", 'String[]'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model EmailSubscriber
   */

  export type AggregateEmailSubscriber = {
    _count: EmailSubscriberCountAggregateOutputType | null
    _min: EmailSubscriberMinAggregateOutputType | null
    _max: EmailSubscriberMaxAggregateOutputType | null
  }

  export type EmailSubscriberMinAggregateOutputType = {
    id: string | null
    email: string | null
    active: boolean | null
    lang: string | null
    unsubscribeToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailSubscriberMaxAggregateOutputType = {
    id: string | null
    email: string | null
    active: boolean | null
    lang: string | null
    unsubscribeToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailSubscriberCountAggregateOutputType = {
    id: number
    email: number
    active: number
    lang: number
    unsubscribeToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailSubscriberMinAggregateInputType = {
    id?: true
    email?: true
    active?: true
    lang?: true
    unsubscribeToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailSubscriberMaxAggregateInputType = {
    id?: true
    email?: true
    active?: true
    lang?: true
    unsubscribeToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailSubscriberCountAggregateInputType = {
    id?: true
    email?: true
    active?: true
    lang?: true
    unsubscribeToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailSubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailSubscriber to aggregate.
     */
    where?: EmailSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscribers to fetch.
     */
    orderBy?: EmailSubscriberOrderByWithRelationInput | EmailSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailSubscribers
    **/
    _count?: true | EmailSubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailSubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailSubscriberMaxAggregateInputType
  }

  export type GetEmailSubscriberAggregateType<T extends EmailSubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailSubscriber[P]>
      : GetScalarType<T[P], AggregateEmailSubscriber[P]>
  }




  export type EmailSubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailSubscriberWhereInput
    orderBy?: EmailSubscriberOrderByWithAggregationInput | EmailSubscriberOrderByWithAggregationInput[]
    by: EmailSubscriberScalarFieldEnum[] | EmailSubscriberScalarFieldEnum
    having?: EmailSubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailSubscriberCountAggregateInputType | true
    _min?: EmailSubscriberMinAggregateInputType
    _max?: EmailSubscriberMaxAggregateInputType
  }

  export type EmailSubscriberGroupByOutputType = {
    id: string
    email: string
    active: boolean
    lang: string
    unsubscribeToken: string
    createdAt: Date
    updatedAt: Date
    _count: EmailSubscriberCountAggregateOutputType | null
    _min: EmailSubscriberMinAggregateOutputType | null
    _max: EmailSubscriberMaxAggregateOutputType | null
  }

  type GetEmailSubscriberGroupByPayload<T extends EmailSubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailSubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailSubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailSubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], EmailSubscriberGroupByOutputType[P]>
        }
      >
    >


  export type EmailSubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    active?: boolean
    lang?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailSubscriber"]>

  export type EmailSubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    active?: boolean
    lang?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailSubscriber"]>

  export type EmailSubscriberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    active?: boolean
    lang?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailSubscriber"]>

  export type EmailSubscriberSelectScalar = {
    id?: boolean
    email?: boolean
    active?: boolean
    lang?: boolean
    unsubscribeToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailSubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "active" | "lang" | "unsubscribeToken" | "createdAt" | "updatedAt", ExtArgs["result"]["emailSubscriber"]>

  export type $EmailSubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailSubscriber"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      active: boolean
      lang: string
      unsubscribeToken: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailSubscriber"]>
    composites: {}
  }

  type EmailSubscriberGetPayload<S extends boolean | null | undefined | EmailSubscriberDefaultArgs> = $Result.GetResult<Prisma.$EmailSubscriberPayload, S>

  type EmailSubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailSubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailSubscriberCountAggregateInputType | true
    }

  export interface EmailSubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailSubscriber'], meta: { name: 'EmailSubscriber' } }
    /**
     * Find zero or one EmailSubscriber that matches the filter.
     * @param {EmailSubscriberFindUniqueArgs} args - Arguments to find a EmailSubscriber
     * @example
     * // Get one EmailSubscriber
     * const emailSubscriber = await prisma.emailSubscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailSubscriberFindUniqueArgs>(args: SelectSubset<T, EmailSubscriberFindUniqueArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailSubscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailSubscriberFindUniqueOrThrowArgs} args - Arguments to find a EmailSubscriber
     * @example
     * // Get one EmailSubscriber
     * const emailSubscriber = await prisma.emailSubscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailSubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailSubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailSubscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberFindFirstArgs} args - Arguments to find a EmailSubscriber
     * @example
     * // Get one EmailSubscriber
     * const emailSubscriber = await prisma.emailSubscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailSubscriberFindFirstArgs>(args?: SelectSubset<T, EmailSubscriberFindFirstArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailSubscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberFindFirstOrThrowArgs} args - Arguments to find a EmailSubscriber
     * @example
     * // Get one EmailSubscriber
     * const emailSubscriber = await prisma.emailSubscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailSubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailSubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailSubscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailSubscribers
     * const emailSubscribers = await prisma.emailSubscriber.findMany()
     * 
     * // Get first 10 EmailSubscribers
     * const emailSubscribers = await prisma.emailSubscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailSubscriberWithIdOnly = await prisma.emailSubscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailSubscriberFindManyArgs>(args?: SelectSubset<T, EmailSubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailSubscriber.
     * @param {EmailSubscriberCreateArgs} args - Arguments to create a EmailSubscriber.
     * @example
     * // Create one EmailSubscriber
     * const EmailSubscriber = await prisma.emailSubscriber.create({
     *   data: {
     *     // ... data to create a EmailSubscriber
     *   }
     * })
     * 
     */
    create<T extends EmailSubscriberCreateArgs>(args: SelectSubset<T, EmailSubscriberCreateArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailSubscribers.
     * @param {EmailSubscriberCreateManyArgs} args - Arguments to create many EmailSubscribers.
     * @example
     * // Create many EmailSubscribers
     * const emailSubscriber = await prisma.emailSubscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailSubscriberCreateManyArgs>(args?: SelectSubset<T, EmailSubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailSubscribers and returns the data saved in the database.
     * @param {EmailSubscriberCreateManyAndReturnArgs} args - Arguments to create many EmailSubscribers.
     * @example
     * // Create many EmailSubscribers
     * const emailSubscriber = await prisma.emailSubscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailSubscribers and only return the `id`
     * const emailSubscriberWithIdOnly = await prisma.emailSubscriber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailSubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailSubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailSubscriber.
     * @param {EmailSubscriberDeleteArgs} args - Arguments to delete one EmailSubscriber.
     * @example
     * // Delete one EmailSubscriber
     * const EmailSubscriber = await prisma.emailSubscriber.delete({
     *   where: {
     *     // ... filter to delete one EmailSubscriber
     *   }
     * })
     * 
     */
    delete<T extends EmailSubscriberDeleteArgs>(args: SelectSubset<T, EmailSubscriberDeleteArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailSubscriber.
     * @param {EmailSubscriberUpdateArgs} args - Arguments to update one EmailSubscriber.
     * @example
     * // Update one EmailSubscriber
     * const emailSubscriber = await prisma.emailSubscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailSubscriberUpdateArgs>(args: SelectSubset<T, EmailSubscriberUpdateArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailSubscribers.
     * @param {EmailSubscriberDeleteManyArgs} args - Arguments to filter EmailSubscribers to delete.
     * @example
     * // Delete a few EmailSubscribers
     * const { count } = await prisma.emailSubscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailSubscriberDeleteManyArgs>(args?: SelectSubset<T, EmailSubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailSubscribers
     * const emailSubscriber = await prisma.emailSubscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailSubscriberUpdateManyArgs>(args: SelectSubset<T, EmailSubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailSubscribers and returns the data updated in the database.
     * @param {EmailSubscriberUpdateManyAndReturnArgs} args - Arguments to update many EmailSubscribers.
     * @example
     * // Update many EmailSubscribers
     * const emailSubscriber = await prisma.emailSubscriber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailSubscribers and only return the `id`
     * const emailSubscriberWithIdOnly = await prisma.emailSubscriber.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailSubscriberUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailSubscriberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailSubscriber.
     * @param {EmailSubscriberUpsertArgs} args - Arguments to update or create a EmailSubscriber.
     * @example
     * // Update or create a EmailSubscriber
     * const emailSubscriber = await prisma.emailSubscriber.upsert({
     *   create: {
     *     // ... data to create a EmailSubscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailSubscriber we want to update
     *   }
     * })
     */
    upsert<T extends EmailSubscriberUpsertArgs>(args: SelectSubset<T, EmailSubscriberUpsertArgs<ExtArgs>>): Prisma__EmailSubscriberClient<$Result.GetResult<Prisma.$EmailSubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberCountArgs} args - Arguments to filter EmailSubscribers to count.
     * @example
     * // Count the number of EmailSubscribers
     * const count = await prisma.emailSubscriber.count({
     *   where: {
     *     // ... the filter for the EmailSubscribers we want to count
     *   }
     * })
    **/
    count<T extends EmailSubscriberCountArgs>(
      args?: Subset<T, EmailSubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailSubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailSubscriberAggregateArgs>(args: Subset<T, EmailSubscriberAggregateArgs>): Prisma.PrismaPromise<GetEmailSubscriberAggregateType<T>>

    /**
     * Group by EmailSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailSubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailSubscriberGroupByArgs['orderBy'] }
        : { orderBy?: EmailSubscriberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailSubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailSubscriber model
   */
  readonly fields: EmailSubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailSubscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailSubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailSubscriber model
   */
  interface EmailSubscriberFieldRefs {
    readonly id: FieldRef<"EmailSubscriber", 'String'>
    readonly email: FieldRef<"EmailSubscriber", 'String'>
    readonly active: FieldRef<"EmailSubscriber", 'Boolean'>
    readonly lang: FieldRef<"EmailSubscriber", 'String'>
    readonly unsubscribeToken: FieldRef<"EmailSubscriber", 'String'>
    readonly createdAt: FieldRef<"EmailSubscriber", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailSubscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailSubscriber findUnique
   */
  export type EmailSubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscriber to fetch.
     */
    where: EmailSubscriberWhereUniqueInput
  }

  /**
   * EmailSubscriber findUniqueOrThrow
   */
  export type EmailSubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscriber to fetch.
     */
    where: EmailSubscriberWhereUniqueInput
  }

  /**
   * EmailSubscriber findFirst
   */
  export type EmailSubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscriber to fetch.
     */
    where?: EmailSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscribers to fetch.
     */
    orderBy?: EmailSubscriberOrderByWithRelationInput | EmailSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailSubscribers.
     */
    cursor?: EmailSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSubscribers.
     */
    distinct?: EmailSubscriberScalarFieldEnum | EmailSubscriberScalarFieldEnum[]
  }

  /**
   * EmailSubscriber findFirstOrThrow
   */
  export type EmailSubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscriber to fetch.
     */
    where?: EmailSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscribers to fetch.
     */
    orderBy?: EmailSubscriberOrderByWithRelationInput | EmailSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailSubscribers.
     */
    cursor?: EmailSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSubscribers.
     */
    distinct?: EmailSubscriberScalarFieldEnum | EmailSubscriberScalarFieldEnum[]
  }

  /**
   * EmailSubscriber findMany
   */
  export type EmailSubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscribers to fetch.
     */
    where?: EmailSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscribers to fetch.
     */
    orderBy?: EmailSubscriberOrderByWithRelationInput | EmailSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailSubscribers.
     */
    cursor?: EmailSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSubscribers.
     */
    distinct?: EmailSubscriberScalarFieldEnum | EmailSubscriberScalarFieldEnum[]
  }

  /**
   * EmailSubscriber create
   */
  export type EmailSubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailSubscriber.
     */
    data: XOR<EmailSubscriberCreateInput, EmailSubscriberUncheckedCreateInput>
  }

  /**
   * EmailSubscriber createMany
   */
  export type EmailSubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailSubscribers.
     */
    data: EmailSubscriberCreateManyInput | EmailSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailSubscriber createManyAndReturn
   */
  export type EmailSubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * The data used to create many EmailSubscribers.
     */
    data: EmailSubscriberCreateManyInput | EmailSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailSubscriber update
   */
  export type EmailSubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailSubscriber.
     */
    data: XOR<EmailSubscriberUpdateInput, EmailSubscriberUncheckedUpdateInput>
    /**
     * Choose, which EmailSubscriber to update.
     */
    where: EmailSubscriberWhereUniqueInput
  }

  /**
   * EmailSubscriber updateMany
   */
  export type EmailSubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailSubscribers.
     */
    data: XOR<EmailSubscriberUpdateManyMutationInput, EmailSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which EmailSubscribers to update
     */
    where?: EmailSubscriberWhereInput
    /**
     * Limit how many EmailSubscribers to update.
     */
    limit?: number
  }

  /**
   * EmailSubscriber updateManyAndReturn
   */
  export type EmailSubscriberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * The data used to update EmailSubscribers.
     */
    data: XOR<EmailSubscriberUpdateManyMutationInput, EmailSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which EmailSubscribers to update
     */
    where?: EmailSubscriberWhereInput
    /**
     * Limit how many EmailSubscribers to update.
     */
    limit?: number
  }

  /**
   * EmailSubscriber upsert
   */
  export type EmailSubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailSubscriber to update in case it exists.
     */
    where: EmailSubscriberWhereUniqueInput
    /**
     * In case the EmailSubscriber found by the `where` argument doesn't exist, create a new EmailSubscriber with this data.
     */
    create: XOR<EmailSubscriberCreateInput, EmailSubscriberUncheckedCreateInput>
    /**
     * In case the EmailSubscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailSubscriberUpdateInput, EmailSubscriberUncheckedUpdateInput>
  }

  /**
   * EmailSubscriber delete
   */
  export type EmailSubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
    /**
     * Filter which EmailSubscriber to delete.
     */
    where: EmailSubscriberWhereUniqueInput
  }

  /**
   * EmailSubscriber deleteMany
   */
  export type EmailSubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailSubscribers to delete
     */
    where?: EmailSubscriberWhereInput
    /**
     * Limit how many EmailSubscribers to delete.
     */
    limit?: number
  }

  /**
   * EmailSubscriber without action
   */
  export type EmailSubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscriber
     */
    select?: EmailSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscriber
     */
    omit?: EmailSubscriberOmit<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteMinAggregateOutputType = {
    userId: string | null
    parableId: string | null
    createdAt: Date | null
  }

  export type FavoriteMaxAggregateOutputType = {
    userId: string | null
    parableId: string | null
    createdAt: Date | null
  }

  export type FavoriteCountAggregateOutputType = {
    userId: number
    parableId: number
    createdAt: number
    _all: number
  }


  export type FavoriteMinAggregateInputType = {
    userId?: true
    parableId?: true
    createdAt?: true
  }

  export type FavoriteMaxAggregateInputType = {
    userId?: true
    parableId?: true
    createdAt?: true
  }

  export type FavoriteCountAggregateInputType = {
    userId?: true
    parableId?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    userId: string
    parableId: string
    createdAt: Date
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    parableId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    parableId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    parableId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    userId?: boolean
    parableId?: boolean
    createdAt?: boolean
  }

  export type FavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "parableId" | "createdAt", ExtArgs["result"]["favorite"]>
  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parable?: boolean | ParableDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      parable: Prisma.$ParablePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      parableId: string
      createdAt: Date
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const favoriteWithUserIdOnly = await prisma.favorite.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {FavoriteCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `userId`
     * const favoriteWithUserIdOnly = await prisma.favorite.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites and returns the data updated in the database.
     * @param {FavoriteUpdateManyAndReturnArgs} args - Arguments to update many Favorites.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorites and only return the `userId`
     * const favoriteWithUserIdOnly = await prisma.favorite.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parable<T extends ParableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParableDefaultArgs<ExtArgs>>): Prisma__ParableClient<$Result.GetResult<Prisma.$ParablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */
  interface FavoriteFieldRefs {
    readonly userId: FieldRef<"Favorite", 'String'>
    readonly parableId: FieldRef<"Favorite", 'String'>
    readonly createdAt: FieldRef<"Favorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorite createManyAndReturn
   */
  export type FavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
  }

  /**
   * Favorite updateManyAndReturn
   */
  export type FavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to delete.
     */
    limit?: number
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model TelegramSubscriber
   */

  export type AggregateTelegramSubscriber = {
    _count: TelegramSubscriberCountAggregateOutputType | null
    _avg: TelegramSubscriberAvgAggregateOutputType | null
    _sum: TelegramSubscriberSumAggregateOutputType | null
    _min: TelegramSubscriberMinAggregateOutputType | null
    _max: TelegramSubscriberMaxAggregateOutputType | null
  }

  export type TelegramSubscriberAvgAggregateOutputType = {
    chatId: number | null
  }

  export type TelegramSubscriberSumAggregateOutputType = {
    chatId: bigint | null
  }

  export type TelegramSubscriberMinAggregateOutputType = {
    id: string | null
    chatId: bigint | null
    username: string | null
    active: boolean | null
    language: string | null
    situationUsedAt: Date | null
    createdAt: Date | null
  }

  export type TelegramSubscriberMaxAggregateOutputType = {
    id: string | null
    chatId: bigint | null
    username: string | null
    active: boolean | null
    language: string | null
    situationUsedAt: Date | null
    createdAt: Date | null
  }

  export type TelegramSubscriberCountAggregateOutputType = {
    id: number
    chatId: number
    username: number
    active: number
    language: number
    situationUsedAt: number
    createdAt: number
    _all: number
  }


  export type TelegramSubscriberAvgAggregateInputType = {
    chatId?: true
  }

  export type TelegramSubscriberSumAggregateInputType = {
    chatId?: true
  }

  export type TelegramSubscriberMinAggregateInputType = {
    id?: true
    chatId?: true
    username?: true
    active?: true
    language?: true
    situationUsedAt?: true
    createdAt?: true
  }

  export type TelegramSubscriberMaxAggregateInputType = {
    id?: true
    chatId?: true
    username?: true
    active?: true
    language?: true
    situationUsedAt?: true
    createdAt?: true
  }

  export type TelegramSubscriberCountAggregateInputType = {
    id?: true
    chatId?: true
    username?: true
    active?: true
    language?: true
    situationUsedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TelegramSubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TelegramSubscriber to aggregate.
     */
    where?: TelegramSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSubscribers to fetch.
     */
    orderBy?: TelegramSubscriberOrderByWithRelationInput | TelegramSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TelegramSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TelegramSubscribers
    **/
    _count?: true | TelegramSubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TelegramSubscriberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TelegramSubscriberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TelegramSubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TelegramSubscriberMaxAggregateInputType
  }

  export type GetTelegramSubscriberAggregateType<T extends TelegramSubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateTelegramSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTelegramSubscriber[P]>
      : GetScalarType<T[P], AggregateTelegramSubscriber[P]>
  }




  export type TelegramSubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TelegramSubscriberWhereInput
    orderBy?: TelegramSubscriberOrderByWithAggregationInput | TelegramSubscriberOrderByWithAggregationInput[]
    by: TelegramSubscriberScalarFieldEnum[] | TelegramSubscriberScalarFieldEnum
    having?: TelegramSubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TelegramSubscriberCountAggregateInputType | true
    _avg?: TelegramSubscriberAvgAggregateInputType
    _sum?: TelegramSubscriberSumAggregateInputType
    _min?: TelegramSubscriberMinAggregateInputType
    _max?: TelegramSubscriberMaxAggregateInputType
  }

  export type TelegramSubscriberGroupByOutputType = {
    id: string
    chatId: bigint
    username: string | null
    active: boolean
    language: string
    situationUsedAt: Date | null
    createdAt: Date
    _count: TelegramSubscriberCountAggregateOutputType | null
    _avg: TelegramSubscriberAvgAggregateOutputType | null
    _sum: TelegramSubscriberSumAggregateOutputType | null
    _min: TelegramSubscriberMinAggregateOutputType | null
    _max: TelegramSubscriberMaxAggregateOutputType | null
  }

  type GetTelegramSubscriberGroupByPayload<T extends TelegramSubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TelegramSubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TelegramSubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TelegramSubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], TelegramSubscriberGroupByOutputType[P]>
        }
      >
    >


  export type TelegramSubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    username?: boolean
    active?: boolean
    language?: boolean
    situationUsedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["telegramSubscriber"]>

  export type TelegramSubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    username?: boolean
    active?: boolean
    language?: boolean
    situationUsedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["telegramSubscriber"]>

  export type TelegramSubscriberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    username?: boolean
    active?: boolean
    language?: boolean
    situationUsedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["telegramSubscriber"]>

  export type TelegramSubscriberSelectScalar = {
    id?: boolean
    chatId?: boolean
    username?: boolean
    active?: boolean
    language?: boolean
    situationUsedAt?: boolean
    createdAt?: boolean
  }

  export type TelegramSubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "username" | "active" | "language" | "situationUsedAt" | "createdAt", ExtArgs["result"]["telegramSubscriber"]>

  export type $TelegramSubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TelegramSubscriber"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: bigint
      username: string | null
      active: boolean
      language: string
      situationUsedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["telegramSubscriber"]>
    composites: {}
  }

  type TelegramSubscriberGetPayload<S extends boolean | null | undefined | TelegramSubscriberDefaultArgs> = $Result.GetResult<Prisma.$TelegramSubscriberPayload, S>

  type TelegramSubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TelegramSubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TelegramSubscriberCountAggregateInputType | true
    }

  export interface TelegramSubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TelegramSubscriber'], meta: { name: 'TelegramSubscriber' } }
    /**
     * Find zero or one TelegramSubscriber that matches the filter.
     * @param {TelegramSubscriberFindUniqueArgs} args - Arguments to find a TelegramSubscriber
     * @example
     * // Get one TelegramSubscriber
     * const telegramSubscriber = await prisma.telegramSubscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TelegramSubscriberFindUniqueArgs>(args: SelectSubset<T, TelegramSubscriberFindUniqueArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TelegramSubscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TelegramSubscriberFindUniqueOrThrowArgs} args - Arguments to find a TelegramSubscriber
     * @example
     * // Get one TelegramSubscriber
     * const telegramSubscriber = await prisma.telegramSubscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TelegramSubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, TelegramSubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TelegramSubscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberFindFirstArgs} args - Arguments to find a TelegramSubscriber
     * @example
     * // Get one TelegramSubscriber
     * const telegramSubscriber = await prisma.telegramSubscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TelegramSubscriberFindFirstArgs>(args?: SelectSubset<T, TelegramSubscriberFindFirstArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TelegramSubscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberFindFirstOrThrowArgs} args - Arguments to find a TelegramSubscriber
     * @example
     * // Get one TelegramSubscriber
     * const telegramSubscriber = await prisma.telegramSubscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TelegramSubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, TelegramSubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TelegramSubscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TelegramSubscribers
     * const telegramSubscribers = await prisma.telegramSubscriber.findMany()
     * 
     * // Get first 10 TelegramSubscribers
     * const telegramSubscribers = await prisma.telegramSubscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const telegramSubscriberWithIdOnly = await prisma.telegramSubscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TelegramSubscriberFindManyArgs>(args?: SelectSubset<T, TelegramSubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TelegramSubscriber.
     * @param {TelegramSubscriberCreateArgs} args - Arguments to create a TelegramSubscriber.
     * @example
     * // Create one TelegramSubscriber
     * const TelegramSubscriber = await prisma.telegramSubscriber.create({
     *   data: {
     *     // ... data to create a TelegramSubscriber
     *   }
     * })
     * 
     */
    create<T extends TelegramSubscriberCreateArgs>(args: SelectSubset<T, TelegramSubscriberCreateArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TelegramSubscribers.
     * @param {TelegramSubscriberCreateManyArgs} args - Arguments to create many TelegramSubscribers.
     * @example
     * // Create many TelegramSubscribers
     * const telegramSubscriber = await prisma.telegramSubscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TelegramSubscriberCreateManyArgs>(args?: SelectSubset<T, TelegramSubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TelegramSubscribers and returns the data saved in the database.
     * @param {TelegramSubscriberCreateManyAndReturnArgs} args - Arguments to create many TelegramSubscribers.
     * @example
     * // Create many TelegramSubscribers
     * const telegramSubscriber = await prisma.telegramSubscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TelegramSubscribers and only return the `id`
     * const telegramSubscriberWithIdOnly = await prisma.telegramSubscriber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TelegramSubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, TelegramSubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TelegramSubscriber.
     * @param {TelegramSubscriberDeleteArgs} args - Arguments to delete one TelegramSubscriber.
     * @example
     * // Delete one TelegramSubscriber
     * const TelegramSubscriber = await prisma.telegramSubscriber.delete({
     *   where: {
     *     // ... filter to delete one TelegramSubscriber
     *   }
     * })
     * 
     */
    delete<T extends TelegramSubscriberDeleteArgs>(args: SelectSubset<T, TelegramSubscriberDeleteArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TelegramSubscriber.
     * @param {TelegramSubscriberUpdateArgs} args - Arguments to update one TelegramSubscriber.
     * @example
     * // Update one TelegramSubscriber
     * const telegramSubscriber = await prisma.telegramSubscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TelegramSubscriberUpdateArgs>(args: SelectSubset<T, TelegramSubscriberUpdateArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TelegramSubscribers.
     * @param {TelegramSubscriberDeleteManyArgs} args - Arguments to filter TelegramSubscribers to delete.
     * @example
     * // Delete a few TelegramSubscribers
     * const { count } = await prisma.telegramSubscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TelegramSubscriberDeleteManyArgs>(args?: SelectSubset<T, TelegramSubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TelegramSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TelegramSubscribers
     * const telegramSubscriber = await prisma.telegramSubscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TelegramSubscriberUpdateManyArgs>(args: SelectSubset<T, TelegramSubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TelegramSubscribers and returns the data updated in the database.
     * @param {TelegramSubscriberUpdateManyAndReturnArgs} args - Arguments to update many TelegramSubscribers.
     * @example
     * // Update many TelegramSubscribers
     * const telegramSubscriber = await prisma.telegramSubscriber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TelegramSubscribers and only return the `id`
     * const telegramSubscriberWithIdOnly = await prisma.telegramSubscriber.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TelegramSubscriberUpdateManyAndReturnArgs>(args: SelectSubset<T, TelegramSubscriberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TelegramSubscriber.
     * @param {TelegramSubscriberUpsertArgs} args - Arguments to update or create a TelegramSubscriber.
     * @example
     * // Update or create a TelegramSubscriber
     * const telegramSubscriber = await prisma.telegramSubscriber.upsert({
     *   create: {
     *     // ... data to create a TelegramSubscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TelegramSubscriber we want to update
     *   }
     * })
     */
    upsert<T extends TelegramSubscriberUpsertArgs>(args: SelectSubset<T, TelegramSubscriberUpsertArgs<ExtArgs>>): Prisma__TelegramSubscriberClient<$Result.GetResult<Prisma.$TelegramSubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TelegramSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberCountArgs} args - Arguments to filter TelegramSubscribers to count.
     * @example
     * // Count the number of TelegramSubscribers
     * const count = await prisma.telegramSubscriber.count({
     *   where: {
     *     // ... the filter for the TelegramSubscribers we want to count
     *   }
     * })
    **/
    count<T extends TelegramSubscriberCountArgs>(
      args?: Subset<T, TelegramSubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TelegramSubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TelegramSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TelegramSubscriberAggregateArgs>(args: Subset<T, TelegramSubscriberAggregateArgs>): Prisma.PrismaPromise<GetTelegramSubscriberAggregateType<T>>

    /**
     * Group by TelegramSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSubscriberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TelegramSubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TelegramSubscriberGroupByArgs['orderBy'] }
        : { orderBy?: TelegramSubscriberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TelegramSubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelegramSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TelegramSubscriber model
   */
  readonly fields: TelegramSubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TelegramSubscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TelegramSubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TelegramSubscriber model
   */
  interface TelegramSubscriberFieldRefs {
    readonly id: FieldRef<"TelegramSubscriber", 'String'>
    readonly chatId: FieldRef<"TelegramSubscriber", 'BigInt'>
    readonly username: FieldRef<"TelegramSubscriber", 'String'>
    readonly active: FieldRef<"TelegramSubscriber", 'Boolean'>
    readonly language: FieldRef<"TelegramSubscriber", 'String'>
    readonly situationUsedAt: FieldRef<"TelegramSubscriber", 'DateTime'>
    readonly createdAt: FieldRef<"TelegramSubscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TelegramSubscriber findUnique
   */
  export type TelegramSubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which TelegramSubscriber to fetch.
     */
    where: TelegramSubscriberWhereUniqueInput
  }

  /**
   * TelegramSubscriber findUniqueOrThrow
   */
  export type TelegramSubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which TelegramSubscriber to fetch.
     */
    where: TelegramSubscriberWhereUniqueInput
  }

  /**
   * TelegramSubscriber findFirst
   */
  export type TelegramSubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which TelegramSubscriber to fetch.
     */
    where?: TelegramSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSubscribers to fetch.
     */
    orderBy?: TelegramSubscriberOrderByWithRelationInput | TelegramSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TelegramSubscribers.
     */
    cursor?: TelegramSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelegramSubscribers.
     */
    distinct?: TelegramSubscriberScalarFieldEnum | TelegramSubscriberScalarFieldEnum[]
  }

  /**
   * TelegramSubscriber findFirstOrThrow
   */
  export type TelegramSubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which TelegramSubscriber to fetch.
     */
    where?: TelegramSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSubscribers to fetch.
     */
    orderBy?: TelegramSubscriberOrderByWithRelationInput | TelegramSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TelegramSubscribers.
     */
    cursor?: TelegramSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelegramSubscribers.
     */
    distinct?: TelegramSubscriberScalarFieldEnum | TelegramSubscriberScalarFieldEnum[]
  }

  /**
   * TelegramSubscriber findMany
   */
  export type TelegramSubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which TelegramSubscribers to fetch.
     */
    where?: TelegramSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSubscribers to fetch.
     */
    orderBy?: TelegramSubscriberOrderByWithRelationInput | TelegramSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TelegramSubscribers.
     */
    cursor?: TelegramSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelegramSubscribers.
     */
    distinct?: TelegramSubscriberScalarFieldEnum | TelegramSubscriberScalarFieldEnum[]
  }

  /**
   * TelegramSubscriber create
   */
  export type TelegramSubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to create a TelegramSubscriber.
     */
    data: XOR<TelegramSubscriberCreateInput, TelegramSubscriberUncheckedCreateInput>
  }

  /**
   * TelegramSubscriber createMany
   */
  export type TelegramSubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TelegramSubscribers.
     */
    data: TelegramSubscriberCreateManyInput | TelegramSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TelegramSubscriber createManyAndReturn
   */
  export type TelegramSubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * The data used to create many TelegramSubscribers.
     */
    data: TelegramSubscriberCreateManyInput | TelegramSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TelegramSubscriber update
   */
  export type TelegramSubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to update a TelegramSubscriber.
     */
    data: XOR<TelegramSubscriberUpdateInput, TelegramSubscriberUncheckedUpdateInput>
    /**
     * Choose, which TelegramSubscriber to update.
     */
    where: TelegramSubscriberWhereUniqueInput
  }

  /**
   * TelegramSubscriber updateMany
   */
  export type TelegramSubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TelegramSubscribers.
     */
    data: XOR<TelegramSubscriberUpdateManyMutationInput, TelegramSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which TelegramSubscribers to update
     */
    where?: TelegramSubscriberWhereInput
    /**
     * Limit how many TelegramSubscribers to update.
     */
    limit?: number
  }

  /**
   * TelegramSubscriber updateManyAndReturn
   */
  export type TelegramSubscriberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * The data used to update TelegramSubscribers.
     */
    data: XOR<TelegramSubscriberUpdateManyMutationInput, TelegramSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which TelegramSubscribers to update
     */
    where?: TelegramSubscriberWhereInput
    /**
     * Limit how many TelegramSubscribers to update.
     */
    limit?: number
  }

  /**
   * TelegramSubscriber upsert
   */
  export type TelegramSubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * The filter to search for the TelegramSubscriber to update in case it exists.
     */
    where: TelegramSubscriberWhereUniqueInput
    /**
     * In case the TelegramSubscriber found by the `where` argument doesn't exist, create a new TelegramSubscriber with this data.
     */
    create: XOR<TelegramSubscriberCreateInput, TelegramSubscriberUncheckedCreateInput>
    /**
     * In case the TelegramSubscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TelegramSubscriberUpdateInput, TelegramSubscriberUncheckedUpdateInput>
  }

  /**
   * TelegramSubscriber delete
   */
  export type TelegramSubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
    /**
     * Filter which TelegramSubscriber to delete.
     */
    where: TelegramSubscriberWhereUniqueInput
  }

  /**
   * TelegramSubscriber deleteMany
   */
  export type TelegramSubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TelegramSubscribers to delete
     */
    where?: TelegramSubscriberWhereInput
    /**
     * Limit how many TelegramSubscribers to delete.
     */
    limit?: number
  }

  /**
   * TelegramSubscriber without action
   */
  export type TelegramSubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSubscriber
     */
    select?: TelegramSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSubscriber
     */
    omit?: TelegramSubscriberOmit<ExtArgs> | null
  }


  /**
   * Model SituationRequest
   */

  export type AggregateSituationRequest = {
    _count: SituationRequestCountAggregateOutputType | null
    _min: SituationRequestMinAggregateOutputType | null
    _max: SituationRequestMaxAggregateOutputType | null
  }

  export type SituationRequestMinAggregateOutputType = {
    id: string | null
    ip: string | null
    usedAt: Date | null
  }

  export type SituationRequestMaxAggregateOutputType = {
    id: string | null
    ip: string | null
    usedAt: Date | null
  }

  export type SituationRequestCountAggregateOutputType = {
    id: number
    ip: number
    usedAt: number
    _all: number
  }


  export type SituationRequestMinAggregateInputType = {
    id?: true
    ip?: true
    usedAt?: true
  }

  export type SituationRequestMaxAggregateInputType = {
    id?: true
    ip?: true
    usedAt?: true
  }

  export type SituationRequestCountAggregateInputType = {
    id?: true
    ip?: true
    usedAt?: true
    _all?: true
  }

  export type SituationRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SituationRequest to aggregate.
     */
    where?: SituationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SituationRequests to fetch.
     */
    orderBy?: SituationRequestOrderByWithRelationInput | SituationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SituationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SituationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SituationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SituationRequests
    **/
    _count?: true | SituationRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SituationRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SituationRequestMaxAggregateInputType
  }

  export type GetSituationRequestAggregateType<T extends SituationRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSituationRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSituationRequest[P]>
      : GetScalarType<T[P], AggregateSituationRequest[P]>
  }




  export type SituationRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SituationRequestWhereInput
    orderBy?: SituationRequestOrderByWithAggregationInput | SituationRequestOrderByWithAggregationInput[]
    by: SituationRequestScalarFieldEnum[] | SituationRequestScalarFieldEnum
    having?: SituationRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SituationRequestCountAggregateInputType | true
    _min?: SituationRequestMinAggregateInputType
    _max?: SituationRequestMaxAggregateInputType
  }

  export type SituationRequestGroupByOutputType = {
    id: string
    ip: string
    usedAt: Date
    _count: SituationRequestCountAggregateOutputType | null
    _min: SituationRequestMinAggregateOutputType | null
    _max: SituationRequestMaxAggregateOutputType | null
  }

  type GetSituationRequestGroupByPayload<T extends SituationRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SituationRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SituationRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SituationRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SituationRequestGroupByOutputType[P]>
        }
      >
    >


  export type SituationRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip?: boolean
    usedAt?: boolean
  }, ExtArgs["result"]["situationRequest"]>

  export type SituationRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip?: boolean
    usedAt?: boolean
  }, ExtArgs["result"]["situationRequest"]>

  export type SituationRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip?: boolean
    usedAt?: boolean
  }, ExtArgs["result"]["situationRequest"]>

  export type SituationRequestSelectScalar = {
    id?: boolean
    ip?: boolean
    usedAt?: boolean
  }

  export type SituationRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ip" | "usedAt", ExtArgs["result"]["situationRequest"]>

  export type $SituationRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SituationRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ip: string
      usedAt: Date
    }, ExtArgs["result"]["situationRequest"]>
    composites: {}
  }

  type SituationRequestGetPayload<S extends boolean | null | undefined | SituationRequestDefaultArgs> = $Result.GetResult<Prisma.$SituationRequestPayload, S>

  type SituationRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SituationRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SituationRequestCountAggregateInputType | true
    }

  export interface SituationRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SituationRequest'], meta: { name: 'SituationRequest' } }
    /**
     * Find zero or one SituationRequest that matches the filter.
     * @param {SituationRequestFindUniqueArgs} args - Arguments to find a SituationRequest
     * @example
     * // Get one SituationRequest
     * const situationRequest = await prisma.situationRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SituationRequestFindUniqueArgs>(args: SelectSubset<T, SituationRequestFindUniqueArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SituationRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SituationRequestFindUniqueOrThrowArgs} args - Arguments to find a SituationRequest
     * @example
     * // Get one SituationRequest
     * const situationRequest = await prisma.situationRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SituationRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SituationRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SituationRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestFindFirstArgs} args - Arguments to find a SituationRequest
     * @example
     * // Get one SituationRequest
     * const situationRequest = await prisma.situationRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SituationRequestFindFirstArgs>(args?: SelectSubset<T, SituationRequestFindFirstArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SituationRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestFindFirstOrThrowArgs} args - Arguments to find a SituationRequest
     * @example
     * // Get one SituationRequest
     * const situationRequest = await prisma.situationRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SituationRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SituationRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SituationRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SituationRequests
     * const situationRequests = await prisma.situationRequest.findMany()
     * 
     * // Get first 10 SituationRequests
     * const situationRequests = await prisma.situationRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const situationRequestWithIdOnly = await prisma.situationRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SituationRequestFindManyArgs>(args?: SelectSubset<T, SituationRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SituationRequest.
     * @param {SituationRequestCreateArgs} args - Arguments to create a SituationRequest.
     * @example
     * // Create one SituationRequest
     * const SituationRequest = await prisma.situationRequest.create({
     *   data: {
     *     // ... data to create a SituationRequest
     *   }
     * })
     * 
     */
    create<T extends SituationRequestCreateArgs>(args: SelectSubset<T, SituationRequestCreateArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SituationRequests.
     * @param {SituationRequestCreateManyArgs} args - Arguments to create many SituationRequests.
     * @example
     * // Create many SituationRequests
     * const situationRequest = await prisma.situationRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SituationRequestCreateManyArgs>(args?: SelectSubset<T, SituationRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SituationRequests and returns the data saved in the database.
     * @param {SituationRequestCreateManyAndReturnArgs} args - Arguments to create many SituationRequests.
     * @example
     * // Create many SituationRequests
     * const situationRequest = await prisma.situationRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SituationRequests and only return the `id`
     * const situationRequestWithIdOnly = await prisma.situationRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SituationRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, SituationRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SituationRequest.
     * @param {SituationRequestDeleteArgs} args - Arguments to delete one SituationRequest.
     * @example
     * // Delete one SituationRequest
     * const SituationRequest = await prisma.situationRequest.delete({
     *   where: {
     *     // ... filter to delete one SituationRequest
     *   }
     * })
     * 
     */
    delete<T extends SituationRequestDeleteArgs>(args: SelectSubset<T, SituationRequestDeleteArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SituationRequest.
     * @param {SituationRequestUpdateArgs} args - Arguments to update one SituationRequest.
     * @example
     * // Update one SituationRequest
     * const situationRequest = await prisma.situationRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SituationRequestUpdateArgs>(args: SelectSubset<T, SituationRequestUpdateArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SituationRequests.
     * @param {SituationRequestDeleteManyArgs} args - Arguments to filter SituationRequests to delete.
     * @example
     * // Delete a few SituationRequests
     * const { count } = await prisma.situationRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SituationRequestDeleteManyArgs>(args?: SelectSubset<T, SituationRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SituationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SituationRequests
     * const situationRequest = await prisma.situationRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SituationRequestUpdateManyArgs>(args: SelectSubset<T, SituationRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SituationRequests and returns the data updated in the database.
     * @param {SituationRequestUpdateManyAndReturnArgs} args - Arguments to update many SituationRequests.
     * @example
     * // Update many SituationRequests
     * const situationRequest = await prisma.situationRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SituationRequests and only return the `id`
     * const situationRequestWithIdOnly = await prisma.situationRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SituationRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, SituationRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SituationRequest.
     * @param {SituationRequestUpsertArgs} args - Arguments to update or create a SituationRequest.
     * @example
     * // Update or create a SituationRequest
     * const situationRequest = await prisma.situationRequest.upsert({
     *   create: {
     *     // ... data to create a SituationRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SituationRequest we want to update
     *   }
     * })
     */
    upsert<T extends SituationRequestUpsertArgs>(args: SelectSubset<T, SituationRequestUpsertArgs<ExtArgs>>): Prisma__SituationRequestClient<$Result.GetResult<Prisma.$SituationRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SituationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestCountArgs} args - Arguments to filter SituationRequests to count.
     * @example
     * // Count the number of SituationRequests
     * const count = await prisma.situationRequest.count({
     *   where: {
     *     // ... the filter for the SituationRequests we want to count
     *   }
     * })
    **/
    count<T extends SituationRequestCountArgs>(
      args?: Subset<T, SituationRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SituationRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SituationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SituationRequestAggregateArgs>(args: Subset<T, SituationRequestAggregateArgs>): Prisma.PrismaPromise<GetSituationRequestAggregateType<T>>

    /**
     * Group by SituationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SituationRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SituationRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SituationRequestGroupByArgs['orderBy'] }
        : { orderBy?: SituationRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SituationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSituationRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SituationRequest model
   */
  readonly fields: SituationRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SituationRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SituationRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SituationRequest model
   */
  interface SituationRequestFieldRefs {
    readonly id: FieldRef<"SituationRequest", 'String'>
    readonly ip: FieldRef<"SituationRequest", 'String'>
    readonly usedAt: FieldRef<"SituationRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SituationRequest findUnique
   */
  export type SituationRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * Filter, which SituationRequest to fetch.
     */
    where: SituationRequestWhereUniqueInput
  }

  /**
   * SituationRequest findUniqueOrThrow
   */
  export type SituationRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * Filter, which SituationRequest to fetch.
     */
    where: SituationRequestWhereUniqueInput
  }

  /**
   * SituationRequest findFirst
   */
  export type SituationRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * Filter, which SituationRequest to fetch.
     */
    where?: SituationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SituationRequests to fetch.
     */
    orderBy?: SituationRequestOrderByWithRelationInput | SituationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SituationRequests.
     */
    cursor?: SituationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SituationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SituationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SituationRequests.
     */
    distinct?: SituationRequestScalarFieldEnum | SituationRequestScalarFieldEnum[]
  }

  /**
   * SituationRequest findFirstOrThrow
   */
  export type SituationRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * Filter, which SituationRequest to fetch.
     */
    where?: SituationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SituationRequests to fetch.
     */
    orderBy?: SituationRequestOrderByWithRelationInput | SituationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SituationRequests.
     */
    cursor?: SituationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SituationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SituationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SituationRequests.
     */
    distinct?: SituationRequestScalarFieldEnum | SituationRequestScalarFieldEnum[]
  }

  /**
   * SituationRequest findMany
   */
  export type SituationRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * Filter, which SituationRequests to fetch.
     */
    where?: SituationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SituationRequests to fetch.
     */
    orderBy?: SituationRequestOrderByWithRelationInput | SituationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SituationRequests.
     */
    cursor?: SituationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SituationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SituationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SituationRequests.
     */
    distinct?: SituationRequestScalarFieldEnum | SituationRequestScalarFieldEnum[]
  }

  /**
   * SituationRequest create
   */
  export type SituationRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a SituationRequest.
     */
    data: XOR<SituationRequestCreateInput, SituationRequestUncheckedCreateInput>
  }

  /**
   * SituationRequest createMany
   */
  export type SituationRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SituationRequests.
     */
    data: SituationRequestCreateManyInput | SituationRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SituationRequest createManyAndReturn
   */
  export type SituationRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * The data used to create many SituationRequests.
     */
    data: SituationRequestCreateManyInput | SituationRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SituationRequest update
   */
  export type SituationRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a SituationRequest.
     */
    data: XOR<SituationRequestUpdateInput, SituationRequestUncheckedUpdateInput>
    /**
     * Choose, which SituationRequest to update.
     */
    where: SituationRequestWhereUniqueInput
  }

  /**
   * SituationRequest updateMany
   */
  export type SituationRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SituationRequests.
     */
    data: XOR<SituationRequestUpdateManyMutationInput, SituationRequestUncheckedUpdateManyInput>
    /**
     * Filter which SituationRequests to update
     */
    where?: SituationRequestWhereInput
    /**
     * Limit how many SituationRequests to update.
     */
    limit?: number
  }

  /**
   * SituationRequest updateManyAndReturn
   */
  export type SituationRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * The data used to update SituationRequests.
     */
    data: XOR<SituationRequestUpdateManyMutationInput, SituationRequestUncheckedUpdateManyInput>
    /**
     * Filter which SituationRequests to update
     */
    where?: SituationRequestWhereInput
    /**
     * Limit how many SituationRequests to update.
     */
    limit?: number
  }

  /**
   * SituationRequest upsert
   */
  export type SituationRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the SituationRequest to update in case it exists.
     */
    where: SituationRequestWhereUniqueInput
    /**
     * In case the SituationRequest found by the `where` argument doesn't exist, create a new SituationRequest with this data.
     */
    create: XOR<SituationRequestCreateInput, SituationRequestUncheckedCreateInput>
    /**
     * In case the SituationRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SituationRequestUpdateInput, SituationRequestUncheckedUpdateInput>
  }

  /**
   * SituationRequest delete
   */
  export type SituationRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
    /**
     * Filter which SituationRequest to delete.
     */
    where: SituationRequestWhereUniqueInput
  }

  /**
   * SituationRequest deleteMany
   */
  export type SituationRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SituationRequests to delete
     */
    where?: SituationRequestWhereInput
    /**
     * Limit how many SituationRequests to delete.
     */
    limit?: number
  }

  /**
   * SituationRequest without action
   */
  export type SituationRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SituationRequest
     */
    select?: SituationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SituationRequest
     */
    omit?: SituationRequestOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ParableScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    moral: 'moral',
    titleRu: 'titleRu',
    contentRu: 'contentRu',
    moralRu: 'moralRu',
    source: 'source',
    readTime: 'readTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categoryId: 'categoryId'
  };

  export type ParableScalarFieldEnum = (typeof ParableScalarFieldEnum)[keyof typeof ParableScalarFieldEnum]


  export const QuoteScalarFieldEnum: {
    id: 'id',
    text: 'text',
    textRu: 'textRu',
    author: 'author',
    authorRu: 'authorRu',
    theme: 'theme',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuoteScalarFieldEnum = (typeof QuoteScalarFieldEnum)[keyof typeof QuoteScalarFieldEnum]


  export const DailyDigestScalarFieldEnum: {
    id: 'id',
    date: 'date',
    slug: 'slug',
    titleEn: 'titleEn',
    titleRu: 'titleRu',
    quoteId: 'quoteId',
    parableId: 'parableId',
    conclusionEn: 'conclusionEn',
    conclusionRu: 'conclusionRu',
    questionEn: 'questionEn',
    questionRu: 'questionRu',
    createdAt: 'createdAt'
  };

  export type DailyDigestScalarFieldEnum = (typeof DailyDigestScalarFieldEnum)[keyof typeof DailyDigestScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameRu: 'nameRu',
    slug: 'slug',
    description: 'description',
    color: 'color',
    parablesCount: 'parablesCount'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const DailyParableScalarFieldEnum: {
    id: 'id',
    date: 'date',
    parableId: 'parableId'
  };

  export type DailyParableScalarFieldEnum = (typeof DailyParableScalarFieldEnum)[keyof typeof DailyParableScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    active: 'active',
    categoryPreferences: 'categoryPreferences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const EmailSubscriberScalarFieldEnum: {
    id: 'id',
    email: 'email',
    active: 'active',
    lang: 'lang',
    unsubscribeToken: 'unsubscribeToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailSubscriberScalarFieldEnum = (typeof EmailSubscriberScalarFieldEnum)[keyof typeof EmailSubscriberScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    userId: 'userId',
    parableId: 'parableId',
    createdAt: 'createdAt'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const TelegramSubscriberScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    username: 'username',
    active: 'active',
    language: 'language',
    situationUsedAt: 'situationUsedAt',
    createdAt: 'createdAt'
  };

  export type TelegramSubscriberScalarFieldEnum = (typeof TelegramSubscriberScalarFieldEnum)[keyof typeof TelegramSubscriberScalarFieldEnum]


  export const SituationRequestScalarFieldEnum: {
    id: 'id',
    ip: 'ip',
    usedAt: 'usedAt'
  };

  export type SituationRequestScalarFieldEnum = (typeof SituationRequestScalarFieldEnum)[keyof typeof SituationRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ParableWhereInput = {
    AND?: ParableWhereInput | ParableWhereInput[]
    OR?: ParableWhereInput[]
    NOT?: ParableWhereInput | ParableWhereInput[]
    id?: StringFilter<"Parable"> | string
    title?: StringFilter<"Parable"> | string
    content?: StringFilter<"Parable"> | string
    moral?: StringFilter<"Parable"> | string
    titleRu?: StringNullableFilter<"Parable"> | string | null
    contentRu?: StringNullableFilter<"Parable"> | string | null
    moralRu?: StringNullableFilter<"Parable"> | string | null
    source?: StringNullableFilter<"Parable"> | string | null
    readTime?: IntFilter<"Parable"> | number
    createdAt?: DateTimeFilter<"Parable"> | Date | string
    updatedAt?: DateTimeFilter<"Parable"> | Date | string
    categoryId?: StringFilter<"Parable"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    dailies?: DailyParableListRelationFilter
    digests?: DailyDigestListRelationFilter
    favorites?: FavoriteListRelationFilter
  }

  export type ParableOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    moral?: SortOrder
    titleRu?: SortOrderInput | SortOrder
    contentRu?: SortOrderInput | SortOrder
    moralRu?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    readTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    category?: CategoryOrderByWithRelationInput
    dailies?: DailyParableOrderByRelationAggregateInput
    digests?: DailyDigestOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
  }

  export type ParableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title_categoryId?: ParableTitleCategoryIdCompoundUniqueInput
    AND?: ParableWhereInput | ParableWhereInput[]
    OR?: ParableWhereInput[]
    NOT?: ParableWhereInput | ParableWhereInput[]
    title?: StringFilter<"Parable"> | string
    content?: StringFilter<"Parable"> | string
    moral?: StringFilter<"Parable"> | string
    titleRu?: StringNullableFilter<"Parable"> | string | null
    contentRu?: StringNullableFilter<"Parable"> | string | null
    moralRu?: StringNullableFilter<"Parable"> | string | null
    source?: StringNullableFilter<"Parable"> | string | null
    readTime?: IntFilter<"Parable"> | number
    createdAt?: DateTimeFilter<"Parable"> | Date | string
    updatedAt?: DateTimeFilter<"Parable"> | Date | string
    categoryId?: StringFilter<"Parable"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    dailies?: DailyParableListRelationFilter
    digests?: DailyDigestListRelationFilter
    favorites?: FavoriteListRelationFilter
  }, "id" | "title_categoryId">

  export type ParableOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    moral?: SortOrder
    titleRu?: SortOrderInput | SortOrder
    contentRu?: SortOrderInput | SortOrder
    moralRu?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    readTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    _count?: ParableCountOrderByAggregateInput
    _avg?: ParableAvgOrderByAggregateInput
    _max?: ParableMaxOrderByAggregateInput
    _min?: ParableMinOrderByAggregateInput
    _sum?: ParableSumOrderByAggregateInput
  }

  export type ParableScalarWhereWithAggregatesInput = {
    AND?: ParableScalarWhereWithAggregatesInput | ParableScalarWhereWithAggregatesInput[]
    OR?: ParableScalarWhereWithAggregatesInput[]
    NOT?: ParableScalarWhereWithAggregatesInput | ParableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Parable"> | string
    title?: StringWithAggregatesFilter<"Parable"> | string
    content?: StringWithAggregatesFilter<"Parable"> | string
    moral?: StringWithAggregatesFilter<"Parable"> | string
    titleRu?: StringNullableWithAggregatesFilter<"Parable"> | string | null
    contentRu?: StringNullableWithAggregatesFilter<"Parable"> | string | null
    moralRu?: StringNullableWithAggregatesFilter<"Parable"> | string | null
    source?: StringNullableWithAggregatesFilter<"Parable"> | string | null
    readTime?: IntWithAggregatesFilter<"Parable"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Parable"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Parable"> | Date | string
    categoryId?: StringWithAggregatesFilter<"Parable"> | string
  }

  export type QuoteWhereInput = {
    AND?: QuoteWhereInput | QuoteWhereInput[]
    OR?: QuoteWhereInput[]
    NOT?: QuoteWhereInput | QuoteWhereInput[]
    id?: StringFilter<"Quote"> | string
    text?: StringFilter<"Quote"> | string
    textRu?: StringNullableFilter<"Quote"> | string | null
    author?: StringFilter<"Quote"> | string
    authorRu?: StringNullableFilter<"Quote"> | string | null
    theme?: StringNullableFilter<"Quote"> | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    digests?: DailyDigestListRelationFilter
  }

  export type QuoteOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    textRu?: SortOrderInput | SortOrder
    author?: SortOrder
    authorRu?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    digests?: DailyDigestOrderByRelationAggregateInput
  }

  export type QuoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    text_author?: QuoteTextAuthorCompoundUniqueInput
    AND?: QuoteWhereInput | QuoteWhereInput[]
    OR?: QuoteWhereInput[]
    NOT?: QuoteWhereInput | QuoteWhereInput[]
    text?: StringFilter<"Quote"> | string
    textRu?: StringNullableFilter<"Quote"> | string | null
    author?: StringFilter<"Quote"> | string
    authorRu?: StringNullableFilter<"Quote"> | string | null
    theme?: StringNullableFilter<"Quote"> | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    digests?: DailyDigestListRelationFilter
  }, "id" | "text_author">

  export type QuoteOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    textRu?: SortOrderInput | SortOrder
    author?: SortOrder
    authorRu?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuoteCountOrderByAggregateInput
    _max?: QuoteMaxOrderByAggregateInput
    _min?: QuoteMinOrderByAggregateInput
  }

  export type QuoteScalarWhereWithAggregatesInput = {
    AND?: QuoteScalarWhereWithAggregatesInput | QuoteScalarWhereWithAggregatesInput[]
    OR?: QuoteScalarWhereWithAggregatesInput[]
    NOT?: QuoteScalarWhereWithAggregatesInput | QuoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quote"> | string
    text?: StringWithAggregatesFilter<"Quote"> | string
    textRu?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    author?: StringWithAggregatesFilter<"Quote"> | string
    authorRu?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    theme?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Quote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Quote"> | Date | string
  }

  export type DailyDigestWhereInput = {
    AND?: DailyDigestWhereInput | DailyDigestWhereInput[]
    OR?: DailyDigestWhereInput[]
    NOT?: DailyDigestWhereInput | DailyDigestWhereInput[]
    id?: StringFilter<"DailyDigest"> | string
    date?: DateTimeFilter<"DailyDigest"> | Date | string
    slug?: StringNullableFilter<"DailyDigest"> | string | null
    titleEn?: StringNullableFilter<"DailyDigest"> | string | null
    titleRu?: StringNullableFilter<"DailyDigest"> | string | null
    quoteId?: StringFilter<"DailyDigest"> | string
    parableId?: StringFilter<"DailyDigest"> | string
    conclusionEn?: StringFilter<"DailyDigest"> | string
    conclusionRu?: StringFilter<"DailyDigest"> | string
    questionEn?: StringFilter<"DailyDigest"> | string
    questionRu?: StringFilter<"DailyDigest"> | string
    createdAt?: DateTimeFilter<"DailyDigest"> | Date | string
    quote?: XOR<QuoteScalarRelationFilter, QuoteWhereInput>
    parable?: XOR<ParableScalarRelationFilter, ParableWhereInput>
  }

  export type DailyDigestOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    slug?: SortOrderInput | SortOrder
    titleEn?: SortOrderInput | SortOrder
    titleRu?: SortOrderInput | SortOrder
    quoteId?: SortOrder
    parableId?: SortOrder
    conclusionEn?: SortOrder
    conclusionRu?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    createdAt?: SortOrder
    quote?: QuoteOrderByWithRelationInput
    parable?: ParableOrderByWithRelationInput
  }

  export type DailyDigestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: Date | string
    slug?: string
    parableId_quoteId?: DailyDigestParableIdQuoteIdCompoundUniqueInput
    AND?: DailyDigestWhereInput | DailyDigestWhereInput[]
    OR?: DailyDigestWhereInput[]
    NOT?: DailyDigestWhereInput | DailyDigestWhereInput[]
    titleEn?: StringNullableFilter<"DailyDigest"> | string | null
    titleRu?: StringNullableFilter<"DailyDigest"> | string | null
    quoteId?: StringFilter<"DailyDigest"> | string
    parableId?: StringFilter<"DailyDigest"> | string
    conclusionEn?: StringFilter<"DailyDigest"> | string
    conclusionRu?: StringFilter<"DailyDigest"> | string
    questionEn?: StringFilter<"DailyDigest"> | string
    questionRu?: StringFilter<"DailyDigest"> | string
    createdAt?: DateTimeFilter<"DailyDigest"> | Date | string
    quote?: XOR<QuoteScalarRelationFilter, QuoteWhereInput>
    parable?: XOR<ParableScalarRelationFilter, ParableWhereInput>
  }, "id" | "date" | "slug" | "parableId_quoteId">

  export type DailyDigestOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    slug?: SortOrderInput | SortOrder
    titleEn?: SortOrderInput | SortOrder
    titleRu?: SortOrderInput | SortOrder
    quoteId?: SortOrder
    parableId?: SortOrder
    conclusionEn?: SortOrder
    conclusionRu?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    createdAt?: SortOrder
    _count?: DailyDigestCountOrderByAggregateInput
    _max?: DailyDigestMaxOrderByAggregateInput
    _min?: DailyDigestMinOrderByAggregateInput
  }

  export type DailyDigestScalarWhereWithAggregatesInput = {
    AND?: DailyDigestScalarWhereWithAggregatesInput | DailyDigestScalarWhereWithAggregatesInput[]
    OR?: DailyDigestScalarWhereWithAggregatesInput[]
    NOT?: DailyDigestScalarWhereWithAggregatesInput | DailyDigestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyDigest"> | string
    date?: DateTimeWithAggregatesFilter<"DailyDigest"> | Date | string
    slug?: StringNullableWithAggregatesFilter<"DailyDigest"> | string | null
    titleEn?: StringNullableWithAggregatesFilter<"DailyDigest"> | string | null
    titleRu?: StringNullableWithAggregatesFilter<"DailyDigest"> | string | null
    quoteId?: StringWithAggregatesFilter<"DailyDigest"> | string
    parableId?: StringWithAggregatesFilter<"DailyDigest"> | string
    conclusionEn?: StringWithAggregatesFilter<"DailyDigest"> | string
    conclusionRu?: StringWithAggregatesFilter<"DailyDigest"> | string
    questionEn?: StringWithAggregatesFilter<"DailyDigest"> | string
    questionRu?: StringWithAggregatesFilter<"DailyDigest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DailyDigest"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    nameRu?: StringNullableFilter<"Category"> | string | null
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    color?: StringNullableFilter<"Category"> | string | null
    parablesCount?: IntFilter<"Category"> | number
    parables?: ParableListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameRu?: SortOrderInput | SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    parablesCount?: SortOrder
    parables?: ParableOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    nameRu?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    color?: StringNullableFilter<"Category"> | string | null
    parablesCount?: IntFilter<"Category"> | number
    parables?: ParableListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameRu?: SortOrderInput | SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    parablesCount?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    nameRu?: StringNullableWithAggregatesFilter<"Category"> | string | null
    slug?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    color?: StringNullableWithAggregatesFilter<"Category"> | string | null
    parablesCount?: IntWithAggregatesFilter<"Category"> | number
  }

  export type DailyParableWhereInput = {
    AND?: DailyParableWhereInput | DailyParableWhereInput[]
    OR?: DailyParableWhereInput[]
    NOT?: DailyParableWhereInput | DailyParableWhereInput[]
    id?: StringFilter<"DailyParable"> | string
    date?: DateTimeFilter<"DailyParable"> | Date | string
    parableId?: StringFilter<"DailyParable"> | string
    parable?: XOR<ParableScalarRelationFilter, ParableWhereInput>
  }

  export type DailyParableOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    parableId?: SortOrder
    parable?: ParableOrderByWithRelationInput
  }

  export type DailyParableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: Date | string
    AND?: DailyParableWhereInput | DailyParableWhereInput[]
    OR?: DailyParableWhereInput[]
    NOT?: DailyParableWhereInput | DailyParableWhereInput[]
    parableId?: StringFilter<"DailyParable"> | string
    parable?: XOR<ParableScalarRelationFilter, ParableWhereInput>
  }, "id" | "date">

  export type DailyParableOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    parableId?: SortOrder
    _count?: DailyParableCountOrderByAggregateInput
    _max?: DailyParableMaxOrderByAggregateInput
    _min?: DailyParableMinOrderByAggregateInput
  }

  export type DailyParableScalarWhereWithAggregatesInput = {
    AND?: DailyParableScalarWhereWithAggregatesInput | DailyParableScalarWhereWithAggregatesInput[]
    OR?: DailyParableScalarWhereWithAggregatesInput[]
    NOT?: DailyParableScalarWhereWithAggregatesInput | DailyParableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyParable"> | string
    date?: DateTimeWithAggregatesFilter<"DailyParable"> | Date | string
    parableId?: StringWithAggregatesFilter<"DailyParable"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    favorites?: FavoriteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: SubscriptionOrderByWithRelationInput
    favorites?: FavoriteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    favorites?: FavoriteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: StringFilter<"Subscription"> | string
    active?: BoolFilter<"Subscription"> | boolean
    categoryPreferences?: StringNullableListFilter<"Subscription">
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    categoryPreferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    active?: BoolFilter<"Subscription"> | boolean
    categoryPreferences?: StringNullableListFilter<"Subscription">
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    categoryPreferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    userId?: StringWithAggregatesFilter<"Subscription"> | string
    active?: BoolWithAggregatesFilter<"Subscription"> | boolean
    categoryPreferences?: StringNullableListFilter<"Subscription">
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type EmailSubscriberWhereInput = {
    AND?: EmailSubscriberWhereInput | EmailSubscriberWhereInput[]
    OR?: EmailSubscriberWhereInput[]
    NOT?: EmailSubscriberWhereInput | EmailSubscriberWhereInput[]
    id?: StringFilter<"EmailSubscriber"> | string
    email?: StringFilter<"EmailSubscriber"> | string
    active?: BoolFilter<"EmailSubscriber"> | boolean
    lang?: StringFilter<"EmailSubscriber"> | string
    unsubscribeToken?: StringFilter<"EmailSubscriber"> | string
    createdAt?: DateTimeFilter<"EmailSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"EmailSubscriber"> | Date | string
  }

  export type EmailSubscriberOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    lang?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    unsubscribeToken?: string
    AND?: EmailSubscriberWhereInput | EmailSubscriberWhereInput[]
    OR?: EmailSubscriberWhereInput[]
    NOT?: EmailSubscriberWhereInput | EmailSubscriberWhereInput[]
    active?: BoolFilter<"EmailSubscriber"> | boolean
    lang?: StringFilter<"EmailSubscriber"> | string
    createdAt?: DateTimeFilter<"EmailSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"EmailSubscriber"> | Date | string
  }, "id" | "email" | "unsubscribeToken">

  export type EmailSubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    lang?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailSubscriberCountOrderByAggregateInput
    _max?: EmailSubscriberMaxOrderByAggregateInput
    _min?: EmailSubscriberMinOrderByAggregateInput
  }

  export type EmailSubscriberScalarWhereWithAggregatesInput = {
    AND?: EmailSubscriberScalarWhereWithAggregatesInput | EmailSubscriberScalarWhereWithAggregatesInput[]
    OR?: EmailSubscriberScalarWhereWithAggregatesInput[]
    NOT?: EmailSubscriberScalarWhereWithAggregatesInput | EmailSubscriberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailSubscriber"> | string
    email?: StringWithAggregatesFilter<"EmailSubscriber"> | string
    active?: BoolWithAggregatesFilter<"EmailSubscriber"> | boolean
    lang?: StringWithAggregatesFilter<"EmailSubscriber"> | string
    unsubscribeToken?: StringWithAggregatesFilter<"EmailSubscriber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailSubscriber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailSubscriber"> | Date | string
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    userId?: StringFilter<"Favorite"> | string
    parableId?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parable?: XOR<ParableScalarRelationFilter, ParableWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    userId?: SortOrder
    parableId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    parable?: ParableOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    userId_parableId?: FavoriteUserIdParableIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    userId?: StringFilter<"Favorite"> | string
    parableId?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parable?: XOR<ParableScalarRelationFilter, ParableWhereInput>
  }, "userId_parableId">

  export type FavoriteOrderByWithAggregationInput = {
    userId?: SortOrder
    parableId?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Favorite"> | string
    parableId?: StringWithAggregatesFilter<"Favorite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Favorite"> | Date | string
  }

  export type TelegramSubscriberWhereInput = {
    AND?: TelegramSubscriberWhereInput | TelegramSubscriberWhereInput[]
    OR?: TelegramSubscriberWhereInput[]
    NOT?: TelegramSubscriberWhereInput | TelegramSubscriberWhereInput[]
    id?: StringFilter<"TelegramSubscriber"> | string
    chatId?: BigIntFilter<"TelegramSubscriber"> | bigint | number
    username?: StringNullableFilter<"TelegramSubscriber"> | string | null
    active?: BoolFilter<"TelegramSubscriber"> | boolean
    language?: StringFilter<"TelegramSubscriber"> | string
    situationUsedAt?: DateTimeNullableFilter<"TelegramSubscriber"> | Date | string | null
    createdAt?: DateTimeFilter<"TelegramSubscriber"> | Date | string
  }

  export type TelegramSubscriberOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    username?: SortOrderInput | SortOrder
    active?: SortOrder
    language?: SortOrder
    situationUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TelegramSubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId?: bigint | number
    AND?: TelegramSubscriberWhereInput | TelegramSubscriberWhereInput[]
    OR?: TelegramSubscriberWhereInput[]
    NOT?: TelegramSubscriberWhereInput | TelegramSubscriberWhereInput[]
    username?: StringNullableFilter<"TelegramSubscriber"> | string | null
    active?: BoolFilter<"TelegramSubscriber"> | boolean
    language?: StringFilter<"TelegramSubscriber"> | string
    situationUsedAt?: DateTimeNullableFilter<"TelegramSubscriber"> | Date | string | null
    createdAt?: DateTimeFilter<"TelegramSubscriber"> | Date | string
  }, "id" | "chatId">

  export type TelegramSubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    username?: SortOrderInput | SortOrder
    active?: SortOrder
    language?: SortOrder
    situationUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TelegramSubscriberCountOrderByAggregateInput
    _avg?: TelegramSubscriberAvgOrderByAggregateInput
    _max?: TelegramSubscriberMaxOrderByAggregateInput
    _min?: TelegramSubscriberMinOrderByAggregateInput
    _sum?: TelegramSubscriberSumOrderByAggregateInput
  }

  export type TelegramSubscriberScalarWhereWithAggregatesInput = {
    AND?: TelegramSubscriberScalarWhereWithAggregatesInput | TelegramSubscriberScalarWhereWithAggregatesInput[]
    OR?: TelegramSubscriberScalarWhereWithAggregatesInput[]
    NOT?: TelegramSubscriberScalarWhereWithAggregatesInput | TelegramSubscriberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TelegramSubscriber"> | string
    chatId?: BigIntWithAggregatesFilter<"TelegramSubscriber"> | bigint | number
    username?: StringNullableWithAggregatesFilter<"TelegramSubscriber"> | string | null
    active?: BoolWithAggregatesFilter<"TelegramSubscriber"> | boolean
    language?: StringWithAggregatesFilter<"TelegramSubscriber"> | string
    situationUsedAt?: DateTimeNullableWithAggregatesFilter<"TelegramSubscriber"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TelegramSubscriber"> | Date | string
  }

  export type SituationRequestWhereInput = {
    AND?: SituationRequestWhereInput | SituationRequestWhereInput[]
    OR?: SituationRequestWhereInput[]
    NOT?: SituationRequestWhereInput | SituationRequestWhereInput[]
    id?: StringFilter<"SituationRequest"> | string
    ip?: StringFilter<"SituationRequest"> | string
    usedAt?: DateTimeFilter<"SituationRequest"> | Date | string
  }

  export type SituationRequestOrderByWithRelationInput = {
    id?: SortOrder
    ip?: SortOrder
    usedAt?: SortOrder
  }

  export type SituationRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SituationRequestWhereInput | SituationRequestWhereInput[]
    OR?: SituationRequestWhereInput[]
    NOT?: SituationRequestWhereInput | SituationRequestWhereInput[]
    ip?: StringFilter<"SituationRequest"> | string
    usedAt?: DateTimeFilter<"SituationRequest"> | Date | string
  }, "id">

  export type SituationRequestOrderByWithAggregationInput = {
    id?: SortOrder
    ip?: SortOrder
    usedAt?: SortOrder
    _count?: SituationRequestCountOrderByAggregateInput
    _max?: SituationRequestMaxOrderByAggregateInput
    _min?: SituationRequestMinOrderByAggregateInput
  }

  export type SituationRequestScalarWhereWithAggregatesInput = {
    AND?: SituationRequestScalarWhereWithAggregatesInput | SituationRequestScalarWhereWithAggregatesInput[]
    OR?: SituationRequestScalarWhereWithAggregatesInput[]
    NOT?: SituationRequestScalarWhereWithAggregatesInput | SituationRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SituationRequest"> | string
    ip?: StringWithAggregatesFilter<"SituationRequest"> | string
    usedAt?: DateTimeWithAggregatesFilter<"SituationRequest"> | Date | string
  }

  export type ParableCreateInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutParablesInput
    dailies?: DailyParableCreateNestedManyWithoutParableInput
    digests?: DailyDigestCreateNestedManyWithoutParableInput
    favorites?: FavoriteCreateNestedManyWithoutParableInput
  }

  export type ParableUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    dailies?: DailyParableUncheckedCreateNestedManyWithoutParableInput
    digests?: DailyDigestUncheckedCreateNestedManyWithoutParableInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutParableInput
  }

  export type ParableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutParablesNestedInput
    dailies?: DailyParableUpdateManyWithoutParableNestedInput
    digests?: DailyDigestUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUpdateManyWithoutParableNestedInput
  }

  export type ParableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    dailies?: DailyParableUncheckedUpdateManyWithoutParableNestedInput
    digests?: DailyDigestUncheckedUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutParableNestedInput
  }

  export type ParableCreateManyInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
  }

  export type ParableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type QuoteCreateInput = {
    id?: string
    text: string
    textRu?: string | null
    author: string
    authorRu?: string | null
    theme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    digests?: DailyDigestCreateNestedManyWithoutQuoteInput
  }

  export type QuoteUncheckedCreateInput = {
    id?: string
    text: string
    textRu?: string | null
    author: string
    authorRu?: string | null
    theme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    digests?: DailyDigestUncheckedCreateNestedManyWithoutQuoteInput
  }

  export type QuoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    textRu?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    authorRu?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digests?: DailyDigestUpdateManyWithoutQuoteNestedInput
  }

  export type QuoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    textRu?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    authorRu?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digests?: DailyDigestUncheckedUpdateManyWithoutQuoteNestedInput
  }

  export type QuoteCreateManyInput = {
    id?: string
    text: string
    textRu?: string | null
    author: string
    authorRu?: string | null
    theme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    textRu?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    authorRu?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    textRu?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    authorRu?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestCreateInput = {
    id?: string
    date: Date | string
    slug?: string | null
    titleEn?: string | null
    titleRu?: string | null
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
    quote: QuoteCreateNestedOneWithoutDigestsInput
    parable: ParableCreateNestedOneWithoutDigestsInput
  }

  export type DailyDigestUncheckedCreateInput = {
    id?: string
    date: Date | string
    slug?: string | null
    titleEn?: string | null
    titleRu?: string | null
    quoteId: string
    parableId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
  }

  export type DailyDigestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quote?: QuoteUpdateOneRequiredWithoutDigestsNestedInput
    parable?: ParableUpdateOneRequiredWithoutDigestsNestedInput
  }

  export type DailyDigestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: StringFieldUpdateOperationsInput | string
    parableId?: StringFieldUpdateOperationsInput | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestCreateManyInput = {
    id?: string
    date: Date | string
    slug?: string | null
    titleEn?: string | null
    titleRu?: string | null
    quoteId: string
    parableId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
  }

  export type DailyDigestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: StringFieldUpdateOperationsInput | string
    parableId?: StringFieldUpdateOperationsInput | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    nameRu?: string | null
    slug: string
    description?: string | null
    color?: string | null
    parablesCount?: number
    parables?: ParableCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    nameRu?: string | null
    slug: string
    description?: string | null
    color?: string | null
    parablesCount?: number
    parables?: ParableUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    parablesCount?: IntFieldUpdateOperationsInput | number
    parables?: ParableUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    parablesCount?: IntFieldUpdateOperationsInput | number
    parables?: ParableUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    nameRu?: string | null
    slug: string
    description?: string | null
    color?: string | null
    parablesCount?: number
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    parablesCount?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    parablesCount?: IntFieldUpdateOperationsInput | number
  }

  export type DailyParableCreateInput = {
    id?: string
    date: Date | string
    parable: ParableCreateNestedOneWithoutDailiesInput
  }

  export type DailyParableUncheckedCreateInput = {
    id?: string
    date: Date | string
    parableId: string
  }

  export type DailyParableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    parable?: ParableUpdateOneRequiredWithoutDailiesNestedInput
  }

  export type DailyParableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    parableId?: StringFieldUpdateOperationsInput | string
  }

  export type DailyParableCreateManyInput = {
    id?: string
    date: Date | string
    parableId: string
  }

  export type DailyParableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyParableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    parableId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    active?: boolean
    categoryPreferences?: SubscriptionCreatecategoryPreferencesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    userId: string
    active?: boolean
    categoryPreferences?: SubscriptionCreatecategoryPreferencesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryPreferences?: SubscriptionUpdatecategoryPreferencesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryPreferences?: SubscriptionUpdatecategoryPreferencesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    userId: string
    active?: boolean
    categoryPreferences?: SubscriptionCreatecategoryPreferencesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryPreferences?: SubscriptionUpdatecategoryPreferencesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryPreferences?: SubscriptionUpdatecategoryPreferencesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriberCreateInput = {
    id?: string
    email: string
    active?: boolean
    lang?: string
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSubscriberUncheckedCreateInput = {
    id?: string
    email: string
    active?: boolean
    lang?: string
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSubscriberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    lang?: StringFieldUpdateOperationsInput | string
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    lang?: StringFieldUpdateOperationsInput | string
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriberCreateManyInput = {
    id?: string
    email: string
    active?: boolean
    lang?: string
    unsubscribeToken?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSubscriberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    lang?: StringFieldUpdateOperationsInput | string
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    lang?: StringFieldUpdateOperationsInput | string
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    parable: ParableCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    userId: string
    parableId: string
    createdAt?: Date | string
  }

  export type FavoriteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    parable?: ParableUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    parableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateManyInput = {
    userId: string
    parableId: string
    createdAt?: Date | string
  }

  export type FavoriteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    parableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSubscriberCreateInput = {
    id?: string
    chatId: bigint | number
    username?: string | null
    active?: boolean
    language?: string
    situationUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TelegramSubscriberUncheckedCreateInput = {
    id?: string
    chatId: bigint | number
    username?: string | null
    active?: boolean
    language?: string
    situationUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TelegramSubscriberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    language?: StringFieldUpdateOperationsInput | string
    situationUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSubscriberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    language?: StringFieldUpdateOperationsInput | string
    situationUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSubscriberCreateManyInput = {
    id?: string
    chatId: bigint | number
    username?: string | null
    active?: boolean
    language?: string
    situationUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TelegramSubscriberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    language?: StringFieldUpdateOperationsInput | string
    situationUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSubscriberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    language?: StringFieldUpdateOperationsInput | string
    situationUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SituationRequestCreateInput = {
    id?: string
    ip: string
    usedAt?: Date | string
  }

  export type SituationRequestUncheckedCreateInput = {
    id?: string
    ip: string
    usedAt?: Date | string
  }

  export type SituationRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SituationRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SituationRequestCreateManyInput = {
    id?: string
    ip: string
    usedAt?: Date | string
  }

  export type SituationRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SituationRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type DailyParableListRelationFilter = {
    every?: DailyParableWhereInput
    some?: DailyParableWhereInput
    none?: DailyParableWhereInput
  }

  export type DailyDigestListRelationFilter = {
    every?: DailyDigestWhereInput
    some?: DailyDigestWhereInput
    none?: DailyDigestWhereInput
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DailyParableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyDigestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParableTitleCategoryIdCompoundUniqueInput = {
    title: string
    categoryId: string
  }

  export type ParableCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    moral?: SortOrder
    titleRu?: SortOrder
    contentRu?: SortOrder
    moralRu?: SortOrder
    source?: SortOrder
    readTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
  }

  export type ParableAvgOrderByAggregateInput = {
    readTime?: SortOrder
  }

  export type ParableMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    moral?: SortOrder
    titleRu?: SortOrder
    contentRu?: SortOrder
    moralRu?: SortOrder
    source?: SortOrder
    readTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
  }

  export type ParableMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    moral?: SortOrder
    titleRu?: SortOrder
    contentRu?: SortOrder
    moralRu?: SortOrder
    source?: SortOrder
    readTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
  }

  export type ParableSumOrderByAggregateInput = {
    readTime?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type QuoteTextAuthorCompoundUniqueInput = {
    text: string
    author: string
  }

  export type DailyDigestParableIdQuoteIdCompoundUniqueInput = {
    parableId: string
    quoteId: string
  }

  export type QuoteCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    textRu?: SortOrder
    author?: SortOrder
    authorRu?: SortOrder
    theme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    textRu?: SortOrder
    author?: SortOrder
    authorRu?: SortOrder
    theme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    textRu?: SortOrder
    author?: SortOrder
    authorRu?: SortOrder
    theme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteScalarRelationFilter = {
    is?: QuoteWhereInput
    isNot?: QuoteWhereInput
  }

  export type ParableScalarRelationFilter = {
    is?: ParableWhereInput
    isNot?: ParableWhereInput
  }

  export type DailyDigestCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    slug?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    quoteId?: SortOrder
    parableId?: SortOrder
    conclusionEn?: SortOrder
    conclusionRu?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyDigestMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    slug?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    quoteId?: SortOrder
    parableId?: SortOrder
    conclusionEn?: SortOrder
    conclusionRu?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyDigestMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    slug?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    quoteId?: SortOrder
    parableId?: SortOrder
    conclusionEn?: SortOrder
    conclusionRu?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    createdAt?: SortOrder
  }

  export type ParableListRelationFilter = {
    every?: ParableWhereInput
    some?: ParableWhereInput
    none?: ParableWhereInput
  }

  export type ParableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    color?: SortOrder
    parablesCount?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    parablesCount?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    color?: SortOrder
    parablesCount?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    color?: SortOrder
    parablesCount?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    parablesCount?: SortOrder
  }

  export type DailyParableCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    parableId?: SortOrder
  }

  export type DailyParableMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    parableId?: SortOrder
  }

  export type DailyParableMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    parableId?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    categoryPreferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EmailSubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    lang?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    lang?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    lang?: SortOrder
    unsubscribeToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FavoriteUserIdParableIdCompoundUniqueInput = {
    userId: string
    parableId: string
  }

  export type FavoriteCountOrderByAggregateInput = {
    userId?: SortOrder
    parableId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    userId?: SortOrder
    parableId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    userId?: SortOrder
    parableId?: SortOrder
    createdAt?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TelegramSubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    username?: SortOrder
    active?: SortOrder
    language?: SortOrder
    situationUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TelegramSubscriberAvgOrderByAggregateInput = {
    chatId?: SortOrder
  }

  export type TelegramSubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    username?: SortOrder
    active?: SortOrder
    language?: SortOrder
    situationUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TelegramSubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    username?: SortOrder
    active?: SortOrder
    language?: SortOrder
    situationUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TelegramSubscriberSumOrderByAggregateInput = {
    chatId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SituationRequestCountOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    usedAt?: SortOrder
  }

  export type SituationRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    usedAt?: SortOrder
  }

  export type SituationRequestMinOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    usedAt?: SortOrder
  }

  export type CategoryCreateNestedOneWithoutParablesInput = {
    create?: XOR<CategoryCreateWithoutParablesInput, CategoryUncheckedCreateWithoutParablesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutParablesInput
    connect?: CategoryWhereUniqueInput
  }

  export type DailyParableCreateNestedManyWithoutParableInput = {
    create?: XOR<DailyParableCreateWithoutParableInput, DailyParableUncheckedCreateWithoutParableInput> | DailyParableCreateWithoutParableInput[] | DailyParableUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyParableCreateOrConnectWithoutParableInput | DailyParableCreateOrConnectWithoutParableInput[]
    createMany?: DailyParableCreateManyParableInputEnvelope
    connect?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
  }

  export type DailyDigestCreateNestedManyWithoutParableInput = {
    create?: XOR<DailyDigestCreateWithoutParableInput, DailyDigestUncheckedCreateWithoutParableInput> | DailyDigestCreateWithoutParableInput[] | DailyDigestUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutParableInput | DailyDigestCreateOrConnectWithoutParableInput[]
    createMany?: DailyDigestCreateManyParableInputEnvelope
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutParableInput = {
    create?: XOR<FavoriteCreateWithoutParableInput, FavoriteUncheckedCreateWithoutParableInput> | FavoriteCreateWithoutParableInput[] | FavoriteUncheckedCreateWithoutParableInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutParableInput | FavoriteCreateOrConnectWithoutParableInput[]
    createMany?: FavoriteCreateManyParableInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type DailyParableUncheckedCreateNestedManyWithoutParableInput = {
    create?: XOR<DailyParableCreateWithoutParableInput, DailyParableUncheckedCreateWithoutParableInput> | DailyParableCreateWithoutParableInput[] | DailyParableUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyParableCreateOrConnectWithoutParableInput | DailyParableCreateOrConnectWithoutParableInput[]
    createMany?: DailyParableCreateManyParableInputEnvelope
    connect?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
  }

  export type DailyDigestUncheckedCreateNestedManyWithoutParableInput = {
    create?: XOR<DailyDigestCreateWithoutParableInput, DailyDigestUncheckedCreateWithoutParableInput> | DailyDigestCreateWithoutParableInput[] | DailyDigestUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutParableInput | DailyDigestCreateOrConnectWithoutParableInput[]
    createMany?: DailyDigestCreateManyParableInputEnvelope
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutParableInput = {
    create?: XOR<FavoriteCreateWithoutParableInput, FavoriteUncheckedCreateWithoutParableInput> | FavoriteCreateWithoutParableInput[] | FavoriteUncheckedCreateWithoutParableInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutParableInput | FavoriteCreateOrConnectWithoutParableInput[]
    createMany?: FavoriteCreateManyParableInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CategoryUpdateOneRequiredWithoutParablesNestedInput = {
    create?: XOR<CategoryCreateWithoutParablesInput, CategoryUncheckedCreateWithoutParablesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutParablesInput
    upsert?: CategoryUpsertWithoutParablesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutParablesInput, CategoryUpdateWithoutParablesInput>, CategoryUncheckedUpdateWithoutParablesInput>
  }

  export type DailyParableUpdateManyWithoutParableNestedInput = {
    create?: XOR<DailyParableCreateWithoutParableInput, DailyParableUncheckedCreateWithoutParableInput> | DailyParableCreateWithoutParableInput[] | DailyParableUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyParableCreateOrConnectWithoutParableInput | DailyParableCreateOrConnectWithoutParableInput[]
    upsert?: DailyParableUpsertWithWhereUniqueWithoutParableInput | DailyParableUpsertWithWhereUniqueWithoutParableInput[]
    createMany?: DailyParableCreateManyParableInputEnvelope
    set?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    disconnect?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    delete?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    connect?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    update?: DailyParableUpdateWithWhereUniqueWithoutParableInput | DailyParableUpdateWithWhereUniqueWithoutParableInput[]
    updateMany?: DailyParableUpdateManyWithWhereWithoutParableInput | DailyParableUpdateManyWithWhereWithoutParableInput[]
    deleteMany?: DailyParableScalarWhereInput | DailyParableScalarWhereInput[]
  }

  export type DailyDigestUpdateManyWithoutParableNestedInput = {
    create?: XOR<DailyDigestCreateWithoutParableInput, DailyDigestUncheckedCreateWithoutParableInput> | DailyDigestCreateWithoutParableInput[] | DailyDigestUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutParableInput | DailyDigestCreateOrConnectWithoutParableInput[]
    upsert?: DailyDigestUpsertWithWhereUniqueWithoutParableInput | DailyDigestUpsertWithWhereUniqueWithoutParableInput[]
    createMany?: DailyDigestCreateManyParableInputEnvelope
    set?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    disconnect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    delete?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    update?: DailyDigestUpdateWithWhereUniqueWithoutParableInput | DailyDigestUpdateWithWhereUniqueWithoutParableInput[]
    updateMany?: DailyDigestUpdateManyWithWhereWithoutParableInput | DailyDigestUpdateManyWithWhereWithoutParableInput[]
    deleteMany?: DailyDigestScalarWhereInput | DailyDigestScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutParableNestedInput = {
    create?: XOR<FavoriteCreateWithoutParableInput, FavoriteUncheckedCreateWithoutParableInput> | FavoriteCreateWithoutParableInput[] | FavoriteUncheckedCreateWithoutParableInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutParableInput | FavoriteCreateOrConnectWithoutParableInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutParableInput | FavoriteUpsertWithWhereUniqueWithoutParableInput[]
    createMany?: FavoriteCreateManyParableInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutParableInput | FavoriteUpdateWithWhereUniqueWithoutParableInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutParableInput | FavoriteUpdateManyWithWhereWithoutParableInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type DailyParableUncheckedUpdateManyWithoutParableNestedInput = {
    create?: XOR<DailyParableCreateWithoutParableInput, DailyParableUncheckedCreateWithoutParableInput> | DailyParableCreateWithoutParableInput[] | DailyParableUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyParableCreateOrConnectWithoutParableInput | DailyParableCreateOrConnectWithoutParableInput[]
    upsert?: DailyParableUpsertWithWhereUniqueWithoutParableInput | DailyParableUpsertWithWhereUniqueWithoutParableInput[]
    createMany?: DailyParableCreateManyParableInputEnvelope
    set?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    disconnect?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    delete?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    connect?: DailyParableWhereUniqueInput | DailyParableWhereUniqueInput[]
    update?: DailyParableUpdateWithWhereUniqueWithoutParableInput | DailyParableUpdateWithWhereUniqueWithoutParableInput[]
    updateMany?: DailyParableUpdateManyWithWhereWithoutParableInput | DailyParableUpdateManyWithWhereWithoutParableInput[]
    deleteMany?: DailyParableScalarWhereInput | DailyParableScalarWhereInput[]
  }

  export type DailyDigestUncheckedUpdateManyWithoutParableNestedInput = {
    create?: XOR<DailyDigestCreateWithoutParableInput, DailyDigestUncheckedCreateWithoutParableInput> | DailyDigestCreateWithoutParableInput[] | DailyDigestUncheckedCreateWithoutParableInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutParableInput | DailyDigestCreateOrConnectWithoutParableInput[]
    upsert?: DailyDigestUpsertWithWhereUniqueWithoutParableInput | DailyDigestUpsertWithWhereUniqueWithoutParableInput[]
    createMany?: DailyDigestCreateManyParableInputEnvelope
    set?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    disconnect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    delete?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    update?: DailyDigestUpdateWithWhereUniqueWithoutParableInput | DailyDigestUpdateWithWhereUniqueWithoutParableInput[]
    updateMany?: DailyDigestUpdateManyWithWhereWithoutParableInput | DailyDigestUpdateManyWithWhereWithoutParableInput[]
    deleteMany?: DailyDigestScalarWhereInput | DailyDigestScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutParableNestedInput = {
    create?: XOR<FavoriteCreateWithoutParableInput, FavoriteUncheckedCreateWithoutParableInput> | FavoriteCreateWithoutParableInput[] | FavoriteUncheckedCreateWithoutParableInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutParableInput | FavoriteCreateOrConnectWithoutParableInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutParableInput | FavoriteUpsertWithWhereUniqueWithoutParableInput[]
    createMany?: FavoriteCreateManyParableInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutParableInput | FavoriteUpdateWithWhereUniqueWithoutParableInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutParableInput | FavoriteUpdateManyWithWhereWithoutParableInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type DailyDigestCreateNestedManyWithoutQuoteInput = {
    create?: XOR<DailyDigestCreateWithoutQuoteInput, DailyDigestUncheckedCreateWithoutQuoteInput> | DailyDigestCreateWithoutQuoteInput[] | DailyDigestUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutQuoteInput | DailyDigestCreateOrConnectWithoutQuoteInput[]
    createMany?: DailyDigestCreateManyQuoteInputEnvelope
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
  }

  export type DailyDigestUncheckedCreateNestedManyWithoutQuoteInput = {
    create?: XOR<DailyDigestCreateWithoutQuoteInput, DailyDigestUncheckedCreateWithoutQuoteInput> | DailyDigestCreateWithoutQuoteInput[] | DailyDigestUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutQuoteInput | DailyDigestCreateOrConnectWithoutQuoteInput[]
    createMany?: DailyDigestCreateManyQuoteInputEnvelope
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
  }

  export type DailyDigestUpdateManyWithoutQuoteNestedInput = {
    create?: XOR<DailyDigestCreateWithoutQuoteInput, DailyDigestUncheckedCreateWithoutQuoteInput> | DailyDigestCreateWithoutQuoteInput[] | DailyDigestUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutQuoteInput | DailyDigestCreateOrConnectWithoutQuoteInput[]
    upsert?: DailyDigestUpsertWithWhereUniqueWithoutQuoteInput | DailyDigestUpsertWithWhereUniqueWithoutQuoteInput[]
    createMany?: DailyDigestCreateManyQuoteInputEnvelope
    set?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    disconnect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    delete?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    update?: DailyDigestUpdateWithWhereUniqueWithoutQuoteInput | DailyDigestUpdateWithWhereUniqueWithoutQuoteInput[]
    updateMany?: DailyDigestUpdateManyWithWhereWithoutQuoteInput | DailyDigestUpdateManyWithWhereWithoutQuoteInput[]
    deleteMany?: DailyDigestScalarWhereInput | DailyDigestScalarWhereInput[]
  }

  export type DailyDigestUncheckedUpdateManyWithoutQuoteNestedInput = {
    create?: XOR<DailyDigestCreateWithoutQuoteInput, DailyDigestUncheckedCreateWithoutQuoteInput> | DailyDigestCreateWithoutQuoteInput[] | DailyDigestUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyDigestCreateOrConnectWithoutQuoteInput | DailyDigestCreateOrConnectWithoutQuoteInput[]
    upsert?: DailyDigestUpsertWithWhereUniqueWithoutQuoteInput | DailyDigestUpsertWithWhereUniqueWithoutQuoteInput[]
    createMany?: DailyDigestCreateManyQuoteInputEnvelope
    set?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    disconnect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    delete?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    connect?: DailyDigestWhereUniqueInput | DailyDigestWhereUniqueInput[]
    update?: DailyDigestUpdateWithWhereUniqueWithoutQuoteInput | DailyDigestUpdateWithWhereUniqueWithoutQuoteInput[]
    updateMany?: DailyDigestUpdateManyWithWhereWithoutQuoteInput | DailyDigestUpdateManyWithWhereWithoutQuoteInput[]
    deleteMany?: DailyDigestScalarWhereInput | DailyDigestScalarWhereInput[]
  }

  export type QuoteCreateNestedOneWithoutDigestsInput = {
    create?: XOR<QuoteCreateWithoutDigestsInput, QuoteUncheckedCreateWithoutDigestsInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutDigestsInput
    connect?: QuoteWhereUniqueInput
  }

  export type ParableCreateNestedOneWithoutDigestsInput = {
    create?: XOR<ParableCreateWithoutDigestsInput, ParableUncheckedCreateWithoutDigestsInput>
    connectOrCreate?: ParableCreateOrConnectWithoutDigestsInput
    connect?: ParableWhereUniqueInput
  }

  export type QuoteUpdateOneRequiredWithoutDigestsNestedInput = {
    create?: XOR<QuoteCreateWithoutDigestsInput, QuoteUncheckedCreateWithoutDigestsInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutDigestsInput
    upsert?: QuoteUpsertWithoutDigestsInput
    connect?: QuoteWhereUniqueInput
    update?: XOR<XOR<QuoteUpdateToOneWithWhereWithoutDigestsInput, QuoteUpdateWithoutDigestsInput>, QuoteUncheckedUpdateWithoutDigestsInput>
  }

  export type ParableUpdateOneRequiredWithoutDigestsNestedInput = {
    create?: XOR<ParableCreateWithoutDigestsInput, ParableUncheckedCreateWithoutDigestsInput>
    connectOrCreate?: ParableCreateOrConnectWithoutDigestsInput
    upsert?: ParableUpsertWithoutDigestsInput
    connect?: ParableWhereUniqueInput
    update?: XOR<XOR<ParableUpdateToOneWithWhereWithoutDigestsInput, ParableUpdateWithoutDigestsInput>, ParableUncheckedUpdateWithoutDigestsInput>
  }

  export type ParableCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ParableCreateWithoutCategoryInput, ParableUncheckedCreateWithoutCategoryInput> | ParableCreateWithoutCategoryInput[] | ParableUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ParableCreateOrConnectWithoutCategoryInput | ParableCreateOrConnectWithoutCategoryInput[]
    createMany?: ParableCreateManyCategoryInputEnvelope
    connect?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
  }

  export type ParableUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ParableCreateWithoutCategoryInput, ParableUncheckedCreateWithoutCategoryInput> | ParableCreateWithoutCategoryInput[] | ParableUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ParableCreateOrConnectWithoutCategoryInput | ParableCreateOrConnectWithoutCategoryInput[]
    createMany?: ParableCreateManyCategoryInputEnvelope
    connect?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
  }

  export type ParableUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ParableCreateWithoutCategoryInput, ParableUncheckedCreateWithoutCategoryInput> | ParableCreateWithoutCategoryInput[] | ParableUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ParableCreateOrConnectWithoutCategoryInput | ParableCreateOrConnectWithoutCategoryInput[]
    upsert?: ParableUpsertWithWhereUniqueWithoutCategoryInput | ParableUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ParableCreateManyCategoryInputEnvelope
    set?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    disconnect?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    delete?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    connect?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    update?: ParableUpdateWithWhereUniqueWithoutCategoryInput | ParableUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ParableUpdateManyWithWhereWithoutCategoryInput | ParableUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ParableScalarWhereInput | ParableScalarWhereInput[]
  }

  export type ParableUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ParableCreateWithoutCategoryInput, ParableUncheckedCreateWithoutCategoryInput> | ParableCreateWithoutCategoryInput[] | ParableUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ParableCreateOrConnectWithoutCategoryInput | ParableCreateOrConnectWithoutCategoryInput[]
    upsert?: ParableUpsertWithWhereUniqueWithoutCategoryInput | ParableUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ParableCreateManyCategoryInputEnvelope
    set?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    disconnect?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    delete?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    connect?: ParableWhereUniqueInput | ParableWhereUniqueInput[]
    update?: ParableUpdateWithWhereUniqueWithoutCategoryInput | ParableUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ParableUpdateManyWithWhereWithoutCategoryInput | ParableUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ParableScalarWhereInput | ParableScalarWhereInput[]
  }

  export type ParableCreateNestedOneWithoutDailiesInput = {
    create?: XOR<ParableCreateWithoutDailiesInput, ParableUncheckedCreateWithoutDailiesInput>
    connectOrCreate?: ParableCreateOrConnectWithoutDailiesInput
    connect?: ParableWhereUniqueInput
  }

  export type ParableUpdateOneRequiredWithoutDailiesNestedInput = {
    create?: XOR<ParableCreateWithoutDailiesInput, ParableUncheckedCreateWithoutDailiesInput>
    connectOrCreate?: ParableCreateOrConnectWithoutDailiesInput
    upsert?: ParableUpsertWithoutDailiesInput
    connect?: ParableWhereUniqueInput
    update?: XOR<XOR<ParableUpdateToOneWithWhereWithoutDailiesInput, ParableUpdateWithoutDailiesInput>, ParableUncheckedUpdateWithoutDailiesInput>
  }

  export type SubscriptionCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type SubscriptionUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type SubscriptionCreatecategoryPreferencesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SubscriptionUpdatecategoryPreferencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput
    upsert?: UserUpsertWithoutSubscriptionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionInput, UserUpdateWithoutSubscriptionInput>, UserUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type ParableCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ParableCreateWithoutFavoritesInput, ParableUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ParableCreateOrConnectWithoutFavoritesInput
    connect?: ParableWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type ParableUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ParableCreateWithoutFavoritesInput, ParableUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ParableCreateOrConnectWithoutFavoritesInput
    upsert?: ParableUpsertWithoutFavoritesInput
    connect?: ParableWhereUniqueInput
    update?: XOR<XOR<ParableUpdateToOneWithWhereWithoutFavoritesInput, ParableUpdateWithoutFavoritesInput>, ParableUncheckedUpdateWithoutFavoritesInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CategoryCreateWithoutParablesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    color?: string | null
    parablesCount?: number
  }

  export type CategoryUncheckedCreateWithoutParablesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    color?: string | null
    parablesCount?: number
  }

  export type CategoryCreateOrConnectWithoutParablesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParablesInput, CategoryUncheckedCreateWithoutParablesInput>
  }

  export type DailyParableCreateWithoutParableInput = {
    id?: string
    date: Date | string
  }

  export type DailyParableUncheckedCreateWithoutParableInput = {
    id?: string
    date: Date | string
  }

  export type DailyParableCreateOrConnectWithoutParableInput = {
    where: DailyParableWhereUniqueInput
    create: XOR<DailyParableCreateWithoutParableInput, DailyParableUncheckedCreateWithoutParableInput>
  }

  export type DailyParableCreateManyParableInputEnvelope = {
    data: DailyParableCreateManyParableInput | DailyParableCreateManyParableInput[]
    skipDuplicates?: boolean
  }

  export type DailyDigestCreateWithoutParableInput = {
    id?: string
    date: Date | string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
    quote: QuoteCreateNestedOneWithoutDigestsInput
  }

  export type DailyDigestUncheckedCreateWithoutParableInput = {
    id?: string
    date: Date | string
    quoteId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
  }

  export type DailyDigestCreateOrConnectWithoutParableInput = {
    where: DailyDigestWhereUniqueInput
    create: XOR<DailyDigestCreateWithoutParableInput, DailyDigestUncheckedCreateWithoutParableInput>
  }

  export type DailyDigestCreateManyParableInputEnvelope = {
    data: DailyDigestCreateManyParableInput | DailyDigestCreateManyParableInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutParableInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutParableInput = {
    userId: string
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutParableInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutParableInput, FavoriteUncheckedCreateWithoutParableInput>
  }

  export type FavoriteCreateManyParableInputEnvelope = {
    data: FavoriteCreateManyParableInput | FavoriteCreateManyParableInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutParablesInput = {
    update: XOR<CategoryUpdateWithoutParablesInput, CategoryUncheckedUpdateWithoutParablesInput>
    create: XOR<CategoryCreateWithoutParablesInput, CategoryUncheckedCreateWithoutParablesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutParablesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutParablesInput, CategoryUncheckedUpdateWithoutParablesInput>
  }

  export type CategoryUpdateWithoutParablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    parablesCount?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateWithoutParablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    parablesCount?: IntFieldUpdateOperationsInput | number
  }

  export type DailyParableUpsertWithWhereUniqueWithoutParableInput = {
    where: DailyParableWhereUniqueInput
    update: XOR<DailyParableUpdateWithoutParableInput, DailyParableUncheckedUpdateWithoutParableInput>
    create: XOR<DailyParableCreateWithoutParableInput, DailyParableUncheckedCreateWithoutParableInput>
  }

  export type DailyParableUpdateWithWhereUniqueWithoutParableInput = {
    where: DailyParableWhereUniqueInput
    data: XOR<DailyParableUpdateWithoutParableInput, DailyParableUncheckedUpdateWithoutParableInput>
  }

  export type DailyParableUpdateManyWithWhereWithoutParableInput = {
    where: DailyParableScalarWhereInput
    data: XOR<DailyParableUpdateManyMutationInput, DailyParableUncheckedUpdateManyWithoutParableInput>
  }

  export type DailyParableScalarWhereInput = {
    AND?: DailyParableScalarWhereInput | DailyParableScalarWhereInput[]
    OR?: DailyParableScalarWhereInput[]
    NOT?: DailyParableScalarWhereInput | DailyParableScalarWhereInput[]
    id?: StringFilter<"DailyParable"> | string
    date?: DateTimeFilter<"DailyParable"> | Date | string
    parableId?: StringFilter<"DailyParable"> | string
  }

  export type DailyDigestUpsertWithWhereUniqueWithoutParableInput = {
    where: DailyDigestWhereUniqueInput
    update: XOR<DailyDigestUpdateWithoutParableInput, DailyDigestUncheckedUpdateWithoutParableInput>
    create: XOR<DailyDigestCreateWithoutParableInput, DailyDigestUncheckedCreateWithoutParableInput>
  }

  export type DailyDigestUpdateWithWhereUniqueWithoutParableInput = {
    where: DailyDigestWhereUniqueInput
    data: XOR<DailyDigestUpdateWithoutParableInput, DailyDigestUncheckedUpdateWithoutParableInput>
  }

  export type DailyDigestUpdateManyWithWhereWithoutParableInput = {
    where: DailyDigestScalarWhereInput
    data: XOR<DailyDigestUpdateManyMutationInput, DailyDigestUncheckedUpdateManyWithoutParableInput>
  }

  export type DailyDigestScalarWhereInput = {
    AND?: DailyDigestScalarWhereInput | DailyDigestScalarWhereInput[]
    OR?: DailyDigestScalarWhereInput[]
    NOT?: DailyDigestScalarWhereInput | DailyDigestScalarWhereInput[]
    id?: StringFilter<"DailyDigest"> | string
    date?: DateTimeFilter<"DailyDigest"> | Date | string
    quoteId?: StringFilter<"DailyDigest"> | string
    parableId?: StringFilter<"DailyDigest"> | string
    conclusionEn?: StringFilter<"DailyDigest"> | string
    conclusionRu?: StringFilter<"DailyDigest"> | string
    questionEn?: StringFilter<"DailyDigest"> | string
    questionRu?: StringFilter<"DailyDigest"> | string
    createdAt?: DateTimeFilter<"DailyDigest"> | Date | string
  }

  export type FavoriteUpsertWithWhereUniqueWithoutParableInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutParableInput, FavoriteUncheckedUpdateWithoutParableInput>
    create: XOR<FavoriteCreateWithoutParableInput, FavoriteUncheckedCreateWithoutParableInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutParableInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutParableInput, FavoriteUncheckedUpdateWithoutParableInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutParableInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutParableInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    userId?: StringFilter<"Favorite"> | string
    parableId?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
  }

  export type DailyDigestCreateWithoutQuoteInput = {
    id?: string
    date: Date | string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
    parable: ParableCreateNestedOneWithoutDigestsInput
  }

  export type DailyDigestUncheckedCreateWithoutQuoteInput = {
    id?: string
    date: Date | string
    parableId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
  }

  export type DailyDigestCreateOrConnectWithoutQuoteInput = {
    where: DailyDigestWhereUniqueInput
    create: XOR<DailyDigestCreateWithoutQuoteInput, DailyDigestUncheckedCreateWithoutQuoteInput>
  }

  export type DailyDigestCreateManyQuoteInputEnvelope = {
    data: DailyDigestCreateManyQuoteInput | DailyDigestCreateManyQuoteInput[]
    skipDuplicates?: boolean
  }

  export type DailyDigestUpsertWithWhereUniqueWithoutQuoteInput = {
    where: DailyDigestWhereUniqueInput
    update: XOR<DailyDigestUpdateWithoutQuoteInput, DailyDigestUncheckedUpdateWithoutQuoteInput>
    create: XOR<DailyDigestCreateWithoutQuoteInput, DailyDigestUncheckedCreateWithoutQuoteInput>
  }

  export type DailyDigestUpdateWithWhereUniqueWithoutQuoteInput = {
    where: DailyDigestWhereUniqueInput
    data: XOR<DailyDigestUpdateWithoutQuoteInput, DailyDigestUncheckedUpdateWithoutQuoteInput>
  }

  export type DailyDigestUpdateManyWithWhereWithoutQuoteInput = {
    where: DailyDigestScalarWhereInput
    data: XOR<DailyDigestUpdateManyMutationInput, DailyDigestUncheckedUpdateManyWithoutQuoteInput>
  }

  export type QuoteCreateWithoutDigestsInput = {
    id?: string
    text: string
    textRu?: string | null
    author: string
    authorRu?: string | null
    theme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteUncheckedCreateWithoutDigestsInput = {
    id?: string
    text: string
    textRu?: string | null
    author: string
    authorRu?: string | null
    theme?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteCreateOrConnectWithoutDigestsInput = {
    where: QuoteWhereUniqueInput
    create: XOR<QuoteCreateWithoutDigestsInput, QuoteUncheckedCreateWithoutDigestsInput>
  }

  export type ParableCreateWithoutDigestsInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutParablesInput
    dailies?: DailyParableCreateNestedManyWithoutParableInput
    favorites?: FavoriteCreateNestedManyWithoutParableInput
  }

  export type ParableUncheckedCreateWithoutDigestsInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    dailies?: DailyParableUncheckedCreateNestedManyWithoutParableInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutParableInput
  }

  export type ParableCreateOrConnectWithoutDigestsInput = {
    where: ParableWhereUniqueInput
    create: XOR<ParableCreateWithoutDigestsInput, ParableUncheckedCreateWithoutDigestsInput>
  }

  export type QuoteUpsertWithoutDigestsInput = {
    update: XOR<QuoteUpdateWithoutDigestsInput, QuoteUncheckedUpdateWithoutDigestsInput>
    create: XOR<QuoteCreateWithoutDigestsInput, QuoteUncheckedCreateWithoutDigestsInput>
    where?: QuoteWhereInput
  }

  export type QuoteUpdateToOneWithWhereWithoutDigestsInput = {
    where?: QuoteWhereInput
    data: XOR<QuoteUpdateWithoutDigestsInput, QuoteUncheckedUpdateWithoutDigestsInput>
  }

  export type QuoteUpdateWithoutDigestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    textRu?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    authorRu?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteUncheckedUpdateWithoutDigestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    textRu?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    authorRu?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParableUpsertWithoutDigestsInput = {
    update: XOR<ParableUpdateWithoutDigestsInput, ParableUncheckedUpdateWithoutDigestsInput>
    create: XOR<ParableCreateWithoutDigestsInput, ParableUncheckedCreateWithoutDigestsInput>
    where?: ParableWhereInput
  }

  export type ParableUpdateToOneWithWhereWithoutDigestsInput = {
    where?: ParableWhereInput
    data: XOR<ParableUpdateWithoutDigestsInput, ParableUncheckedUpdateWithoutDigestsInput>
  }

  export type ParableUpdateWithoutDigestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutParablesNestedInput
    dailies?: DailyParableUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUpdateManyWithoutParableNestedInput
  }

  export type ParableUncheckedUpdateWithoutDigestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    dailies?: DailyParableUncheckedUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutParableNestedInput
  }

  export type ParableCreateWithoutCategoryInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailies?: DailyParableCreateNestedManyWithoutParableInput
    digests?: DailyDigestCreateNestedManyWithoutParableInput
    favorites?: FavoriteCreateNestedManyWithoutParableInput
  }

  export type ParableUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailies?: DailyParableUncheckedCreateNestedManyWithoutParableInput
    digests?: DailyDigestUncheckedCreateNestedManyWithoutParableInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutParableInput
  }

  export type ParableCreateOrConnectWithoutCategoryInput = {
    where: ParableWhereUniqueInput
    create: XOR<ParableCreateWithoutCategoryInput, ParableUncheckedCreateWithoutCategoryInput>
  }

  export type ParableCreateManyCategoryInputEnvelope = {
    data: ParableCreateManyCategoryInput | ParableCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ParableUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ParableWhereUniqueInput
    update: XOR<ParableUpdateWithoutCategoryInput, ParableUncheckedUpdateWithoutCategoryInput>
    create: XOR<ParableCreateWithoutCategoryInput, ParableUncheckedCreateWithoutCategoryInput>
  }

  export type ParableUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ParableWhereUniqueInput
    data: XOR<ParableUpdateWithoutCategoryInput, ParableUncheckedUpdateWithoutCategoryInput>
  }

  export type ParableUpdateManyWithWhereWithoutCategoryInput = {
    where: ParableScalarWhereInput
    data: XOR<ParableUpdateManyMutationInput, ParableUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ParableScalarWhereInput = {
    AND?: ParableScalarWhereInput | ParableScalarWhereInput[]
    OR?: ParableScalarWhereInput[]
    NOT?: ParableScalarWhereInput | ParableScalarWhereInput[]
    id?: StringFilter<"Parable"> | string
    title?: StringFilter<"Parable"> | string
    content?: StringFilter<"Parable"> | string
    moral?: StringFilter<"Parable"> | string
    titleRu?: StringNullableFilter<"Parable"> | string | null
    contentRu?: StringNullableFilter<"Parable"> | string | null
    moralRu?: StringNullableFilter<"Parable"> | string | null
    source?: StringNullableFilter<"Parable"> | string | null
    readTime?: IntFilter<"Parable"> | number
    createdAt?: DateTimeFilter<"Parable"> | Date | string
    updatedAt?: DateTimeFilter<"Parable"> | Date | string
    categoryId?: StringFilter<"Parable"> | string
  }

  export type ParableCreateWithoutDailiesInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutParablesInput
    digests?: DailyDigestCreateNestedManyWithoutParableInput
    favorites?: FavoriteCreateNestedManyWithoutParableInput
  }

  export type ParableUncheckedCreateWithoutDailiesInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    digests?: DailyDigestUncheckedCreateNestedManyWithoutParableInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutParableInput
  }

  export type ParableCreateOrConnectWithoutDailiesInput = {
    where: ParableWhereUniqueInput
    create: XOR<ParableCreateWithoutDailiesInput, ParableUncheckedCreateWithoutDailiesInput>
  }

  export type ParableUpsertWithoutDailiesInput = {
    update: XOR<ParableUpdateWithoutDailiesInput, ParableUncheckedUpdateWithoutDailiesInput>
    create: XOR<ParableCreateWithoutDailiesInput, ParableUncheckedCreateWithoutDailiesInput>
    where?: ParableWhereInput
  }

  export type ParableUpdateToOneWithWhereWithoutDailiesInput = {
    where?: ParableWhereInput
    data: XOR<ParableUpdateWithoutDailiesInput, ParableUncheckedUpdateWithoutDailiesInput>
  }

  export type ParableUpdateWithoutDailiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutParablesNestedInput
    digests?: DailyDigestUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUpdateManyWithoutParableNestedInput
  }

  export type ParableUncheckedUpdateWithoutDailiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    digests?: DailyDigestUncheckedUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutParableNestedInput
  }

  export type SubscriptionCreateWithoutUserInput = {
    id?: string
    active?: boolean
    categoryPreferences?: SubscriptionCreatecategoryPreferencesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    active?: boolean
    categoryPreferences?: SubscriptionCreatecategoryPreferencesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateWithoutUserInput = {
    createdAt?: Date | string
    parable: ParableCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    parableId: string
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithoutUserInput = {
    update: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutUserInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryPreferences?: SubscriptionUpdatecategoryPreferencesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryPreferences?: SubscriptionUpdatecategoryPreferencesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutSubscriptionInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscriptionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
  }

  export type UserUpsertWithoutSubscriptionInput = {
    update: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFavoritesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type ParableCreateWithoutFavoritesInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutParablesInput
    dailies?: DailyParableCreateNestedManyWithoutParableInput
    digests?: DailyDigestCreateNestedManyWithoutParableInput
  }

  export type ParableUncheckedCreateWithoutFavoritesInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    dailies?: DailyParableUncheckedCreateNestedManyWithoutParableInput
    digests?: DailyDigestUncheckedCreateNestedManyWithoutParableInput
  }

  export type ParableCreateOrConnectWithoutFavoritesInput = {
    where: ParableWhereUniqueInput
    create: XOR<ParableCreateWithoutFavoritesInput, ParableUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ParableUpsertWithoutFavoritesInput = {
    update: XOR<ParableUpdateWithoutFavoritesInput, ParableUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ParableCreateWithoutFavoritesInput, ParableUncheckedCreateWithoutFavoritesInput>
    where?: ParableWhereInput
  }

  export type ParableUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ParableWhereInput
    data: XOR<ParableUpdateWithoutFavoritesInput, ParableUncheckedUpdateWithoutFavoritesInput>
  }

  export type ParableUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutParablesNestedInput
    dailies?: DailyParableUpdateManyWithoutParableNestedInput
    digests?: DailyDigestUpdateManyWithoutParableNestedInput
  }

  export type ParableUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    dailies?: DailyParableUncheckedUpdateManyWithoutParableNestedInput
    digests?: DailyDigestUncheckedUpdateManyWithoutParableNestedInput
  }

  export type DailyParableCreateManyParableInput = {
    id?: string
    date: Date | string
  }

  export type DailyDigestCreateManyParableInput = {
    id?: string
    date: Date | string
    quoteId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
  }

  export type FavoriteCreateManyParableInput = {
    userId: string
    createdAt?: Date | string
  }

  export type DailyParableUpdateWithoutParableInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyParableUncheckedUpdateWithoutParableInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyParableUncheckedUpdateManyWithoutParableInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestUpdateWithoutParableInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quote?: QuoteUpdateOneRequiredWithoutDigestsNestedInput
  }

  export type DailyDigestUncheckedUpdateWithoutParableInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteId?: StringFieldUpdateOperationsInput | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestUncheckedUpdateManyWithoutParableInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteId?: StringFieldUpdateOperationsInput | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpdateWithoutParableInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutParableInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutParableInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestCreateManyQuoteInput = {
    id?: string
    date: Date | string
    parableId: string
    conclusionEn: string
    conclusionRu: string
    questionEn: string
    questionRu: string
    createdAt?: Date | string
  }

  export type DailyDigestUpdateWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parable?: ParableUpdateOneRequiredWithoutDigestsNestedInput
  }

  export type DailyDigestUncheckedUpdateWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    parableId?: StringFieldUpdateOperationsInput | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDigestUncheckedUpdateManyWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    parableId?: StringFieldUpdateOperationsInput | string
    conclusionEn?: StringFieldUpdateOperationsInput | string
    conclusionRu?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParableCreateManyCategoryInput = {
    id?: string
    title: string
    content: string
    moral: string
    titleRu?: string | null
    contentRu?: string | null
    moralRu?: string | null
    source?: string | null
    readTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParableUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailies?: DailyParableUpdateManyWithoutParableNestedInput
    digests?: DailyDigestUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUpdateManyWithoutParableNestedInput
  }

  export type ParableUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailies?: DailyParableUncheckedUpdateManyWithoutParableNestedInput
    digests?: DailyDigestUncheckedUpdateManyWithoutParableNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutParableNestedInput
  }

  export type ParableUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    moral?: StringFieldUpdateOperationsInput | string
    titleRu?: NullableStringFieldUpdateOperationsInput | string | null
    contentRu?: NullableStringFieldUpdateOperationsInput | string | null
    moralRu?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateManyUserInput = {
    parableId: string
    createdAt?: Date | string
  }

  export type FavoriteUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parable?: ParableUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    parableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    parableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}