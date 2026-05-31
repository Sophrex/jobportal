import type { DataProvider } from "@refinedev/core";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const buildUrl = (resource: string, id?: string | number) => {
  const base = `${API_URL}/api/v1/${resource}/`;
  return id ? `${base}${id}/` : base;
};

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = new URL(buildUrl(resource));

    if (pagination) {
      const current = pagination.currentPage ?? 1;
      const pageSize = pagination.pageSize ?? 20;
      url.searchParams.set("page", String(current));
      url.searchParams.set("page_size", String(pageSize));
    }

    filters?.forEach((filter) => {
      if ("field" in filter && filter.value !== undefined) {
        url.searchParams.set(String(filter.field), String(filter.value));
      }
    });

    if (sorters?.length) {
      const sort = sorters[0];
      const prefix = sort.order === "desc" ? "-" : "";
      url.searchParams.set("ordering", `${prefix}${sort.field}`);
    }

    const response = await fetch(url.toString(), { headers: getHeaders() });
    if (!response.ok) throw new Error(`Failed to fetch ${resource}`);

    const data = await response.json();
    return {
      data: data.results ?? data,
      total: data.count ?? (data.results ?? data).length,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await fetch(buildUrl(resource, id), { headers: getHeaders() });
    if (!response.ok) throw new Error(`Failed to fetch ${resource}/${id}`);
    const data = await response.json();
    return { data };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(buildUrl(resource), {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(variables),
    });
    if (!response.ok) throw new Error(`Failed to create ${resource}`);
    const data = await response.json();
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(buildUrl(resource, id), {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(variables),
    });
    if (!response.ok) throw new Error(`Failed to update ${resource}/${id}`);
    const data = await response.json();
    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await fetch(buildUrl(resource, id), {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to delete ${resource}/${id}`);
    return { data: { id } as never };
  },

  getApiUrl: () => `${API_URL}/api/v1`,
};
