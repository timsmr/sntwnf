import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import * as T from "./types/types";

const baseUrl = "http://localhost:8000/api/";

class ApiService {
  private axiosInstance!: AxiosInstance;
  private headers!: Partial<AxiosRequestHeaders>;
  public readonly baseUrl: string = baseUrl;

  constructor() {
    this.setupHeaders();
    this.setupInstance();
  }

  private setupInstance() {
    this.axiosInstance = axios.create({
      headers: this.headers,
      timeout: 5000,
      baseURL: this.baseUrl,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          originalRequest.url === baseUrl + "token/refresh/"
        ) {
          window.location.href = "auth/login/";
          return Promise.reject(error);
        }

        if (
          error.response.data.code === "token_not_valid" &&
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          const refreshToken = localStorage.getItem("refresh_token");

          if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
            console.log(tokenParts)
            // exp date in token is expressed in seconds, while now() returns milliseconds:
            const now = Math.ceil(Date.now() / 1000);

            console.log('puk', now)
            
            if (tokenParts.exp > now) {
              return this.axiosInstance
                .post("/token/refresh/", {
                  refresh: refreshToken,
                })
                .then((response: any) => {
                  localStorage.setItem("access_token", response.data.access);
                  localStorage.setItem("refresh_token", response.data.refresh);

                  this.axiosInstance.defaults.headers["Authorization"] =
                    "JWT " + response.data.access;
                  originalRequest.headers["Authorization"] =
                    "JWT " + response.data.access;

                  return this.axiosInstance(originalRequest);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("Refresh token is expired", tokenParts.exp, now);
              window.location.href = "auth/login/";
            }
          } else {
            console.log("Refresh token not available.");
            window.location.href = "auth/login/";
          }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
      }
    );
  }

  private setupHeaders() {
    this.headers = {
      Authorization: localStorage.getItem("access_token")
        ? "JWT " + localStorage.getItem("access_token")
        : null,
      "Content-Type": "application/json",
      accept: "application/json",
    };
  }

  public addedHeaders = (headers: AxiosRequestHeaders) => {
    Object.entries(headers).forEach(([key, value]) => {
      this.headers[key] = value;
    });
  };

  public removeHeaders = (headers: AxiosRequestHeaders) => {
    Object.entries(headers).forEach(([key]) => {
      delete this.headers[key];
    });
  };

  public login = (username: string, password: string) => {
    return this.axiosInstance
      .post(`token/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        // localStorage.setItem("userId", this.getUserId(res.data.access))
        this.axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
      });
  };

  public logout = (refresh_token:string) => {
    return this.axiosInstance
    .post(`user/logout/blacklist/`, {
      refresh_token: refresh_token
    })
    .then((res) => {
      localStorage.clear()
      window.location.href='/'
    });
  }

  getUserId = (token: string) => {
    if (!token) return;
    return JSON.parse(atob(token!.split(".")[1]))[
      "user_id"
    ];
  };

  public checkIfLobbyExists = (codeValue: string) => {
    return this.axiosInstance(`lobby/${codeValue}`)
  };

  public register = (userInfo: T.UserInfo) => {
    return this.axiosInstance.post("user/create/", { ...userInfo });
  };

  public createLobby = (lobbyInfo: T.LobbyInfo) => {
    return this.axiosInstance.post("lobby/", { ...lobbyInfo });
  };

  public getLobby = (codeLobby: string | null) => {
    return this.axiosInstance(`/lobby/${codeLobby}/`)
  }

  public createHost = (data: T.HostInfo) => {
    return this.axiosInstance.post(`/guest/`, { ...data });
  };

  public createGuest = (data: T.HostInfo) => {
    return this.axiosInstance.post(`/guest/`, { ...data });
  };

  public shuffle = (lobbyCode: string) => {
    return this.axiosInstance(`/lobby/${lobbyCode}/shuffle/`);
  };

  public startGame = async (lobbyCode: string) => {
    await this.shuffle(lobbyCode).then(() => {
      return this.axiosInstance.patch(`/lobby/${lobbyCode}/`, {
        started: true,
      });
    });
  };

  public getGuest = (guestId: number | null) => {
    return this.axiosInstance.get(`/guest/${guestId}/`);
  };

  public getUser = async (userId: number) => {
    return this.axiosInstance(`/user/${userId}`).then(
      (response) => response.data
    );
  };

  public getLobbyGuests = (lobbyId: string | null) => {
    return this.axiosInstance(`/lobby/${lobbyId}/guest/`);
  };
}

export const apiService = new ApiService();
