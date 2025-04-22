export interface Product {
    id: number
    uuid: string
    name: string
    resumen: string
    description: string
    sku: string
    nmp: string
    width: string
    height: string
    weight: string
    lenght: string
    depth: string
    price: string
    make_offer: number
    user: User
    brands: any[]
    offers: any[]
    categories: any[]
    colors: any[]
    image: Image
    images: Image2[]
    stock: number
    status: number
    cart: number
    favorite: number
}

export interface User {
    id: number
    uuid: string
    name: string
    address: string
    phone: string
    email: string
    email_verified_at: any
    lat: any
    lng: any
    bulk_products: number
    bulk_offer: number
    avatar: any
    rating: number
    punctuation: number
    role_id: number
    status: number
    code_password: any
    date_code_password: any
    created_at: any
    updated_at: any
}

export interface Image {
    id: number
    uuid: string
    type: string
    name: string
    url: string
    fileable_type: string
    fileable_id: number
    status: number
    created_at: string
    updated_at: string
    path: string
}

export interface Image2 {
    id: number
    uuid: string
    type: string
    name: string
    url: string
    fileable_type: string
    fileable_id: number
    status: number
    created_at: string
    updated_at: string
    path: string
}
