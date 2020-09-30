// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const restaurants = [
  {
    img:
      "https://d1ralsognjng37.cloudfront.net/765da8ff-1fb3-4f14-b86e-60b518bb5d8b.jpeg",
    title: "MAX Sthlm - Hammarby",
    rating: 4.4
  },
  {
    img:
      "https://d1ralsognjng37.cloudfront.net/b750a878-0786-4aaf-bd85-003654a58c3f",
    title: "McDonald's Sickla",
    rating: 3.8
  },
  {
    img:
      "https://d1ralsognjng37.cloudfront.net/313ad075-af6d-471f-9651-a9ba76e7377a.jpeg",
    title: "Oh Poké Hammarby Sjöstad",
    rating: 4.7
  }
]

export default (req, res) => {
  res.statusCode = 200
  setTimeout(() => res.json({ restaurants }), 2000)
}
