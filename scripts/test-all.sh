#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting comprehensive test suite...${NC}"
echo "=================================="

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

# 1. Install dependencies if needed
echo -e "${YELLOW}📦 Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    print_status $? "Dependencies installed"
else
    echo "Dependencies already installed"
fi

# 2. Run ESLint
echo -e "${YELLOW}📝 Running ESLint...${NC}"
npm run lint
print_status $? "ESLint passed"

# 3. Run build
echo -e "${YELLOW}🏗️  Running build...${NC}"
npm run build
print_status $? "Build successful"

# 4. Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run test -- --coverage --watchAll=false
print_status $? "Tests passed"

# 5. Run ESLint again to ensure no regressions
echo -e "${YELLOW}🔍 Final ESLint check...${NC}"
npm run lint
print_status $? "Final ESLint check passed"

echo "=================================="
echo -e "${GREEN}🎉 All tests passed successfully!${NC}"
echo -e "${BLUE}Your code is ready for production! 🚀${NC}"
