import {API_URL, API_CLIENT_ID, API_ACCESSTOKEN} from '@env';

const BASE_URL = API_URL;
const PHOTOS = '/photos';
const CLIENT_ID = API_CLIENT_ID;
const ACCESS_TOKEN = API_ACCESSTOKEN;

export interface ImageApiInterface<T> {
  fetchPhotos(): Promise<Array<T>>;
}

export type PhotoDataResponse = {
  id: string;
  liked_by_user: boolean;
  likes: number;
  user?: {name: string; profile_image?: {small?: string}};
  urls?: {small: string};
};

export class ImageApi<T> implements ImageApiInterface<T> {
  private async init(
    path: string = PHOTOS,
    method: string = 'GET',
  ): Promise<Response> {
    return fetch(BASE_URL + path, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    });
  }

  private async initLikeDislike(
    id: string,
    method: 'POST' | 'DELETE',
    path: string = PHOTOS,
    tokenPrefix: string = 'Bearer',
    accessToken: string = ACCESS_TOKEN,
  ): Promise<Response> {
    return fetch(`${BASE_URL + path}/:${id}/like`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `${tokenPrefix} ${accessToken}`,
      },
    });
  }

  async fetchPhotos(): Promise<T[]> {
    return this.init()
      .then(response => response.json())
      .then(data => data as T[]);
  }

  async likePhoto(
    id: string,
    method = 'POST',
    path: string = PHOTOS,
    tokenPrefix: string = 'Bearer',
    accessToken: string = ACCESS_TOKEN,
  ): Promise<Response> {
    return fetch(`${BASE_URL + path}/${id}/like`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `${tokenPrefix} ${accessToken}`,
      },
    }).then(response => response.json());
  }

  async unlikePhoto(
    id: string,
    method = 'DELETE',
    path: string = PHOTOS,
    tokenPrefix: string = 'Bearer',
    accessToken: string = ACCESS_TOKEN,
  ): Promise<Response> {
    return fetch(`${BASE_URL + path}/${id}/like`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `${tokenPrefix} ${accessToken}`,
      },
    }).then(response => response.json());
  }
}
