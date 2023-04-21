import {API_URL, API_CLIENTID} from '@env';

const baseUrl = API_URL;
const photos = '/photos';
const clientId = API_CLIENTID;

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
    path: string = photos,
    method: string = 'GET',
  ): Promise<Response> {
    return fetch(baseUrl + path, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Client-ID ${clientId}`,
      },
    });
  }

  async fetchPhotos(): Promise<T[]> {
    return this.init()
      .then(response => response.json())
      .then(data => data as T[]);
  }
}
