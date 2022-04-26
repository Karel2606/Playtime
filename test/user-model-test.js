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
    // test isolation: start tests from empty data store and add test data:
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
  });

  // single unit tests:
  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    // assert methode to check if code behave as expected
    assert.equal(newUser, maggie);
  });

  test("delete all users", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    // retrieve user by id
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual( returnedUser1, user);
    // retrieve user by email
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(returnedUser2, user);
  });

  test("delete One User - success", async () => {
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    assert.isNull(deletedUser);
  });

  test("get a user - failures", async () => {
    assert.isNull(await db.userStore.getUserById("123"));
    assert.isNull(await db.userStore.getUserByEmail("no@one.com"));
  });

  test("get a user - bad params", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });

  test("delete One User - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(testUsers.length, allUsers.length);
  });


});