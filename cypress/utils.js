import { faker } from '@faker-js/faker'

export function getDates([ fromDate, toDate ]) {
  return {
    dateFrom: new Intl.DateTimeFormat('en-US').format(new Date(fromDate)).replace(/\/\d*\//, '/'),
    dateTo: new Intl.DateTimeFormat('en-US').format(new Date(toDate)).replace(/\/\d*\//, '/')
  }
}

export function createRandomExperienceItem() {
  const dates = getDates(faker.date.betweens('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', 2))
  const{ dateFrom, dateTo } = dates

  return {
    dateFrom,
    dateTo,
    description: faker.lorem.text(),
    last: Math.random() < 0.5,
    name: faker.company.companyName(),
    position: faker.name.jobTitle(),
    website: faker.internet.domainName()
  }
}