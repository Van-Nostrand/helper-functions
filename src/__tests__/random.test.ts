import * as random from '../random-funcs'
import { maleNames, femaleNames, lastNames } from '../names'

const mixedFirstNames = [...maleNames, ...femaleNames]
describe('random functions', () => {
  describe('getRandomName', () => {
    describe('without any arguments', () => {
      it('returns a first and last name', () => {
        const name = random.getRandomName()
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)\s([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(
          mixedFirstNames.includes(name.split(' ')[0]) &&
          lastNames.includes(name.split(' ')[1])
        ).toBeTruthy()
      })
    })
    describe('when given different props', () => {
      it('returns only a first name when asked', () => {
        const name = random.getRandomName({ firstNameOnly: true })
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(mixedFirstNames.includes(name.split(' ')[0])).toBeTruthy()
      })
      it('returns only a first name when asked', () => {
        const name = random.getRandomName({ firstNameOnly: true })
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(mixedFirstNames.includes(name)).toBeTruthy()
      })
      it('returns only a last name when asked', () => {
        const name = random.getRandomName({ lastNameOnly: true })
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(lastNames.includes(name)).toBeTruthy()
      })
      it('returns a name with a middle name when asked', () => {
        const name = random.getRandomName({ includeMiddleName: true })
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)\s([A-Z]{1}\w+)\s([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(
          mixedFirstNames.includes(name.split(' ')[0]) &&
          mixedFirstNames.includes(name.split(' ')[1]) &&
          lastNames.includes(name.split(' ')[2])
        ).toBeTruthy()
      })
      it('returns a name from the male name list when asked', () => {
        const name = random.getRandomName({ gender: 'male' })
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)\s([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(maleNames.includes(name.split(' ')[0])).toBeTruthy()
      })
      it('returns a name from the female name list when asked', () => {
        const name = random.getRandomName({ gender: 'female' })
        console.log('NAME IS', name)
        expect(name).toBeTruthy()
        expect(/^([A-Z]{1}\w+)\s([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        expect(femaleNames.includes(name.split(' ')[0])).toBeTruthy()
      })
      it('returns a name with a female first name and male middle name (or vice versa) when asked', () => {
        const name = random.getRandomName({ gender: 'mix', includeMiddleName: true })
        expect(name).toBeTruthy()
        expect(/\s/.test(name)).toBeTruthy()
        expect(/^([A-Z]{1}\w+)\s([A-Z]{1}\w+)\s([A-Z]{1}\w+)$/.test(name)).toBeTruthy()
        const nameArr = name.split(' ')
        const firstNameIsMale = maleNames.includes(nameArr[0])
        expect((firstNameIsMale ? maleNames : femaleNames).includes(nameArr[0])).toBeTruthy()
        expect((firstNameIsMale ? femaleNames : maleNames).includes(nameArr[1])).toBeTruthy()
        expect(lastNames.includes(nameArr[2])).toBeTruthy()
      })
    })
  })

  // describe('getPowerLawRandom', () => {
  //   test('works', () => {
  //     const results = []
  //     for (let i = 0; i < 10000; i++) {
  //       results.push(random.getPowerLawRandom(1, 1000))
  //     }
      

  //   })
  // })
})