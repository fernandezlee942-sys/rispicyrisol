const KEY = 'rr_sales'

export function getSales() {
    try {
        const list = JSON.parse(localStorage.getItem(KEY)) ?? []
        return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) 
    } catch {
        return []
    }
}

export function addSale(sale) {
    const record = {
        ...sale,
        id: 'TRX-' + Date.now().toString(36).toUpperCase(),
        createdAt: new Date().toISOString(),
    }
    localStorage.setItem(KEY, JSON.stringify([record, ...getSales()]))
    return record
}