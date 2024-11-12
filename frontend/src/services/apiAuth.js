import conf from "../config/conf";

class AuthService {
  apiurl = "";
  constructor() {
    this.apiurl = conf.apiEndPoint;
  }

  async createAccount(userData) {
    const res = await fetch(`${this.apiurl}/users/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }

  async login(userData) {
    const res = await fetch(`${this.apiurl}/users/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }

  async logout() {
    const res = await fetch(`${this.apiurl}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }

  async getCurrentUser(id) {
    const res = await fetch(`${this.apiurl}/users/${id}`);
    const data = await res.json();
    console.log(data);
  }
}

const authService = new AuthService();
export default authService;
