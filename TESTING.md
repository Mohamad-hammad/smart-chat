# Testing Guide for Smart Chat

This project includes a comprehensive testing setup that ensures code quality and ESLint compliance.

## 🚀 Quick Start

### Run All Tests
```bash
npm run test:all
```

This command runs:
1. ESLint checks
2. Build verification
3. ESLint compliance tests

### Run Individual Test Categories
```bash
# ESLint only
npm run test:lint

# Build only
npm run test:build

# ESLint compliance tests only
npm run test

# Tests with coverage
npm run test:coverage

# Tests in watch mode
npm run test:watch
```

## 🧪 Test Structure

### Test Files
- `src/__tests__/eslint.test.js` - Tests ESLint rule compliance across the codebase
- `src/__tests__/components.test.tsx` - Tests ESLint compliance in component files

### Test Categories

#### 1. ESLint Compliance Tests
- **ESLint Execution**: Verifies that ESLint runs without errors
- **Build Success**: Ensures the build process completes successfully
- **Unescaped Entities**: Checks for proper HTML entity usage in JSX
- **Unused Imports**: Detects potentially unused imports

#### 2. Component Code Quality Tests
- **Console.log Detection**: Ensures no console.log statements in components
- **Unused Variables**: Checks for potentially unused variables in components

## 🔧 Configuration Files

### Jest Configuration (`jest.config.js`)
- Uses Next.js Jest preset
- Configured for TypeScript and React
- Maps `@/` imports to `src/` directory

### Jest Setup (`jest.setup.js`)
- Configures testing utilities
- Mocks Next.js components (router, Image)
- Sets up global test environment

### ESLint Configuration (`eslint.config.mjs`)
- Extends Next.js core web vitals and TypeScript rules
- Ignores build artifacts and generated files

## 🚦 Continuous Integration

### GitHub Actions
The project includes GitHub Actions workflows that run on:
- Every push to `main` and `develop` branches
- Every pull request

**Workflows:**
1. **Test and Lint**: Runs full test suite on multiple Node.js versions
2. **ESLint Check**: Dedicated ESLint validation

### Pre-commit Hooks
Use the provided pre-commit script to catch issues before committing:
```bash
./scripts/pre-commit.sh
```

## 🛠️ Development Workflow

### Before Committing
1. Run ESLint: `npm run lint`
2. Run tests: `npm test`
3. Ensure build passes: `npm run build`

### Automated Testing
```bash
# Run the comprehensive test suite
./scripts/test-all.sh

# This script will:
# 1. Check dependencies
# 2. Run ESLint
# 3. Run build
# 4. Run tests
# 5. Run final ESLint check
```

## 📝 Writing Tests

### Adding New Tests
1. Create test files in `src/__tests__/` directory
2. Use descriptive test names
3. Follow Jest testing patterns
4. Include proper error messages

### Test Naming Convention
```typescript
describe('Feature Name', () => {
  test('should do something specific', () => {
    // Test implementation
  })
})
```

### Focus on Code Quality
- Tests focus on ESLint compliance and code quality
- No component rendering tests (not required for this project)
- Emphasis on catching common coding issues

## 🐛 Troubleshooting

### Common Issues

#### ESLint Errors
```bash
# Fix auto-fixable issues
npm run lint:fix

# Check specific files
npx eslint src/components/MyComponent.tsx
```

#### Test Failures
```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- src/__tests__/eslint.test.js
```

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode
```bash
# Run tests with Node.js debugger
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [ESLint Rules](https://eslint.org/docs/rules/)

## 🤝 Contributing

When contributing to this project:

1. **Maintain Code Quality**: Ensure ESLint compliance
2. **Follow Standards**: Adhere to coding standards
3. **Update Tests**: Add tests for new ESLint rules if needed
4. **Update Documentation**: Keep this guide current

## 📈 Performance

- **Test Execution**: ~11 seconds for full suite
- **Build Time**: ~2 seconds
- **ESLint**: <1 second
- **Coverage**: Generated automatically

---

**Note**: This testing setup focuses on code quality and ESLint compliance. The tests ensure that all ESLint rules are passed and the codebase maintains high quality standards.
