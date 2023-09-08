## Books Scraper API Documentation

### Base URL
```
https://api.books-scraper.com
```

### Endpoints

#### GET /books

##### Description
Retrieve a list of books based on genre.

##### Parameters
- `genre` (string, required): The genre of books to retrieve.

##### Example Request
```
GET https://api.books-scraper.com/books?genre=mystery
```

##### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "title": "The Hound of the Baskervilles",
      "author": "Arthur Conan Doyle",
      "price": "$12.99",
      "availability": "In Stock"
    },
    // ... other books in the genre
  ],
  "metadata": {
    "genre": "mystery",
    "total_items": 20,
    "total_pages": 2
  }
}
```

##### Error Response
- Status: 400 Bad Request
- Response:
```json
{
  "error": "Invalid genre parameter."
}
```

#### Supported Genres

##### Description
Retrieve a list of supported genres.

##### Example Request
```
GET https://api.books-scraper.com/supported-genres
```

##### Example Response
```json
{
  "genres": [
    "mystery",
    "romance",
    "fantasy",
    // ... other supported genres
  ]
}
```

### Authentication
No authentication is required to use this API.

---