- Project Setup
Objective: Set up a React project with React Query.

Steps:
Create a React App (if not already done):

bash
Copy code
npx create-react-app react-query-tutorial
cd react-query-tutorial
Install React Query:

bash
Copy code
npm install @tanstack/react-query
Set up the QueryClientProvider in your app. This will allow React Query to manage its global state.

In src/index.js or src/App.js:

jsx
Copy code
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
- Fetching Data with useQuery
Objective: Learn how to fetch data using the useQuery hook.

Create a function to fetch data (e.g., fetching a list of users):

js
Copy code
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
Use useQuery to fetch the data in a component:

jsx
Copy code
import { useQuery } from '@tanstack/react-query';

const UsersList = () => {
  const { data, error, isLoading } = useQuery(['users'], fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
- Handling Query Error
Objective: Learn how to handle errors in queries.

React Query provides an error object in the result of useQuery. You can display a message or log the error.

Example: Handling error in useQuery:

jsx
Copy code
const { data, error, isLoading } = useQuery(['users'], fetchUsers);

if (isLoading) return <div>Loading...</div>;
if (error instanceof Error) return <div>Error: {error.message}</div>;
- React Query Devtools
Objective: Use React Query Devtools for debugging.

Install React Query Devtools:

bash
Copy code
npm install @tanstack/react-query-devtools
Set up Devtools in your app:

In your App.js or index.js:

jsx
Copy code
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  return (
    <div>
      {/* Your components */}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};
This will add a DevTools panel to your app that allows you to inspect the queries, mutations, and cache.

- Query Cache
Objective: Learn about caching in React Query.

React Query Caching: By default, React Query caches your queries to avoid unnecessary network requests. You can control the cache behavior using options like cacheTime.

Example: Setting custom cache time:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
});
- Stale Time
Objective: Learn about stale time and how it affects refetching.

Stale Time: This determines how long React Query considers the data "fresh" before it refetches it. If the data is stale, React Query will automatically refetch it when needed.

Example:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  staleTime: 1000 * 60 * 2, // Data is considered fresh for 2 minutes
});
- Refetch Defaults
Objective: Learn how to control refetch behavior.

Default Refetching Behavior: React Query refetches data automatically in some cases, like on window focus, network reconnect, or when a component using the query is remounted.

Disabling Refetching on Window Focus:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  refetchOnWindowFocus: false, // Disable refetching on window focus
});
- Polling
Objective: Learn how to poll for data at regular intervals.

Polling: You can poll for data by setting a refetchInterval to a specific time in milliseconds.

Example:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  refetchInterval: 1000 * 60, // Poll every minute
});
 - useQuery on Click
Objective: Trigger a query when a button is clicked instead of automatically.

Lazy Loading with useQuery: You can trigger a query only when an event, like a button click, happens.

Example:

jsx
Copy code
const { data, refetch } = useQuery(['users'], fetchUsers, {
  enabled: false, // Disable automatic fetching
});

return (
  <div>
    <button onClick={() => refetch()}>Fetch Users</button>
    {data && data.map(user => <div key={user.id}>{user.name}</div>)}
  </div>
);
 - Success and Error Callbacks
Objective: Handle success and error callbacks when the query succeeds or fails.

onSuccess and onError Callbacks: These are lifecycle callbacks that allow you to run logic after a query is successful or fails.

Example:

jsx
Copy code
const { data, error } = useQuery(['users'], fetchUsers, {
  onSuccess: (data) => {
    console.log('Data fetched successfully:', data);
  },
  onError: (error) => {
    console.log('Error fetching data:', error);
  },
});
 - Data Transformation
Objective: Learn how to transform or manipulate data before it is returned from the query.

select Option: Use select to transform the data that useQuery returns.

Example:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  select: (data) => data.map(user => user.name), // Only return names
});
 - Custom Query Hook
Objective: Create a custom hook for repeated queries.

Create a custom hook to fetch users data:

jsx
Copy code
const useUsers = () => {
  return useQuery(['users'], fetchUsers);
};

const UsersList = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

Conclusion
This tutorial series covers the fundamentals of React Query, from setting up your project to handling advanced use cases like caching, polling, and creating custom hooks. By the end of this series, you'll have a solid understanding of how to fetch, cache, and manage server state in your React apps.