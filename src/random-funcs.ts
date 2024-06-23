import { maleNames, femaleNames, lastNames } from './names'
/**
 * all of these use Math.random, so they're not 'true random' 
 * So they can't be used in cryptography, but they can be used to mock test data
 * or provide structure while building new ui
 * 
 * @author Daniel Doull <dmdoull43@gmail.com>
 */

export function getRandomFromArray <T> (arr: Array<T>): T {
  return arr[getRandomIntBetween(0, arr.length - 1)]
}

export function getRandomFloatBetween (min: number, max: number): number {
  return (Math.random() * (max - min)) + min
}
export function getRandomIntBetween (min: number, max: number): number {
  return Math.floor((Math.random() * (max - min)) + min)
}

export function getRandomBool (): boolean {
  return Math.floor(Math.random() * 10) > 4
}

/**
 * random number generated using a power law distribution
 * https://en.wikipedia.org/wiki/Power_law
 * more accurate than simply using math.random
 */
export function getPowerLawRandom (min: number, max: number): number {
  return Math.ceil(
    Math.exp(
      Math.random() * (
        Math.log(max) - Math.log(min)
      )
    ) * min
  )
}

type TNameOptions = {
  firstNameOnly?: boolean
  lastNameOnly?: boolean
  includeMiddleName?: boolean
  gender?: 'male' | 'female' | 'mix'
}

export function getRandomName ({ firstNameOnly, lastNameOnly, gender, includeMiddleName }: TNameOptions = {}): string {
  const maleFemaleTuple = ['male' as const, 'female' as const] as const
  const getMaleName = () => getRandomFromArray(maleNames)
  const getFemaleName = () => getRandomFromArray(femaleNames)
  const getAnyName = () => getRandomFromArray([...maleNames, ...femaleNames])
  const maleFemaleMap = {
    male: getMaleName,
    female: getFemaleName
  }

  const randomBool = getRandomBool()

  const last = !lastNameOnly && firstNameOnly ? '' : getRandomFromArray(lastNames)
  if (lastNameOnly) {
    return last
  }
  let first = ''
  const middle = includeMiddleName
    ? ` ${getRandomName({
      gender: gender === 'mix' ? maleFemaleTuple[Number(!randomBool)] : gender,
      firstNameOnly: true,
      lastNameOnly: false,
      includeMiddleName: false
    })}`
    : ''
  if (gender === 'male') {
    first = getMaleName()
  } else if (gender === 'female') {
    first = getFemaleName()
  } else if (gender === 'mix') {
    first = maleFemaleMap[maleFemaleTuple[Number(randomBool)]]()
  } else {
    first = getAnyName()
  }

  if (firstNameOnly) {
    return first
  }
  
  return `${first}${middle} ${last}`
}
