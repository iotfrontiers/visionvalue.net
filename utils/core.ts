import mergeWith from 'lodash-es/mergeWith'
import isArray from 'lodash-es/isArray'

/**
 * object의 merge 수행
 * @param object object
 * @param sources sources
 * @returns merge된 object
 */
export const useDeepMerge = <T>(object: T | Partial<T>, ...sources: T[] | Partial<T>[]): Partial<T> => {
  let tempObj = object

  // @ts-ignore
  // tempObj = isRef(tempObj) ? unref(tempObj) : tempObj
  // tempObj = toRaw(tempObj)

  sources.forEach(source => {
    // source = isRef(source) ? unref(source) : source
    // source = toRaw(source)

    tempObj = mergeWith(object, source, (a, b) => {
      if (isArray(b)) {
        return b
      }
    })
  })

  return tempObj as T
}
