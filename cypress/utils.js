import { faker } from '@faker-js/faker'

function getDates([ fromDate, toDate ], format = 'month') {
  switch (format) {
    case 'month':
      return {
        dateFrom: new Intl.DateTimeFormat('en-US').format(new Date(fromDate)).replace(/\/\d*\//, '/'),
        dateTo: new Intl.DateTimeFormat('en-US').format(new Date(toDate)).replace(/\/\d*\//, '/')
      }
    case 'year':
      return {
        dateFrom: new Intl.DateTimeFormat('en-US').format(new Date(fromDate)).replace(/\d*\/\d*\//, ''),
        dateTo: new Intl.DateTimeFormat('en-US').format(new Date(toDate)).replace(/\d*\/\d*\//, '')
      }
  }
}

export function createRandomExperienceItem() {
  const dates = getDates(faker.date.betweens('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', 2))
  const { dateFrom, dateTo } = dates

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

export function createRandomStudyItem() {
  const dates = getDates(faker.date.betweens('2000-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', 2), 'year')
  const { dateFrom, dateTo } = dates

  const randomType = ['university', 'school'][Math.floor(Math.random() * 2)]

  return {
    dateFrom,
    dateTo,
    description: faker.lorem.text(),
    title: faker.company.companyName(),
    type: randomType
  }
}
export function createRandomStudyItems(count = 2) {
  let studyItems = []

  while (count > 0) {
    studyItems.push(createRandomStudyItem())

    count--
  }

  if (studyItems.length === 2) {
    studyItems[0].type = 'university'
    studyItems[1].type = 'school'
  } else {
    studyItems[0].type = 'university'
  }

  return studyItems
}

export function createRandomContactLinkObj() {
  return {
      link: faker.internet.domainName(),
      name: faker.lorem.word(),
      type: ['envelope', 'phone', 'telegram'][Math.floor(Math.random() * 3)],
      value: faker.internet.domainName(),
    }
}