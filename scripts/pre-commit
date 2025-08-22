#!/bin/bash

echo "🔍 Running pre-commit checks..."

# Run ESLint
echo "📝 Checking ESLint rules..."
if npm run lint; then
    echo "✅ ESLint passed"
else
    echo "❌ ESLint failed. Please fix the issues before committing."
    exit 1
fi

# Run build to ensure no build errors
echo "🏗️  Checking build..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix the issues before committing."
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
if npm run test -- --passWithNoTests; then
    echo "✅ Tests passed"
else
    echo "❌ Tests failed. Please fix the issues before committing."
    exit 1
fi

echo "🎉 All pre-commit checks passed! You can commit now."
exit 0
