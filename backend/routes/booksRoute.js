import express from 'express';
import { Book } from '../models/bookModel.js';
import { login } from '../models/login.js';
const router = express.Router();


// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear||
      !request.body.genre
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear, genre',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      genre:request.body.genre,
      imageurl:request.body.imageurl
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear||
      !request.body.genre
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear, genre',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    // Check if the user exists
    const user = await login.findOne({ email });

    if (!user) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }

    // If the password is valid, you can proceed with your authentication logic

    response.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.post('/signup',async(request, response) =>{
  try{
    const {name,email,password}=request.body;
    const existingUser = await login.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = password;

    // Create a new user
    const newUser = new login({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    response.status(201).json({ message: 'User registered successfully' });


  }
  catch(error){
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
  
})

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;