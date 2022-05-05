import { assert } from "chai"
import { playtimeService } from "./playtime-service.js";
import { assertSubset} from "../test-utils.js"
import { testPlaylists, mozart, maggie } from "../fixtures.js"

suite("Playlist API tests", () => {

  let user = null; 

  setup(async () => {
    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllUsers();
    for (let i = 0; i < testPlaylists.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testPlaylists[i] = await playtimeService.createUser(testPlaylists[i]);
      }
    user = await playtimeService.createUser(maggie);
    mozart.userid = user._id;
  });
  teardown(async () => {
  });

  test("create a playlist", async () => {
   const playlist = await playtimeService.createPlaylist(mozart);
   assertSubset(mozart, playlist);
   assert.isDefined(playlist._id);
  });

  test("delete a playlist", async () => {
  });

  test("create multiple playlists", async () => {
  });

  test("remove non-existant playlist", async () => {
  });
});
