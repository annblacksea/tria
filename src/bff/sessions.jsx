export const sessions = {
  list: {},
  add(user) {
    const hash = Math.random().toFixed(15).slice(3);
    this.list[hash] = user;
    return hash;
  },
  remove(user) {
    delete this.list[user];
  },
  access(hash, accessRoles) {
    const user = this.list[hash];
    console.log(user);

    return !!user && accessRoles.includes(user.roleId);
  },
};
