import httpClient from "@/lib/http-client";
import { IProfile, IProfileForm } from "./profile.type";
import { IResponseBody } from "@/types/Request";

export class ProfileService {
  private static path = "/profile";

  static async get(): Promise<IResponseBody<IProfile[]>> {
    const response = await httpClient.get<IResponseBody<IProfile[]>>(this.path);
    return response.data;
  }

  static async update(data: IProfileForm): Promise<IResponseBody<undefined>> {
    const response = await httpClient.post<IResponseBody<undefined>>(
      this.path,
      data,
    );
    return response.data;
  }

  static async updatePicture(
    data: FormData,
  ): Promise<IResponseBody<undefined>> {
    const response = await httpClient.post<IResponseBody<undefined>>(
      `${this.path}/picture`,
      data,
    );
    return response.data;
  }
}
