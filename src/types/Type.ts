export type dataType = {
    id: string,
    title: string,
    desc: string,
    price:string
}

export const DATA: dataType[] = [
    { id: '1', title: 'name1', desc: 'desc', price: 'price' },
    { id: '2', title: 'name2', desc: 'desc', price: 'price' },
    { id: '3', title: 'name3', desc: 'desc', price: 'price' },
    { id: '4', title: 'name4', desc: 'desc', price: 'price' },
    { id: '5', title: 'name5', desc: 'desc', price: 'price' },
    { id: '6', title: 'name6', desc: 'desc', price: 'price' },
    { id: '7', title: 'name7', desc: 'desc', price: 'price' },
    { id: '8', title: 'name8', desc: 'desc', price: 'price' },
    { id: '9', title: 'name9', desc: 'desc', price: 'price' },
    { id: '10', title: 'name10', desc: 'desc', price: 'price' },
    { id: '11', title: 'name11', desc: 'desc', price: 'price' },
    { id: '12', title: 'name12', desc: 'desc', price: 'price' },
];


export type Address = {
    name: string,
    apartment: string,
    street: string,
    city: string,
    state: string,
    pinCode: number,
    phoneNo: number
}