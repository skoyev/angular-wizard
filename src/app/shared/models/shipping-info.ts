export class Address {
    name: string
    street: string
    city: string
    state: string
    zip: string
}

export class ShippingInfo {
    from: Address = new Address()
    to: Address = new Address()
    weight: number
    shippingOption: number
}