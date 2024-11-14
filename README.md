- Project Setup
Objective:
The goal is to set up a React project and integrate React Query into it.

Steps:
Create a new React app (if you don't have one yet):

In your terminal, run:

bash
Copy code
npx create-react-app react-query-tutorial
cd react-query-tutorial
Install React Query: Install React Query to handle server state management.

bash
Copy code
npm install @tanstack/react-query
Set up the QueryClientProvider: In src/index.js, you'll initialize QueryClient and wrap your app with QueryClientProvider.

jsx
Copy code
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
Explanation:
QueryClient is responsible for managing the cache and state for your queries.
QueryClientProvider provides this context to the entire app, ensuring that React Query can handle queries and mutations globally.
Output:
This setup doesn't produce a UI change on its own, but it allows you to start using React Query in your app. The app is now ready to fetch and cache data.
- Fetching Data with useQuery
Objective:
Learn how to fetch data using React Query's useQuery hook.

Steps:
Create a function to fetch data: Create an API call to fetch users from an example API (JSONPlaceholder).

js
Copy code
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};
Use useQuery to fetch and display the data:

jsx
Copy code
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const UsersList = () => {
  const { data, error, isLoading } = useQuery(['users'], fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
Explanation:
useQuery: This hook fetches the data from the fetchUsers function and automatically handles loading, error, and data states.
The first argument (['users']) is a unique key to identify the query.
isLoading: Shows a loading message until the data is fetched.
error: Displays an error message if the query fails.
data: Displays the list of users once successfully fetched.
Expected Output:
Initially, you'll see "Loading..." while the data is being fetched.

Once the data is loaded, the list of users will be displayed. Example output:

diff
Copy code
- Leanne Graham
- Ervin Howell
- Clementine Bauch
- Patricia Lebsack
- ...- Handling Query Error
Objective:
Learn how to handle query errors effectively.

Steps:
Use the error object to handle errors:

jsx
Copy code
const UsersList = () => {
  const { data, error, isLoading } = useQuery(['users'], fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
Explanation:
If there’s an error during the data fetch, React Query will populate the error field with an error object, which you can check and display to the user.
Expected Output:
If the network fails or the API is down, the UI will show an error message like:
Error: Failed to fetch users- React Query Devtools
Objective:
Learn how to use React Query Devtools to inspect queries and their states.

Steps:
Install React Query Devtools:

bash
Copy code
npm install @tanstack/react-query-devtools
Add Devtools to your app:

In your App.js or index.js:

jsx
Copy code
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => (
  <div>
    <UsersList />
    <ReactQueryDevtools initialIsOpen={false} />
  </div>
);

export default App;
Explanation:
ReactQueryDevtools: This component adds a sidebar to your app that shows the state of your queries, including cache, data, and errors.
initialIsOpen={false}: This keeps the devtools panel closed by default.
Expected Output:
After running the app, you’ll see a Devtools panel that shows you information about the queries, including cache, request status, and more.
This is incredibly useful for debugging, as it lets you see how your queries are behaving under the hood.- Query Cache
Objective:
Learn how React Query caches query results and how to control the cache behavior.

Steps:
Use the cacheTime option to control how long the data stays in cache before it is garbage collected.

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  cacheTime: 1000 * 60 * 5, // Cache the data for 5 minutes
});
Explanation:
cacheTime: This determines how long React Query should keep the query data in memory after the query has been unused. After this time, the data is removed from the cache.
Expected Output:
If the data is cached for 5 minutes, React Query won’t refetch the data during that time unless the cache expires.- Stale Time
Objective:
Understand how stale time affects the behavior of queries and when they refetch data.

Steps:
Use the staleTime option:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  staleTime: 1000 * 60 * 2, // Data considered fresh for 2 minutes
});
Explanation:
staleTime: The time duration that React Query considers the data fresh. If the data is fresh, React Query won’t automatically refetch it. After the staleTime has passed, the data becomes stale and will be refetched the next time it’s requested.
Expected Output:
If the data is fresh for 2 minutes, React Query won’t refetch data unless you trigger it or it becomes stale after the 2-minute mark.- Refetch Defaults
Objective:
Learn how to control the default refetch behavior in React Query.

Steps:
Control refetching behavior using options like refetchOnWindowFocus:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  refetchOnWindowFocus: false, // Disable refetching on window focus
});
Explanation:
refetchOnWindowFocus: By default, React Query will refetch data whenever the window regains focus. You can disable this behavior by setting refetchOnWindowFocus: false.
Expected Output:
When the window is refocused (e.g., the user switches tabs and returns), React Query won’t automatically refetch the data if refetchOnWindowFocus is set to false.- Polling
Objective:
Learn how to set up polling for periodic data fetching.

Steps:
Use refetchInterval for polling:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  refetchInterval: 1000 * 60, // Poll every minute
});
Explanation:
refetchInterval: Sets the interval for polling. In this case, it will refetch the data every minute.
Expected Output:
The data will be automatically fetched every minute (as long as the component using the query is mounted).
 - useQuery on Click
Objective:
Trigger a query manually when a button is clicked.

Steps:
Use the enabled option to disable automatic fetching:

jsx
Copy code
const { data, refetch } = useQuery(['users'], fetchUsers, {
  enabled: false, // Disable automatic fetching
});

return (
  <div>
    <button onClick={() => refetch()}>Fetch Users</button>
    {data && data.map((user) => <div key={user.id}>{user.name}</div>)}
  </div>
);
Explanation:
enabled: false: This prevents the query from running automatically when the component mounts.
refetch(): You can manually trigger the query by calling refetch when a button is clicked.
Expected Output:
Initially, no data will be loaded. When the "Fetch Users" button is clicked, the data will be fetched and displayed.
 - Success and Error Callbacks
Objective:
Handle success and error callbacks to trigger actions after the query succeeds or fails.

Steps:
Add onSuccess and onError options to the query:

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
Explanation:
onSuccess: Runs when the query successfully fetches data.
onError: Runs when there’s an error in the query.
Expected Output:
The success or error callbacks will log messages to the console, helping with debugging or side effects after the query completes.
 - Data Transformation
Objective:
Learn how to transform the data returned from the query before using it.

Steps:
Use select to transform the data:

jsx
Copy code
const { data } = useQuery(['users'], fetchUsers, {
  select: (data) => data.map((user) => user.name), // Transform data
});
Explanation:
select: Allows you to modify the data before it is passed to your component.
Expected Output:
Only the names of the users will be displayed instead of the entire user objects.
 - Custom Query Hook
Objective:
Create a custom hook to reuse a query logic across components.

Steps:
Create a custom hook to fetch users:

jsx
Copy code
const useUsers = () => {
  return useQuery(['users'], fetchUsers);
};
Use it in a component:

jsx
Copy code
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
Explanation:
useUsers: This is a custom hook that encapsulates the logic for fetching users. It makes the code more reusable and cleaner.
Expected Output:
The component will behave just like before but now the query logic is abstracted into a custom hook.
