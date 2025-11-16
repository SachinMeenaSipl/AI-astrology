# Contributing to AstroSense AI

We love your input! We want to make contributing to AstroSense AI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html)

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issue tracker](https://github.com/SachinMeenaSipl/AI-astrology/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/SachinMeenaSipl/AI-astrology/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Process

### Setting Up Your Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-astrology.git
   cd AI-astrology
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation as needed

5. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes in detail

## Code Style Guidelines

### JavaScript/Node.js

- Use ES6+ features where appropriate
- Use async/await for asynchronous operations
- Follow standard JavaScript naming conventions
- Use meaningful variable and function names
- Keep functions small and focused
- Comment complex logic

Example:
```javascript
/**
 * Calculate planetary positions for a given date
 * @param {Date} date - The date for calculation
 * @returns {Object} Planetary positions
 */
async function calculatePlanetPositions(date) {
  // Implementation
}
```

### CSS

- Use CSS variables for theming
- Follow BEM naming convention where appropriate
- Keep styles modular and reusable
- Comment complex styling decisions

### HTML

- Use semantic HTML5 elements
- Keep markup clean and accessible
- Include ARIA labels where appropriate

## Project Structure

```
AI-astrology/
├── server.js              # Main server file
├── config/                # Configuration files
├── controllers/           # Route controllers
├── services/              # Business logic
├── models/                # Data models
├── utils/                 # Utility functions
├── public/                # Frontend files
│   ├── css/
│   ├── js/
│   └── assets/
└── tests/                 # Test files
```

## Feature Development Guidelines

### Adding New Features

1. **Discuss First**: For major changes, open an issue first to discuss what you would like to change
2. **Branch Naming**: Use descriptive names like `feature/palm-reading` or `fix/chart-calculation`
3. **Code Organization**: Keep related code together in appropriate directories
4. **Documentation**: Update README and API docs as needed
5. **Testing**: Add tests for new features

### Astrology Accuracy

- Always prioritize astronomical accuracy
- Reference authoritative sources
- Document calculation methods
- Include proper attributions

### AI/ML Features

- Keep AI responses helpful and accurate
- Avoid harmful or misleading advice
- Include appropriate disclaimers
- Respect user privacy

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Write unit tests for new functions
- Write integration tests for new endpoints
- Use meaningful test descriptions
- Aim for good coverage

Example:
```javascript
describe('Chart Calculation', () => {
  test('should calculate planetary positions correctly', async () => {
    const result = await calculateChart(testData);
    expect(result.planets).toBeDefined();
  });
});
```

## Documentation

- Update README.md for user-facing changes
- Update API_DOCS.md for API changes
- Add inline comments for complex logic
- Include JSDoc comments for functions

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Areas Where We Need Help

- [ ] Enhanced AI interpretations
- [ ] Additional language translations
- [ ] Mobile app development
- [ ] Advanced chart calculations
- [ ] UI/UX improvements
- [ ] Documentation improvements
- [ ] Test coverage
- [ ] Performance optimization

## Recognition

Contributors will be:
- Listed in our Contributors section
- Credited in release notes
- Acknowledged in the project

## Questions?

Feel free to reach out:
- Open an issue with the "question" label
- Email: support@astrosense.ai
- Discussion forum: Coming soon

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AstroSense AI! 🌟
