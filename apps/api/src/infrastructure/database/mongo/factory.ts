import { fakerFR as faker } from "@faker-js/faker";
import UserModel from "./model/user.js";
import EventModel from "./model/event.js";
import { EventCategory } from "@common/enum/event-category.js";

export async function createSampleUsers(count = 10) {
  const users = Array.from({ length: count }, () => {
    return new UserModel({
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      deletedAt: null,
    });
  });

  return UserModel.insertMany(users);
}

export async function createSampleEvents(count = 10) {
  const users = await UserModel.find().select("_id").exec();
  const events = Array.from({ length: count }, () => {
    const category = faker.helpers.enumValue(EventCategory);
    const artists = category === EventCategory.Concert ? [faker.person.fullName()] : undefined;

    return new EventModel({
      name: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      category,
      artists,
      location: faker.helpers.mustache("{{longitude}},{{latitude}}", {
        longitude: () => faker.location.longitude().toString(),
        latitude: () => faker.location.latitude().toString(),
      }),
      startTime: faker.date.recent(),
      endTime: faker.date.future(),
      author: faker.helpers.arrayElement(users)._id,
      capacity: faker.number.int({ min: 1, max: 500 }),
    });
  });

  return EventModel.insertMany(events);
}
