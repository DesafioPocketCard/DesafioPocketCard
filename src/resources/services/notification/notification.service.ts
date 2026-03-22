import httpClient from "@/lib/http-client";
import { INotificationResponse } from "./notification.type";
import { IResponseBody } from "@/types/Request";

export class NotificationService {
  private static path = "/notification";

  static async getAll(): Promise<IResponseBody<INotificationResponse>> {
    const response = await httpClient.get<IResponseBody<INotificationResponse>>(
      this.path,
    );
    return response.data;
  }
}
