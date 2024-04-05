**instalaation guide**

  - mkdir bookingApp
  - cd bookingApp
  - git clone <remote-url>
  - npm install
  - create .env file and update database credentials
  - npm start

**available routes**

  '/booking/book-availability/:book_name' - Initial Story: Develop an API that receives a book name and returns the date when that book will be available.

  '/lending-charges' - Story 1: The Store wants to bring in a feature to calculate the rent charges per book. Per day rental charge is Rs 1 for all the books.

  '/lending-charges-with-charges' - Story 2: The Store wants to change the charges on the books depending on the types of the book. There are 3 kinds : Regular, Fiction and Novel. Regular books renting per day charge is Rs. 1.5. For fiction book     renting per day charge is Rs. 3. For novels the per day charge is Rs. 1.5.

  '/lending-charges-byDays' - Story 3: The store decided to alter the calculations for Regular books and novels. Now for Regular books the first 2 days charges will be Rs 1 per day and 1.5 Rs there after. Minimum changes will be considered as Rs 2 if days rented is less than 2 days. Similarly for Novel minimum charges are introduced as 4.5 Rs if days rented is less than 3 days.

