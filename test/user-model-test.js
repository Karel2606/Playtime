import { assert } from "chai";
// system to be tested
import { db } from "../src/models/db.js";
// test data
import { maggie, testUsers} from "./fixtures.js";

// mocha runs all test in suite
suite("User API tests", () => {

  // setup function to be run befor each test
  setup(async () => {
    db.init();
    // test isolation: start tests from empty data store
    await db.userStore.deleteAll();
  });

  // single unit tests:
  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    // assert methode to check if code behave as expected
    assert.deepEqual(maggie, newUser)
  });

  test("delete all users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
});