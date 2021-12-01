enum Tags {ON_SALE, BRAND_NEW};

const product = {
  id: "adeg21s",
  price: 3.99,
  tags: [Tags.ON_SALE, Tags.BRAND_NEW],
  details: {
    title: "Milk",
    description: "A gallon of fresh milk",
  },
};

const person: {
    name: string,
    age: number,
    hobbies: string[],
    role: [number, string] // Tuple fix length array and specific data types
} = {
    name: "Thomas",
    age: 23,
    hobbies: ['Tennis', 'Coding'],
    role: [1, "Doctor"]
};

console.log(product.details.description);

for (const tag of product.tags) {
  console.log(tag);
}