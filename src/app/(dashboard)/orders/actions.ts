"use server";

import { fetchData } from "@/lib/api";

export interface OrderData {
  _id: string;
  date: string;
  personalDetail: {
    firstName: string;
    lastName: string;
    email: string;
  };
  historyEvent: {
    title: string;
    date: string;
    venueName: string;
  };
}

interface GetOrdersResponse {
  data: OrderData[];
  pages: number;
  total: number;
}

// Params: page, limit, startDate, endDate
export async function getOrders(
  page: number = 1,
  limit: number = 10,
  startDate?: string,
  endDate?: string,
): Promise<GetOrdersResponse> {
  const params: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };
  if (startDate) params.startDate = startDate; // API might use different param names, assuming standard
  if (endDate) params.endDate = endDate;

  try {
    // API call
    // Construct query string
    const queryString = new URLSearchParams(params).toString();
    const res = await fetchData(`/v1/cms/orders?${queryString}`);

    // Expected response: { data: { orders: [], pages: 1, total: 10 } } or similar
    // Need to adjust based on typical response.
    // Assuming res.data contains the list and meta info.
    // If res.data is array, where is pages?
    // Check src/pages/Orders/index.js:
    // dispatch(fetchOrders()) -> getOrders in redux/orders/actions.js -> fetch('/v1/cms/orders', params)
    // Reducer: case GET_ORDERS: return { ...state, data: action.payload.orders, pages: action.payload.pages }
    // So API returns { orders: [], pages: number, total: number } ?
    // Or { data: { orders: [], pages: number } }

    // I'll assume standard { data: { orders: [], pages: ... } }
    // If fetchData returns the body, and body has `data` prop...
    // Let's assume `res.data` corresponds to the object containing orders and pages.

    return {
      data: res.data.orders || res.data.order || [],
      pages: res.data.pages,
      total: res.data.total,
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return { data: [], pages: 1, total: 0 };
  }
}
