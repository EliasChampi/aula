const mydate = new Date();
const year = mydate.getFullYear();
const month = mydate.getMonth() + 1;
const STORAGE_TEACHER = `storage/teacher/${year}/${month}/`;
const STORAGE_FAMILY = `storage/student/${year}/`;
module.exports = {
  STORAGE_TEACHER,
  STORAGE_FAMILY,
};
