import { assert } from "chai"
import { playtimeService } from "./playtime-service.js";
import { assertSubset} from "../test-utils.js"
import { maggie, testUsers, maggieCredentials } from "../fixtures.js"

// hold test users in setup, for isolation of tests fro each run
const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    playtimeService.clearAuth();
    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        users[0] = await playtimeService.createUser(testUsers[i]);
      }
      await playtimeService.createUser(maggie);
      await playtimeService.authenticate(maggieCredentials);
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await playtimeService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await playtimeService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await playtimeService.deleteAllUsers();
    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    returnedUsers = await playtimeService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await playtimeService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - fail", async () => {
    try {
      const returnedUser = await playtimeService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
        // expecting an exception from endpoint implementation user api
      assert(error.response.data.message === "No User with this id");
      // invalid id, or service is not available
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await playtimeService.deleteAllUsers();
    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    try {
      const returnedUser = await playtimeService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      // valide id, but no user
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});