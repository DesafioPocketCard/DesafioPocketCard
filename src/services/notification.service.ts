import api from "@/config/api";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

// Tipagem para ajudar no intellisense
export interface INotificationItem {
  message: string;
  received_credits: number;
}

export interface INotificationGroup {
  date: string;
  items: INotificationItem[];
}

export interface INotificationResponse {
    data: INotificationGroup[];
    total: number;
}

export default class NotificationService {
  private static path = "/notifications";

  static async getAll(): Promise<IResponseBody<INotificationResponse>> {
    try {
      const response = await api.get<IResponseBody<INotificationResponse>>(this.path);
      return response.data;
    } catch (error) {
      throw ErrorException.fromUnknown(error);
    }
  }
}