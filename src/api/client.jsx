import axios from "axios";

const API_BASE = "http://localhost:4000";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request(path, { method = "GET", body,file, auth = false } = {}) {
  try {
  
  const config={
    method:method
    
  }
  // if (body && !file) config.data = body;
  // if (file) {
    const formData=new FormData()
    formData.append('image',file);
    formData.append('title',body.title)
    formData.append('amount',body.amount)
    formData.append('expense_date',body.expense_date)
    config.data=formData;
  // }
  if (auth) {
    const token = getToken();
    if (token) config.headers ={Authorization:`Bearer ${token}`};
  }

  const res = await axios (`${API_BASE}${path}`,config);
  return res.data;
  } catch (err) {
    const message=err.response?.data?.message||err.response?.data?.error ||err.message ||"Request failed";
    throw new Error(message);
    
  }

  
}

export const api = {
  register: (payload) => request("/api/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),

  addExpense: (payload,file) => request("/api/expenses", { method: "POST", body: payload,file:file, auth: true }),
  getExpenses: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    // console.log(qs);
    
    return request(`/api/expenses${qs ? `?${qs}` : ""}`, { auth: true });
  },
  uploadReceipt:(payload)=>request("/api/uploadImage",{ method: "POST", file: payload, auth: true })
  
};
