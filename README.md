### App

GymPass style app.

### FRs (Functional Requirements)

- [X] It should be possible to register;
- [ ] It should be possible to authenticate;
- [ ] It should be possible to obtain the profile of a logged-in user;
- [ ] It should be possible to obtain the number of check-ins made by the logged-in user;
- [ ] It should be possible to obtain your check-in history;
- [ ] The user should be able to search for nearby gyms;
- [ ] The user should be able to search for gyms by name;
- [ ] It should be possible to check-in at a gym;
- [ ] It should be possible to validate a user’s check-in;
- [ ] It should be possible to register a gym;

### BRs (Business Rules)

- [X] The user should not be able to register with a duplicate email;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if they are not close (100m) to the gym;
- [ ] The check-in can only be validated up to 20 minutes after being created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

### NFRs (Non-Functional Requirements)

- [X] The user’s password needs to be encrypted;
- [X] The application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token).