export default created => {
  if (typeof (created) === `string`) {
    created = Date.parse(created);
  }
  const a = new Date(created);

  const months = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`, `10`, `11`, `12`];

  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes() <= 9 ? `0${a.getMinutes()}` : a.getMinutes();

  const time = `${date}/${month}/${String(year).slice(2)} ${hour}:${min}`;
  return time;
};
