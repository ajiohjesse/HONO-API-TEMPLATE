import { BookDTO } from './books.schema';

class BooksService {
  getAllBooks(): Array<BookDTO> {
    return [
      {
        id: '1',
        title: 'Book 1',
        author: 'Author 1',
      },
      {
        id: '2',
        title: 'Book 2',
        author: 'Author 2',
      },
    ];
  }
}

export default new BooksService();
