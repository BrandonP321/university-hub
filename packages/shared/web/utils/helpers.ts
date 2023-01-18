/** Converts string of classNames into a map where key/value => className?/string */
export type ClassesProp<TClasses extends string> = {[key in TClasses]?: string};