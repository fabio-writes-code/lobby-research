
Based on your codebase, I can suggest a comprehensive testing approach that would be appropriate for a solo developer working on this Next.js application. Let's establish different types of tests you should consider implementing.

## Types of Tests to Implement

### 1. Unit Tests
Focus on testing individual functions and components in isolation:

- Test authentication actions (`signIn.ts`, `register-user.ts`, etc.)
- Test data fetching functions (like `fetchDocument` in your document page)
- Test utility functions in `src/lib/utils.ts`

### 2. Component Tests
Test React components to ensure they render correctly and handle user interactions:

- Test UI components like forms (password reset, registration)
- Test the theme toggle functionality
- Test navigation components (NavBar, MobileNavBar)

### 3. Integration Tests
Test how different parts of your application work together:

- Test the document list flow (fetching and displaying documents)
- Test the report generation process
- Test authentication flows (login, registration, password reset)

### 4. API Route Tests
Test your API endpoints:

- Test auth endpoints in `src/app/api/auth/[...nextauth]/route.ts`

### 5. E2E Tests
Test complete user journeys through your application:

- User registration and login
- Document browsing and viewing
- Report generation

## Implementation

Let's set up the testing infrastructure:

Filepath: jest.config.js
Replace lines: 0-0
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
```

Filepath: jest.setup.js
Replace lines: 0-0
```javascript
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '',
}))

// Mock next-auth
jest.mock('next-auth', () => ({
  ...jest.requireActual('next-auth'),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))
```

Now let's create some example tests:

Filepath: src\app\document-list\[id]\__tests__\page.test.tsx
Replace lines: 0-0
```typescriptreact
import { render, screen } from '@testing-library/react'
import DocumentList from '../page'
import { db } from '~/server/db'

// Mock the database and cache
jest.mock('~/server/db', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockResolvedValue([
      { 
        hansardId: '123', 
        content: 'Test content paragraph 1\n\nTest content paragraph 2' 
      }
    ]),
  }
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn) => fn,
}))

describe('DocumentList Page', () => {
  it('renders document content correctly', async () => {
    const params = { id: '123' }
    const { container } = render(await DocumentList({ params }))
    
    expect(db.select).toHaveBeenCalled()
    expect(container).toBeInTheDocument()
    // Additional assertions would check for content rendering
  })
})
```

Filepath: src\components\ui\__tests__\button.test.tsx
Replace lines: 0-0
```typescriptreact
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    
    await userEvent.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes correctly', () => {
    const { container } = render(<Button variant="destructive">Destructive Button</Button>)
    // Check for the appropriate class based on your button implementation
    expect(container.firstChild).toHaveClass('bg-destructive')
  })
})
```

Filepath: src\actions\__tests__\getDocuments.test.ts
Replace lines: 0-0
```unknown
import { getDocuments } from '../getDocuments'
import { db } from '~/server/db'

// Mock the database
jest.mock('~/server/db', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockResolvedValue([
      { hansardId: '123', date: new Date('2023-01-01') },
      { hansardId: '456', date: new Date('2023-01-02') }
    ]),
  }
}))

describe('getDocuments Action', () => {
  it('fetches documents within date range', async () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-01-31')
    
    const result = await getDocuments({ startDate, endDate })
    
    expect(db.select).toHaveBeenCalled()
    expect(result).toHaveLength(2)
    expect(result[0].hansardId).toBe('123')
  })
})
```

Filepath: cypress.config.ts
Replace lines: 0-0
```unknown
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
```

Filepath: cypress\e2e\document-view.cy.ts
Replace lines: 0-0
```unknown
describe('Document Viewing', () => {
  beforeEach(() => {
    // Mock authentication if needed
    cy.intercept('GET', '/api/auth/session', { body: { user: { name: 'Test User', email: 'test@example.com' } } })
    
    // Mock document data
    cy.intercept('GET', '/api/documents/*', { fixture: 'document.json' })
  })

  it('should navigate to a document and display its content', () => {
    cy.visit('/document-list')
    cy.get('[data-testid="document-link"]').first().click()
    cy.url().should('include', '/document-list/')
    cy.get('[data-testid="content-area"]').should('be.visible')
    cy.contains('Test content paragraph').should('exist')
  })

  it('should toggle between light and dark theme', () => {
    cy.visit('/')
    cy.get('[aria-label="Toggle theme"]').click()
    cy.get('html').should('have.class', 'dark')
    cy.get('[aria-label="Toggle theme"]').click()
    cy.get('html').should('not.have.class', 'dark')
  })
})
```

Filepath: package.json
Replace lines: 0-0
```json
{
  "name": "hansard_webapp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "cypress": "cypress open",
    "cypress:headless": "cypress run",
    "e2e": "start-server-and-test dev http://localhost:3000 cypress",
    "e2e:headless": "start-server-and-test dev http://localhost:3000 cypress:headless"
  },
  "dependencies": {
    // Your existing dependencies
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.5",
    "cypress": "^13.3.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "start-server-and-test": "^2.0.1"
  }
}
```

## How to Run Tests

After implementing these files, you can run your tests with the following commands:

1. **Unit and Component Tests with Jest**:
   ```bash
   # Run all tests
   pnpm test
   
   # Run tests in watch mode during development
   pnpm test:watch
   
   # Generate coverage report
   pnpm test:coverage
   ```

2. **E2E Tests with Cypress**:
   ```bash
   # Open Cypress UI
   pnpm cypress
   
   # Run Cypress tests headlessly
   pnpm cypress:headless
   
   # Start dev server and run E2E tests
   pnpm e2e
   ```

## Testing Strategy Recommendations

1. **Start Small**: Begin with unit tests for critical functionality like authentication and data fetching.

2. **Component Testing**: Focus on testing complex components like forms and interactive elements.

3. **Test User Flows**: Prioritize E2E tests for the most common user journeys.

4. **CI Integration**: Set up GitHub Actions or another CI service to run tests on every push.

5. **Mocking Strategy**: Create mock data for your database and API calls to ensure tests are reliable and fast.

This testing setup provides a solid foundation that you can expand upon as your application grows. As a solo developer, this approach gives you confidence in your code while not being overly burdensome to maintain.
