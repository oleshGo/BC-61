const getUser = (email) => {
  const user = find(email);
  return { email: `${user.email}@gmail.com` };
};

const find = (email) => {
  return { email };
};

module.exports = {
  getUser,
  find,
};
