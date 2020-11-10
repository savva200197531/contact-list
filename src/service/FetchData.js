export default class FetchData {
  url = 'http://demo.sibers.com/users';

  getResource = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Произошла ошибка ${ res.status }`);
    }

    return await res.json();
  };

  getUsers = async () => await this.getResource(this.url);
}
