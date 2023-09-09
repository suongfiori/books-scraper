# Node.js Books Scraper API

## Introduction

The Node.js Books Scraper API allows you to retrieve fictional book data, including genres, titles, prices, stock availability, and more. It provides two main endpoints to access this data.

- Base URL: `https://confused-threads-cod.cyclic.cloud/`

## Endpoints

### 1. Get All Genres

- **Endpoint**: `/books`
- **Method**: GET
- **Description**: This endpoint returns an array of available book genres.

#### Example

- **Request**:
  ```http
  GET https://confused-threads-cod.cyclic.cloud/books
  ```

- **Response**:
  ```json
  [
    "fiction",
    "mystery",
    "romance",
    ...
  ]
  ```

### 2. Get Books by Genre

- **Endpoint**: `/books/:genre`
- **Method**: GET
- **Description**: This endpoint allows you to retrieve a list of books for a specific genre.

#### Example

- **Request**:
  ```http
  GET https://confused-threads-cod.cyclic.cloud/books/fiction
  ```

- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "title": "Book Title",
        "author": "Author Name",
        "price": "$19.99",
        "availability": "In stock",
        ...
      },
      ...
    ],
    "metadata": {
      "genre": "fiction",
      "total_items": 20,
      "total_pages": 2
    }
  }
  ```

## Data Source

The data provided by this API is sourced from [Books to Scrape](https://books.toscrape.com/), a fictional book store used for web scraping practice.

## Getting Started

To use this API, make HTTP requests to the provided endpoints. 
