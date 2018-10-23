import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Monoid, unsafeMonoidArray } from './Monoid'
import { Option, none, some } from './Option'
import { Ord, max as maxOrd, min as minOrd } from './Ord'
import { Plus, Plus1, Plus2, Plus2C, Plus3, Plus3C } from './Plus'
import { Semiring } from './Semiring'
import { Setoid } from './Setoid'
import { Predicate, identity } from './function'
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable3,
  Foldable2C,
  Foldable3C,
  FoldableComposition,
  FoldableComposition11,
  FoldableComposition12,
  FoldableComposition21,
  FoldableComposition22,
  foldMap
} from './Foldable'
import { applyFirst } from './Apply'

/**
 * @typeclass
 * @since 1.10.0
 */
export interface Foldable2v<F> extends Foldable<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2v1<F extends URIS> extends Foldable1<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Type<F, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Type<F, A>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2v2<F extends URIS2> extends Foldable2<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Type2<F, L, A>, f: (a: A) => M) => M
  readonly foldr: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2v3<F extends URIS3> extends Foldable3<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <U, L, A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M
  readonly foldr: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2v2C<F extends URIS2, L> extends Foldable2C<F, L> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Type2<F, L, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Type2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2v3C<F extends URIS3, U, L> extends Foldable3C<F, U, L> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2vComposition<F, G> extends FoldableComposition<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, HKT<G, A>>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: HKT<F, HKT<G, A>>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2vComposition11<F extends URIS, G extends URIS> extends FoldableComposition11<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Type<F, Type<G, A>>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Type<F, Type<G, A>>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2vComposition12<F extends URIS, G extends URIS2> extends FoldableComposition12<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Type<F, Type2<G, L, A>>, f: (a: A) => M) => M
  readonly foldr: <L, A, B>(fa: Type<F, Type2<G, L, A>>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2vComposition21<F extends URIS2, G extends URIS> extends FoldableComposition21<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Type2<F, L, Type<G, A>>, f: (a: A) => M) => M
  readonly foldr: <L, A, B>(fa: Type2<F, L, Type<G, A>>, b: B, f: (a: A, b: B) => B) => B
}

export interface Foldable2vComposition22<F extends URIS2, G extends URIS2> extends FoldableComposition22<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <LF, LG, A>(fa: Type2<F, LF, Type2<G, LG, A>>, f: (a: A) => M) => M
  readonly foldr: <LF, LG, A, B>(fa: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (a: A, b: B) => B) => B
}

export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2v2<F>,
  G: Foldable2v2<G>
): Foldable2vComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2v2<F>,
  G: Foldable2v1<G>
): Foldable2vComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable2v1<F>,
  G: Foldable2v2<G>
): Foldable2vComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable2v1<F>,
  G: Foldable2v1<G>
): Foldable2vComposition11<F, G>
export function getFoldableComposition<F, G>(F: Foldable2v<F>, G: Foldable2v<G>): Foldable2vComposition<F, G>
/**
 * @function
 * @since 1.10.0
 */
export function getFoldableComposition<F, G>(F: Foldable2v<F>, G: Foldable2v<G>): Foldable2vComposition<F, G> {
  return {
    reduce: (fga, b, f) => F.reduce(fga, b, (b, ga) => G.reduce(ga, b, f)),
    foldMap: M => {
      const foldMapF = F.foldMap(M)
      const foldMapG = G.foldMap(M)
      return (fa, f) => foldMapF(fa, ga => foldMapG(ga, f))
    },
    foldr: (fa, b, f) => F.foldr(fa, b, (ga, b) => G.foldr(ga, b, f))
  }
}

export function fold<M, F extends URIS3>(M: Monoid<M>, F: Foldable2v3<F>): <U, L>(fa: Type3<F, U, L, M>) => M
export function fold<M, F extends URIS3, U, L>(M: Monoid<M>, F: Foldable2v3C<F, U, L>): (fa: Type3<F, U, L, M>) => M
export function fold<M, F extends URIS2>(M: Monoid<M>, F: Foldable2v2<F>): <L>(fa: Type2<F, L, M>) => M
export function fold<M, F extends URIS2, L>(M: Monoid<M>, F: Foldable2v2C<F, L>): (fa: Type2<F, L, M>) => M
export function fold<M, F extends URIS>(M: Monoid<M>, F: Foldable2v1<F>): (fa: Type<F, M>) => M
export function fold<M, F>(M: Monoid<M>, F: Foldable2v<F>): (fa: HKT<F, M>) => M
/**
 * @function
 * @since 1.10.0
 */
export function fold<M, F>(M: Monoid<M>, F: Foldable2v<F>): (fa: HKT<F, M>) => M {
  return fa => F.reduce(fa, M.empty, M.concat)
}

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.
 */
export function foldM<M extends URIS3, F extends URIS>(
  M: Monad3<M>,
  F: Foldable2v1<F>
): <U, L, A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => Type3<M, U, L, B>) => Type3<M, U, L, B>
export function foldM<M extends URIS3, F extends URIS, U, L>(
  M: Monad3C<M, U, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => Type3<M, U, L, B>) => Type3<M, U, L, B>
export function foldM<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Foldable2v1<F>
): <L, A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => Type2<M, L, B>) => Type2<M, L, B>
export function foldM<M extends URIS2, F extends URIS, L>(
  M: Monad2C<M, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => Type2<M, L, B>) => Type2<M, L, B>
export function foldM<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Foldable2v1<F>
): <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => Type<M, B>) => Type<M, B>
export function foldM<M, F>(
  M: Monad<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B>
/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.
 * @function
 * @since 1.10.0
 */
export function foldM<M, F>(
  M: Monad<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B> {
  return (fa, b, f) => F.reduce(fa, M.of(b), (mb, a) => M.chain(mb, b => f(b, a)))
}

/**
 * Perform all of the effects in some data structure in the order given by the `Foldable2v` instance, ignoring the final result.
 */
export function sequence_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable2v1<F>
): <U, L, A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>
export function sequence_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable2v1<F>
): <A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>
export function sequence_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable2v1<F>
): <L, A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>
export function sequence_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable2v1<F>
): <A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>
export function sequence_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable2v1<F>
): <A>(fa: Type<F, Type<M, A>>) => Type<M, void>
export function sequence_<M, F>(M: Applicative<M>, F: Foldable2v<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
/**
 * Perform all of the effects in some data structure in the order given by the `Foldable2v` instance, ignoring the final result.
 * @function
 * @since 1.10.0
 */
export function sequence_<M, F>(M: Applicative<M>, F: Foldable2v<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> {
  const traverseMF = traverse_(M, F)
  return fa => traverseMF(fa, identity)
}

/**
 * Combines a collection of elements using the `Alt` operation
 */
export function oneOf<P extends URIS3, F extends URIS>(
  P: Plus3<P>,
  F: Foldable2v1<F>
): <U, L, A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>
export function oneOf<P extends URIS3, U, L, F extends URIS>(
  P: Plus3C<P, U, L>,
  F: Foldable2v1<F>
): <A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>
export function oneOf<P extends URIS2, F extends URIS>(
  P: Plus2<P>,
  F: Foldable2v1<F>
): <L, A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>
export function oneOf<P extends URIS2, F extends URIS, L>(
  P: Plus2C<P, L>,
  F: Foldable2v1<F>
): <A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>
export function oneOf<P extends URIS, F extends URIS>(
  P: Plus1<P>,
  F: Foldable2v1<F>
): <A>(fga: Type<F, Type<P, A>>) => Type<P, A>
export function oneOf<P, F>(P: Plus<P>, F: Foldable2v<F>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
/**
 * Combines a collection of elements using the `Alt` operation
 * @function
 * @since 1.10.0
 */
export function oneOf<P, F>(P: Plus<P>, F: Foldable2v<F>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> {
  return fga => F.reduce(fga, P.zero(), (acc, a) => P.alt(acc, a))
}

interface Acc<M> {
  init: boolean
  acc: M
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
 */
export function intercalate<M, F extends URIS3>(
  M: Monoid<M>,
  F: Foldable2v3<F>
): (sep: M) => <U, L>(fm: Type3<F, U, L, M>) => M
export function intercalate<M, F extends URIS3, U, L>(
  M: Monoid<M>,
  F: Foldable2v3C<F, U, L>
): (sep: M) => (fm: Type3<F, U, L, M>) => M
export function intercalate<M, F extends URIS2>(
  M: Monoid<M>,
  F: Foldable2v2<F>
): (sep: M) => <L>(fm: Type2<F, L, M>) => M
export function intercalate<M, F extends URIS2, L>(
  M: Monoid<M>,
  F: Foldable2v2C<F, L>
): (sep: M) => (fm: Type2<F, L, M>) => M
export function intercalate<M, F extends URIS>(M: Monoid<M>, F: Foldable2v1<F>): (sep: M) => (fm: Type<F, M>) => M
export function intercalate<M, F>(M: Monoid<M>, F: Foldable2v<F>): (sep: M) => (fm: HKT<F, M>) => M
/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
 * @function
 * @since 1.10.0
 */
export function intercalate<M, F>(M: Monoid<M>, F: Foldable2v<F>): (sep: M) => (fm: HKT<F, M>) => M {
  return sep => {
    function go({ init, acc }: Acc<M>, x: M): Acc<M> {
      return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) }
    }
    return fm => F.reduce(fm, { init: true, acc: M.empty }, go).acc
  }
}

/**
 * Find the sum of the numeric values in a data structure
 */
export function sum<F extends URIS3, A>(S: Semiring<A>, F: Foldable2v3<F>): <U, L>(fa: Type3<F, U, L, A>) => A
export function sum<F extends URIS3, A, U, L>(S: Semiring<A>, F: Foldable2v3C<F, U, L>): (fa: Type3<F, U, L, A>) => A
export function sum<F extends URIS2, A>(S: Semiring<A>, F: Foldable2v2<F>): <L>(fa: Type2<F, L, A>) => A
export function sum<F extends URIS2, A, L>(S: Semiring<A>, F: Foldable2v2C<F, L>): (fa: Type2<F, L, A>) => A
export function sum<F extends URIS, A>(S: Semiring<A>, F: Foldable2v1<F>): (fa: Type<F, A>) => A
export function sum<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A
/**
 * Find the sum of the numeric values in a data structure
 * @function
 * @since 1.10.0
 */
export function sum<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A {
  return fa => F.reduce(fa, S.zero, (b, a) => S.add(b, a))
}

/**
 * Find the product of the numeric values in a data structure
 */
export function product<F extends URIS3, A>(S: Semiring<A>, F: Foldable2v3<F>): <U, L>(fa: Type3<F, U, L, A>) => A
export function product<F extends URIS3, A, U, L>(
  S: Semiring<A>,
  F: Foldable2v3C<F, U, L>
): (fa: Type3<F, U, L, A>) => A
export function product<F extends URIS2, A>(S: Semiring<A>, F: Foldable2v2<F>): <L>(fa: Type2<F, L, A>) => A
export function product<F extends URIS2, A, L>(S: Semiring<A>, F: Foldable2v2C<F, L>): (fa: Type2<F, L, A>) => A
export function product<F extends URIS, A>(S: Semiring<A>, F: Foldable2v1<F>): (fa: Type<F, A>) => A
export function product<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A
/**
 * Find the product of the numeric values in a data structure
 * @function
 * @since 1.10.0
 */
export function product<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A {
  return fa => F.reduce(fa, S.one, (b, a) => S.mul(b, a))
}

/**
 * Test whether a value is an element of a data structure
 */
export function member<F extends URIS3, A>(
  S: Setoid<A>,
  F: Foldable2v3<F>
): <U, L>(a: A, fa: Type3<F, U, L, A>) => boolean
export function member<F extends URIS3, A, U, L>(
  S: Setoid<A>,
  F: Foldable2v3C<F, U, L>
): (a: A, fa: Type3<F, U, L, A>) => boolean
export function member<F extends URIS2, A>(S: Setoid<A>, F: Foldable2v2<F>): <L>(a: A, fa: Type2<F, L, A>) => boolean
export function member<F extends URIS2, A, L>(
  S: Setoid<A>,
  F: Foldable2v2C<F, L>
): (a: A, fa: Type2<F, L, A>) => boolean
export function member<F extends URIS, A>(S: Setoid<A>, F: Foldable2v1<F>): (a: A, fa: Type<F, A>) => boolean
export function member<F, A>(S: Setoid<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean
/**
 * Test whether a value is an element of a data structure
 * @function
 * @since 1.10.0
 */
export function member<F, A>(S: Setoid<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean {
  return (a, fa) => F.reduce(fa, false, (b, x) => b || S.equals(x, a))
}

/**
 * Find the first element which satisfies a predicate function
 */
export function findFirst<F extends URIS3>(
  F: Foldable2v3<F>
): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS3, U, L>(
  F: Foldable2v3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS2>(F: Foldable2v2<F>): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS2, L>(
  F: Foldable2v2C<F, L>
): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS>(F: Foldable2v1<F>): <A>(fa: Type<F, A>, p: Predicate<A>) => Option<A>
export function findFirst<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>
/**
 * Find the first element which satisfies a predicate function
 * @function
 * @since 1.10.0
 */
export function findFirst<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A> {
  return <A>(fa: HKT<F, A>, p: Predicate<A>) =>
    F.reduce<A, Option<A>>(fa, none, (b, a) => {
      if (b.isNone() && p(a)) {
        return some(a)
      } else {
        return b
      }
    })
}

/**
 * Find the smallest element of a structure, according to its `Ord` instance
 */
export function min<F extends URIS3, A>(O: Ord<A>, F: Foldable2v3<F>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>
export function min<F extends URIS3, A, U, L>(O: Ord<A>, F: Foldable2v3C<F, U, L>): (fa: Type3<F, U, L, A>) => Option<A>
export function min<F extends URIS2, A>(O: Ord<A>, F: Foldable2v2<F>): <L>(fa: Type2<F, L, A>) => Option<A>
export function min<F extends URIS2, A, L>(O: Ord<A>, F: Foldable2v2C<F, L>): (fa: Type2<F, L, A>) => Option<A>
export function min<F extends URIS, A>(O: Ord<A>, F: Foldable2v1<F>): (fa: Type<F, A>) => Option<A>
export function min<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A>
/**
 * Find the smallest element of a structure, according to its `Ord` instance
 * @function
 * @since 1.10.0
 */
export function min<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A> {
  const minO = minOrd(O)
  return fa => F.reduce(fa, none, (b: Option<A>, a) => (b.isNone() ? some(a) : some(minO(b.value, a))))
}

/**
 * Find the largest element of a structure, according to its `Ord` instance
 */
export function max<F extends URIS3, A>(O: Ord<A>, F: Foldable2v3<F>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>
export function max<F extends URIS3, A, U, L>(O: Ord<A>, F: Foldable2v3C<F, U, L>): (fa: Type3<F, U, L, A>) => Option<A>
export function max<F extends URIS2, A>(O: Ord<A>, F: Foldable2v2<F>): <L>(fa: Type2<F, L, A>) => Option<A>
export function max<F extends URIS2, A, L>(O: Ord<A>, F: Foldable2v2C<F, L>): (fa: Type2<F, L, A>) => Option<A>
export function max<F extends URIS, A>(O: Ord<A>, F: Foldable2v1<F>): (fa: Type<F, A>) => Option<A>
export function max<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A>
/**
 * Find the largest element of a structure, according to its `Ord` instance
 * @function
 * @since 1.10.0
 */
export function max<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A> {
  const maxO = maxOrd(O)
  return fa => F.reduce(fa, none, (b: Option<A>, a) => (b.isNone() ? some(a) : some(maxO(b.value, a))))
}

export function toArray<F extends URIS3>(F: Foldable2v3<F>): <U, L, A>(fa: Type3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS3, U, L>(F: Foldable2v3C<F, U, L>): <A>(fa: Type3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS2>(F: Foldable2v2<F>): <L, A>(fa: Type2<F, L, A>) => Array<A>
export function toArray<F extends URIS2, L>(F: Foldable2v2C<F, L>): <A>(fa: Type2<F, L, A>) => Array<A>
export function toArray<F extends URIS>(F: Foldable2v1<F>): <A>(fa: Type<F, A>) => Array<A>
export function toArray<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>) => Array<A>
/**
 * @function
 * @since 1.10.0
 */
export function toArray<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>) => Array<A> {
  return fa => foldMap(F, unsafeMonoidArray)(fa, a => [a])
}

/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
 * final result.
 */
export function traverse_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable2v1<F>
): <U, L, A, B>(fa: Type<F, A>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, void>
export function traverse_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, void>
export function traverse_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable2v1<F>
): <L, A, B>(fa: Type<F, A>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, void>
export function traverse_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, void>
export function traverse_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable2v1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type<M, B>) => Type<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
 * final result.
 * @function
 * @since 1.10.0
 */
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> {
  const toArrayF = toArray(F)
  const applyFirstM = applyFirst(M)
  const initialValue = M.of(undefined)
  return (fa, f) => toArrayF(fa).reduce((mu, a) => applyFirstM(mu, f(a)), initialValue)
}