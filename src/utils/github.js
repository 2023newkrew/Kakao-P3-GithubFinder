export function testUsername(username) {
  return new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i).test(username);
}
