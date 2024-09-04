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

export async function checkAdmin(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/check`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if (response.ok) return true;
    return false;
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