import { OrderItemExcelDto, ProductDto } from "./types";

export async function getOrdersByPage(page: number) {
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/admin?page=${page}&size=${10}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch orders : ', e);
    }
}

export async function getOrdersByStatus(status: string, page: number) {
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/admin/filter?status=${status}&page=${page}&size=${10}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch orders : ', e);
    }
}

export async function getOrdersForExcelByFilter(status: string) {
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/excel/filter?status=${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch orders : ', e);
    }
}

export async function updateTrackingNumbers(items: OrderItemExcelDto[]) {
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/tracking`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        });
        return response;
    } catch (e) {
        console.error('Failed to update orders : ', e);
    }
}

export async function fetchProductsByPage(page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=${page}&size=10`);
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch products', e);
    }
}

export async function fetchProductById(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`);
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch product : ', e);
    }
}

export async function updateProduct(product: ProductDto) {
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/admin`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        return response.status === 200;
    } catch (e) {
        console.error('Failed to update Product', e);
        return false;
    }
}

export async function checkAdmin(token: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/check`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.ok) return true;
        return false;
    } catch (e) {
        return false;
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    } catch (e) {
        console.error('Failed to login : ', e);
    }
}

export async function signup(email: string, password: string, username: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        });
        return response;
    } catch (e) {
        console.error('Failed to login : ', e);
    }
}

export async function makeProduct(product: ProductDto) {
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/admin`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        return response.status === 201;
    } catch (e) {
        console.error('Failed to make Product : ', e);
        return false;
    }
}